import type { Decimal } from '@prisma/client/runtime'

export type ChargeFunction = {
  kwh: Decimal
  charge: Decimal
}[]

export type RateFunction = {
  kwh: Decimal
  rate: Decimal
}[]
