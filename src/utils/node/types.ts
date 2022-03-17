import type { Decimal } from '@prisma/client/runtime/index.js'

export type ChargeFunction = {
  kwh: Decimal
  charge: Decimal
}[]

export type RateFunction = {
  kwh: Decimal
  rate: Decimal
}[]
