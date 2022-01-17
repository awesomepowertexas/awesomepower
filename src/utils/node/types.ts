import Prisma from '.prisma/client/index.js'

export class Decimal extends Prisma.Prisma.Decimal {}

export type ChargeFunction = {
  kwh: Decimal
  charge: Decimal
}[]

export type RateFunction = {
  kwh: Decimal
  rate: Decimal
}[]
