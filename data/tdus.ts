import type Prisma from '@prisma/client'

// https://4changeenergy.com/tdu-charges
// https://electricityplans.com/texas/tdu-delivery-charges/
export const TDUS: {
  name: string
  ptcName: string
  charges: Prisma.Prisma.JsonArray
  rates: Prisma.Prisma.JsonArray
}[] = [
  {
    name: 'AEP Central',
    ptcName: 'AEP TEXAS CENTRAL',
    charges: ['5.88'],
    rates: ['0.045213', '0.045196'],
  },
  {
    name: 'AEP North',
    ptcName: 'AEP TEXAS NORTH',
    charges: ['5.88'],
    rates: ['0.041058', '0.041096'],
  },
  {
    name: 'Centerpoint',
    ptcName: 'CENTERPOINT ENERGY HOUSTON ELECTRIC LLC',
    charges: ['4.39'],
    rates: ['0.039416', '0.038523'],
  },
  {
    name: 'Oncor',
    ptcName: 'ONCOR ELECTRIC DELIVERY COMPANY',
    charges: ['3.42'],
    rates: ['0.038907', '0.041543'],
  },
  {
    name: 'TNMP',
    ptcName: 'TEXAS-NEW MEXICO POWER COMPANY',
    charges: ['7.85'],
    rates: ['0.047274', '0.051602'],
  },
]
