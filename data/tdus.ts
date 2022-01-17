import { Decimal } from '../src/utils/node/types.js'

// https://4changeenergy.com/tdu-charges
// https://electricityplans.com/texas/tdu-delivery-charges/
export const TDUS: {
  name: string
  ptcName: string
  charges: Decimal[]
  rates: Decimal[]
}[] = [
  {
    name: 'AEP Central',
    ptcName: 'AEP TEXAS CENTRAL',
    charges: [new Decimal('5.88')],
    rates: [new Decimal('0.045174'), new Decimal('0.040936')],
  },
  {
    name: 'AEP North',
    ptcName: 'AEP TEXAS NORTH',
    charges: [new Decimal('5.88')],
    rates: [new Decimal('0.041096'), new Decimal('0.041426')],
  },
  {
    name: 'Centerpoint',
    ptcName: 'CENTERPOINT ENERGY HOUSTON ELECTRIC LLC',
    charges: [new Decimal('4.39')],
    rates: [new Decimal('0.046397'), new Decimal('0.046356')],
  },
  {
    name: 'Oncor',
    ptcName: 'ONCOR ELECTRIC DELIVERY COMPANY',
    charges: [new Decimal('3.42')],
    rates: [new Decimal('0.041543'), new Decimal('0.041114')],
  },
  {
    name: 'TNMP',
    ptcName: 'TEXAS-NEW MEXICO POWER COMPANY',
    charges: [new Decimal('7.85')],
    rates: [new Decimal('0.051602'), new Decimal('0.051742')],
  },
]
