import { Decimal } from '@prisma/client/runtime'
import { calculatePlanCost, kwhEstimatesMatchCostFunctions } from '../plans'

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
  })
})

describe('kwhEstimatesMatchCostFunctions', () => {
  it('compares correctly', () => {
    expect(
      kwhEstimatesMatchCostFunctions(
        new Decimal('30'),
        new Decimal('50'),
        new Decimal('60'),
        chargeFunction,
        rateFunction,
      ),
    ).to.be.true
  })
})
