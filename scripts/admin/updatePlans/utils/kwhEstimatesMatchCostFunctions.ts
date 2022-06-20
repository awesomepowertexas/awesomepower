import { Decimal } from '@prisma/client/runtime'
import type { ChargeFunction, RateFunction } from '~/src/utils/node/types'
import { calculatePlanCost } from './calculatePlanCost'

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
