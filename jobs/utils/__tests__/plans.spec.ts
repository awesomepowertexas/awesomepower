import { Prisma } from '@prisma/client'
import { calculatePlanCost, kwhEstimatesMatchCostFunctions } from '../plans'

const chargeFunction = [
  {
    kwh: new Prisma.Decimal('0'),
    charge: new Prisma.Decimal('20'),
  },
  {
    kwh: new Prisma.Decimal('1000'),
    charge: new Prisma.Decimal('-10'),
  },
]
const rateFunction = [
  {
    kwh: new Prisma.Decimal('0'),
    rate: new Prisma.Decimal('0.1'),
  },
  {
    kwh: new Prisma.Decimal('500'),
    rate: new Prisma.Decimal('0.05'),
  },
]

describe('calculatePlanCost', () => {
  it('calculates correctly', () => {
    expect(
      calculatePlanCost(
        new Prisma.Decimal('100'),
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
        new Prisma.Decimal('30'),
        new Prisma.Decimal('50'),
        new Prisma.Decimal('60'),
        chargeFunction,
        rateFunction,
      ),
    ).to.be.true
  })
})
