import { Decimal } from '@prisma/client/runtime'
import lodash from 'lodash'
import type { ChargeFunction, RateFunction } from '~/src/utils/node/types'
import { calculatePlanCost } from './calculatePlanCost'
import { rSkewNorm } from './skewnorm'

export function calculateRateEstimates(
  chargeFunction: ChargeFunction,
  rateFunction: RateFunction,
): { lowUsageRate: Decimal; midUsageRate: Decimal; highUsageRate: Decimal } {
  const kwhSample = {
    lowUsageRate: Array.from(
      { length: 10000 },
      () => new Decimal(rSkewNorm(5, 200, 300, 0, 5000)),
    ),
    midUsageRate: Array.from(
      { length: 10000 },
      () => new Decimal(rSkewNorm(4, 500, 700, 0, 5000)),
    ),
    highUsageRate: Array.from(
      { length: 10000 },
      () => new Decimal(rSkewNorm(3, 1000, 1000, 0, 5000)),
    ),
  }

  const result = Object.fromEntries(
    Object.entries(kwhSample).map(([key, value]) => [
      key,
      new Decimal(
        lodash.sum(
          value.map((val) =>
            calculatePlanCost(val, chargeFunction, rateFunction)
              .dividedBy(val)
              .toNumber(),
          ),
        ),
      )
        .dividedBy(value.length)
        .toDecimalPlaces(4),
    ]),
  ) as { lowUsageRate: Decimal; midUsageRate: Decimal; highUsageRate: Decimal }

  return result
}
