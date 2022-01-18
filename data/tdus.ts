import { Prisma } from '@prisma/client'

// https://4changeenergy.com/tdu-charges
// https://electricityplans.com/texas/tdu-delivery-charges/
export const TDUS: {
  name: string
  ptcName: string
  charges: Prisma.JsonArray
  rates: Prisma.JsonArray
}[] = [
  {
    name: 'AEP Central',
    ptcName: 'AEP TEXAS CENTRAL',
    charges: ['5.88'],
    rates: ['0.045174', '0.040936'],
  },
  {
    name: 'AEP North',
    ptcName: 'AEP TEXAS NORTH',
    charges: ['5.88'],
    rates: ['0.041096', '0.041426'],
  },
  {
    name: 'Centerpoint',
    ptcName: 'CENTERPOINT ENERGY HOUSTON ELECTRIC LLC',
    charges: ['4.39'],
    rates: ['0.046397', '0.046356'],
  },
  {
    name: 'Oncor',
    ptcName: 'ONCOR ELECTRIC DELIVERY COMPANY',
    charges: ['3.42'],
    rates: ['0.041543', '0.041114'],
  },
  {
    name: 'TNMP',
    ptcName: 'TEXAS-NEW MEXICO POWER COMPANY',
    charges: ['7.85'],
    rates: ['0.051602', '0.051742'],
  },
]
