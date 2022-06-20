import { Decimal } from '@prisma/client/runtime'
import { expect, test } from 'vitest'
import { calculatePlanCost } from '../calculatePlanCost'

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

test('calculates correctly', () => {
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
