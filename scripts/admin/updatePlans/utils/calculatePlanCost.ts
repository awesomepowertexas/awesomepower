import { Decimal } from '@prisma/client/runtime'
import type { ChargeFunction, RateFunction } from '~/src/utils/node/types'

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
    if (kwh.lessThan(functionPiece.kwh)) {
      chargeIndex = index - 1
      break
    }
  }

  const charge = chargeFunction[chargeIndex].charge

  // Find the rate piecewise function that the kWH usage falls into
  let rateIndex = rateFunction.length - 1

  for (const [index, functionPiece] of rateFunction.entries()) {
    if (kwh.lessThan(functionPiece.kwh)) {
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
