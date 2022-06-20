import { Decimal } from '@prisma/client/runtime'
import { expect, test } from 'vitest'
import { kwhEstimatesMatchCostFunctions } from '../kwhEstimatesMatchCostFunctions'

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

test('compares correctly', () => {
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
