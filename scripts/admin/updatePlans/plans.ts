import { Decimal } from '@prisma/client/runtime'
import lodash from 'lodash'
import type { ChargeFunction, RateFunction } from '~/src/utils/node/types'
import { rSkewNorm } from './skewnorm'

/**
 * Calculate the cost of the plan at a certain kWH
 */
export function calculatePlanCost(
  kwh: Decimal,
  chargeFunction: ChargeFunction,
  rateFunction: RateFunction,
): Decimal {
  // Find the charge piecewise function that the kWH usage falls into
  let chargeIndex = chargeFunction.length - 1

  for (const [index, functionPiece] of chargeFunction.entries()) {
    if (kwh < functionPiece.kwh) {
      chargeIndex = index - 1
      break
    }
  }

  const charge = chargeFunction[chargeIndex].charge

  // Find the rate piecewise function that the kWH usage falls into
  let rateIndex = rateFunction.length - 1

  for (const [index, functionPiece] of rateFunction.entries()) {
    if (kwh < functionPiece.kwh) {
      rateIndex = index - 1
      break
    }
  }

  let rateTotal = new Decimal(0)

  // Add the total of all rate piecewise functions before the last index
  for (const index of [...Array(rateIndex).keys()]) {
    rateTotal = rateTotal.plus(
      rateFunction[index].rate.times(
        rateFunction[index + 1].kwh.minus(rateFunction[index].kwh),
      ),
    )
  }

  // Add the remaining kWH of the final piecewise function
  rateTotal = rateTotal.plus(
    rateFunction[rateIndex].rate.times(kwh.minus(rateFunction[rateIndex].kwh)),
  )

  return charge.plus(rateTotal)
}

/**
 * Check whether the three PTC kWH rates match the rates calculated by the
 * cost functions
 */
export function kwhEstimatesMatchCostFunctions(
  kwh500: Decimal,
  kwh1000: Decimal,
  kwh2000: Decimal,
  chargeFunction: ChargeFunction,
  rateFunction: RateFunction,
): boolean {
  const calculated500 = calculatePlanCost(
    new Decimal(500),
    chargeFunction,
    rateFunction,
  ).dividedBy(new Decimal(500))
  const calculated1000 = calculatePlanCost(
    new Decimal(1000),
    chargeFunction,
    rateFunction,
  ).dividedBy(new Decimal(1000))
  const calculated2000 = calculatePlanCost(
    new Decimal(2000),
    chargeFunction,
    rateFunction,
  ).dividedBy(new Decimal(2000))

  const precision = new Decimal('0.0015')

  return (
    calculated500.minus(kwh500).abs().lessThanOrEqualTo(precision) &&
    calculated1000.minus(kwh1000).abs().lessThanOrEqualTo(precision) &&
    calculated2000.minus(kwh2000).abs().lessThanOrEqualTo(precision)
  )
}

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
