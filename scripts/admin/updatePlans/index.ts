import type { Prisma as PrismaType } from '@prisma/client'
import PrismaClient from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/index'
import consola from 'consola'
import lodash from 'lodash'
import { PROVIDERS } from '~/data/providers'
import prisma from '~/prisma/client'
import getPdfText from './utils/getPdfText'
import type { PtcPlan } from './utils/getPtcPlans'
import getPtcPlans from './utils/getPtcPlans'
import setChargeAndRateFunctions from './utils/setChargeAndRateFunctions'

const { Prisma } = PrismaClient ?? require('@prisma/client')

async function updatePlans() {
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
      const existingPlan = existingPlans.find(
        (p) => p.ptcIdKey === plan.ptcIdKey,
      )

      if (!existingPlan) {
        await prisma.plan.create({
          data: {
            ...plan,
            tduId: tdu.id,
            providerId: provider.id,
            eflNumbers: Prisma.DbNull,
            chargeFunction: Prisma.DbNull,
            rateFunction: Prisma.DbNull,
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
            eflNumbers: undefined,
            chargeFunction: undefined,
            rateFunction: undefined,
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
    if (
      !ptcPlans.map((plan) => plan.ptcIdKey).includes(plan.ptcIdKey) &&
      plan.isActive
    ) {
      await prisma.plan.update({
        where: { id: plan.id },
        data: { isActive: false },
      })
    }
  }

  /**
   * Set EFL numbers
   */
  consola.info('Setting EFL numbers and charge/rate functions...')

  const activePlans = await prisma.plan.findMany({
    where: {
      isActive: true,
      language: 'English',
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

  for (const [index, plan] of activePlans.entries()) {
    process.stdout.write(
      `Updating plan ${index + 1} of ${activePlans.length}\r`,
    )

    // @ts-ignore
    if (!plan.eflNumbers) {
      try {
        var pdfText = await getPdfText(plan.factsUrl)

        if (!pdfText) {
          throw new Error()
        }
      } catch (error) {
        await prisma.plan.update({
          where: { id: plan.id },
          data: { eflNumbers: [] },
        })

        continue
      }

      for (const startText of PROVIDERS.find(
        (p) => p.name === plan.provider.name,
      )?.startTexts ?? []) {
        const eflNumbers = pdfText
          .slice(pdfText.indexOf(startText))
          .match(/\d+\.?\d*/g)
          ?.map((num) => new Decimal(num).toDecimalPlaces(6))
          .filter((num) => num.lessThan(new Decimal(10000)))

        if (eflNumbers && eflNumbers.length > 0) {
          await prisma.plan.update({
            where: { id: plan.id },
            data: {
              eflNumbers: eflNumbers as unknown as PrismaType.JsonArray,
            },
          })
        }
      }
    }

    if (
      plan.eflNumbers &&
      (plan.eflNumbers as unknown as Decimal[]).length > 0
    ) {
      await setChargeAndRateFunctions(plan)
    }
  }

  consola.success('Done')
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
updatePlans()
