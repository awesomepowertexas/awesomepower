import type { Plan, Prisma as PrismaType, Provider, Tdu } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/index'
import { PROVIDERS } from '~/data/providers'
import prisma from '~/prisma/client'
import { calculateRateEstimates } from './calculateRateEstimates'
import { kwhEstimatesMatchCostFunctions } from './kwhEstimatesMatchCostFunctions'

/**
 * Set the `chargeFunction` and `rateFunction` for a given plan.
 */
export default async function setChargeAndRateFunctions(
  plan: Plan & { tdu: Tdu; provider: Provider },
) {
  for (const tduCharge of plan.tdu.charges as PrismaType.JsonArray) {
    for (const tduRate of plan.tdu.rates as PrismaType.JsonArray) {
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
              chargeFunction: chargeFunction as unknown as PrismaType.JsonArray,
              rateFunction: rateFunction as unknown as PrismaType.JsonArray,
              ...calculateRateEstimates(chargeFunction, rateFunction),
            },
          })

          return
        }
      }
    }
  }
}
