/* eslint @typescript-eslint/ban-ts-comment: off */
import consola from 'consola'
import lodash from 'lodash'
import { JsonArray } from 'type-fest'
import { PROVIDERS } from '../data/providers.js'
import prisma from '../prisma/client.js'
import { Decimal } from '../src/utils/node/types.js'
import { getPdfText } from './utils/pdf.js'
import {
  calculateRateEstimates,
  kwhEstimatesMatchCostFunctions,
} from './utils/plans.js'
import type { PtcPlan } from './utils/ptc.js'
import { getPtcPlans } from './utils/ptc.js'

export default async function updatePlans() {
  /**
   * Fetch plans from PTC
   */
  consola.info('Fetching plans from PTC...')

  const ptcPlans = await getPtcPlans()

  /**
   * Update plans in database
   */
  consola.info('Updating plans in database...')

  for (const ptcPlan of ptcPlans) {
    const plan = lodash.cloneDeep(ptcPlan) as PtcPlan

    plan.isActive = true
    delete plan.tduName
    delete plan.providerName
    delete plan.rating

    const tdu = await prisma.tdu.findUnique({
      where: { ptcName: ptcPlan.tduName },
    })
    const provider = await prisma.provider.findUnique({
      where: { ptcName: ptcPlan.providerName },
    })

    // Misc factsUrl processing
    if (
      ['4changeenergy.com', 'myexpressenergy.com'].some((urlFragment) =>
        plan.factsUrl.includes(urlFragment),
      )
    ) {
      plan.factsUrl = plan.factsUrl
        .replace('myexpressenergy.com', '4changeenergy.com')
        .replace('viewpdf.aspx/?Docs', 'efls')
        .replace('viewpdf.aspx/?', '')
        .replace('Docs', 'efls')
    }

    if (
      tdu &&
      provider &&
      plan.kwh500 < new Decimal(1) &&
      plan.kwh1000 < new Decimal(1) &&
      plan.kwh2000 < new Decimal(1)
    ) {
      const existingPlan = await prisma.plan.findFirst({
        where: { ptcIdKey: plan.ptcIdKey },
      })

      const updatedPlan = await prisma.plan.upsert({
        where: { ptcIdKey: plan.ptcIdKey },
        update: plan,
        create: {
          ...plan,
          tduId: tdu.id,
          providerId: provider.id,
          eflNumbers: [],
        },
      })

      // Reset EFL numbers if the plan terms are new
      if (
        existingPlan &&
        (!updatedPlan.kwh500.equals(existingPlan.kwh500) ||
          !updatedPlan.kwh1000.equals(existingPlan.kwh1000) ||
          !updatedPlan.kwh2000.equals(existingPlan.kwh2000))
      ) {
        await prisma.plan.update({
          where: { id: updatedPlan.id },
          data: {
            eflNumbers: [],
            chargeFunction: [],
            rateFunction: [],
            lowUsageRate: null,
            midUsageRate: null,
            highUsageRate: null,
          },
        })
      }
    }
  }

  // Inactive plans
  for (const plan of await prisma.plan.findMany()) {
    if (!ptcPlans.map((plan) => plan.ptcIdKey).includes(plan.ptcIdKey)) {
      await prisma.plan.update({
        where: { id: plan.id },
        data: { isActive: false },
      })
    }
  }

  /**
   * Set EFL numbers
   */
  consola.info('Setting EFL numbers...')

  const eflPlans = await prisma.plan.findMany({
    where: {
      isActive: true,
      language: 'English',
      eflNumbers: {
        isEmpty: true,
      },
    },
    include: {
      tdu: true,
      provider: true,
    },
    orderBy: {
      provider: {
        name: 'asc',
      },
    },
  })

  for (const [index, plan] of eflPlans.entries()) {
    process.stdout.write(`Reading plan ${index + 1} of ${eflPlans.length}\r`)

    // Set eflNumbers to ['0'] so that we don't try to set it again
    await prisma.plan.update({
      where: { id: plan.id },
      data: { eflNumbers: [new Decimal('0')] },
    })

    try {
      var pdfText = await getPdfText(plan.factsUrl)

      if (!pdfText) {
        throw new Error()
      }
    } catch (error) {
      continue
    }

    for (const startText of PROVIDERS.find((p) => p.name === plan.provider.name)
      ?.startTexts ?? []) {
      const eflNumbers = pdfText
        .slice(pdfText.indexOf(startText))
        .match(/\d+\.?\d*/g)
        ?.map((num) => new Decimal(num).toDecimalPlaces(6))
        .filter((num) => num.lessThan(new Decimal(10000)))

      if (eflNumbers) {
        await prisma.plan.update({
          where: { id: plan.id },
          data: { eflNumbers },
        })
      }
    }
  }

  /**
   * Set charge and rate functions
   */
  consola.info('Setting charge and rate functions...')

  const costPlans = (
    await prisma.plan.findMany({
      where: {
        isActive: true,
        language: 'English',
      },
      include: {
        tdu: true,
        provider: true,
      },
    })
  ).filter(
    (plan) =>
      plan.eflNumbers.length > 1 &&
      (lodash.isEmpty(plan.chargeFunction) ||
        lodash.isEmpty(plan.rateFunction) ||
        !kwhEstimatesMatchCostFunctions(
          plan.kwh500,
          plan.kwh1000,
          plan.kwh2000,
          plan.chargeFunction.map((piece) => ({
            kwh: new Decimal((piece as { kwh: string; charge: string }).kwh),
            charge: new Decimal(
              (piece as { kwh: string; charge: string }).charge,
            ),
          })),
          plan.rateFunction.map((piece) => ({
            kwh: new Decimal((piece as { kwh: string; rate: string }).kwh),
            rate: new Decimal((piece as { kwh: string; rate: string }).rate),
          })),
        )),
  )

  for (const [index, plan] of costPlans.entries()) {
    process.stdout.write(
      `Calculating plan ${index + 1} of ${costPlans.length}\r`,
    )

    for (const tduCharge of plan.tdu.charges) {
      for (const tduRate of plan.tdu.rates) {
        for (const func of PROVIDERS.find((p) => p.name === plan.provider.name)
          ?.functions ?? []) {
          try {
            var { chargeFunction, rateFunction } = func(
              plan.eflNumbers,
              tduCharge,
              tduRate,
            )
          } catch (error) {
            continue
          }

          if (
            kwhEstimatesMatchCostFunctions(
              plan.kwh500,
              plan.kwh1000,
              plan.kwh2000,
              chargeFunction,
              rateFunction,
            )
          ) {
            await prisma.plan.update({
              where: { id: plan.id },
              data: {
                chargeFunction: chargeFunction as unknown as JsonArray,
                rateFunction: rateFunction as unknown as JsonArray,
                ...calculateRateEstimates(chargeFunction, rateFunction),
              },
            })
          }
        }
      }
    }
  }

  consola.success('Done')
}
