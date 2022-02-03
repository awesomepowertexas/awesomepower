import Prisma from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/index.js'
import consola from 'consola'
import lodash from 'lodash'
import { PROVIDERS } from '../../data/providers.js'
import prisma from '../../prisma/client.js'
import { getPdfText } from './pdf.js'
import {
  calculateRateEstimates,
  kwhEstimatesMatchCostFunctions,
} from './plans.js'
import type { PtcPlan } from './ptc.js'
import { getPtcPlans } from './ptc.js'

/**
 * Fetch plans from PTC
 */
consola.info('Fetching plans from PTC...')

const ptcPlans = await getPtcPlans()

/**
 * Update plans in database
 */
consola.info('Updating plans in database...')

// Bulk prefetch to avoid tons of database queries
const tdus = await prisma.tdu.findMany()
const providers = await prisma.provider.findMany()
const existingPlans = await prisma.plan.findMany({
  where: {
    ptcIdKey: {
      in: ptcPlans
        .map((plan) => plan.ptcIdKey)
        .filter((idKey) => Boolean(idKey)) as number[],
    },
  },
})

for (const ptcPlan of ptcPlans) {
  const plan = lodash.cloneDeep(ptcPlan) as PtcPlan

  plan.isActive = true
  delete plan.tduName
  delete plan.providerName
  delete plan.rating

  const tdu = tdus.find((tdu) => tdu.ptcName === ptcPlan.tduName)
  const provider = providers.find(
    (provider) => provider.ptcName === ptcPlan.providerName,
  )

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
    plan.kwh500.lessThan(1) &&
    plan.kwh1000.lessThan(1) &&
    plan.kwh2000.lessThan(1)
  ) {
    const existingPlan = existingPlans.find((p) => p.ptcIdKey === plan.ptcIdKey)

    if (!existingPlan) {
      await prisma.plan.create({
        data: {
          ...plan,
          tduId: tdu.id,
          providerId: provider.id,
          eflNumbers: Prisma.Prisma.DbNull,
          chargeFunction: Prisma.Prisma.DbNull,
          rateFunction: Prisma.Prisma.DbNull,
        },
      })
    }

    // Reset EFL numbers if the plan terms are new
    else if (
      !plan.kwh500.equals(existingPlan.kwh500) ||
      !plan.kwh1000.equals(existingPlan.kwh1000) ||
      !plan.kwh2000.equals(existingPlan.kwh2000)
    ) {
      await prisma.plan.update({
        where: { ptcIdKey: plan.ptcIdKey },
        data: {
          ...plan,
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
      equals: Prisma.Prisma.DbNull,
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

  // Set eflNumbers to [] so that we don't try to set it again
  await prisma.plan.update({
    where: { id: plan.id },
    data: { eflNumbers: [] },
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
        data: {
          eflNumbers: eflNumbers as unknown as Prisma.Prisma.JsonArray,
        },
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
      NOT: {
        eflNumbers: {
          equals: Prisma.Prisma.DbNull,
        },
      },
    },
    include: {
      tdu: true,
      provider: true,
    },
  })
).filter(
  (plan) =>
    (plan.eflNumbers as Prisma.Prisma.JsonArray).length > 1 &&
    (!plan.chargeFunction ||
      !plan.rateFunction ||
      !kwhEstimatesMatchCostFunctions(
        plan.kwh500,
        plan.kwh1000,
        plan.kwh2000,
        (plan.chargeFunction as Prisma.Prisma.JsonArray).map((piece) => ({
          kwh: new Decimal((piece as { kwh: string; charge: string }).kwh),
          charge: new Decimal(
            (piece as { kwh: string; charge: string }).charge,
          ),
        })),
        (plan.rateFunction as Prisma.Prisma.JsonArray).map((piece) => ({
          kwh: new Decimal((piece as { kwh: string; rate: string }).kwh),
          rate: new Decimal((piece as { kwh: string; rate: string }).rate),
        })),
      )),
)

for (const [index, plan] of costPlans.entries()) {
  process.stdout.write(`Calculating plan ${index + 1} of ${costPlans.length}\r`)

  for (const tduCharge of plan.tdu.charges as Prisma.Prisma.JsonArray) {
    for (const tduRate of plan.tdu.rates as Prisma.Prisma.JsonArray) {
      for (const func of PROVIDERS.find((p) => p.name === plan.provider.name)
        ?.functions ?? []) {
        try {
          var { chargeFunction, rateFunction } = func(
            (plan.eflNumbers as string[]).map((num) => new Decimal(num)),
            new Decimal(tduCharge as string),
            new Decimal(tduRate as string),
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
              chargeFunction:
                chargeFunction as unknown as Prisma.Prisma.JsonArray,
              rateFunction: rateFunction as unknown as Prisma.Prisma.JsonArray,
              ...calculateRateEstimates(chargeFunction, rateFunction),
            },
          })
        }
      }
    }
  }
}

consola.success('Done')
