import { Decimal } from '@prisma/client/runtime'
import { describe, expect, it } from 'vitest'
import {
  calculatePlanCost,
  kwhEstimatesMatchCostFunctions,
} from '../utils/plans'

const chargeFunction = [
  {
    kwh: new Decimal('0'),
    charge: new Decimal('20'),
  },
  {
    kwh: new Decimal('1000'),
    charge: new Decimal('-10'),
  },
]
const rateFunction = [
  {
    kwh: new Decimal('0'),
    rate: new Decimal('0.1'),
  },
  {
    kwh: new Decimal('500'),
    rate: new Decimal('0.05'),
  },
]

describe('calculatePlanCost', () => {
  it('calculates correctly', () => {
    expect(
      calculatePlanCost(
        new Decimal('100'),
        chargeFunction,
        rateFunction,
      ).toNumber(),
    ).to.equal(30)

    expect(
      calculatePlanCost(
        new Decimal('500'),
        chargeFunction,
        rateFunction,
      ).toNumber(),
    ).to.equal(70)

    expect(
      calculatePlanCost(
        new Decimal('999'),
        chargeFunction,
        rateFunction,
      ).toNumber(),
    ).to.equal(94.95)

    expect(
      calculatePlanCost(
        new Decimal('1000'),
        chargeFunction,
        rateFunction,
      ).toNumber(),
    ).to.equal(65)
  })
})

describe('kwhEstimatesMatchCostFunctions', () => {
  it('compares correctly', () => {
    expect(
      kwhEstimatesMatchCostFunctions(
        new Decimal('0.14'),
        new Decimal('0.065'),
        new Decimal('0.0575'),
        chargeFunction,
        rateFunction,
      ),
    ).to.be.true
  })
})
