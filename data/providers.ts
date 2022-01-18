/* eslint no-unused-vars: off */
import { Decimal } from '@prisma/client/runtime/index.js'
import type { ChargeFunction, RateFunction } from '../src/utils/node/types.js'

export const PROVIDERS: {
  name: string
  ptcName: string
  startTexts: string[]
  functions: ((
    numbers: Decimal[],
    tduCharge: Decimal,
    tduRate: Decimal,
  ) => { chargeFunction: ChargeFunction; rateFunction: RateFunction })[]
}[] = [
  {
    name: '4Change Energy',
    ptcName: '4CHANGE ENERGY',
    startTexts: ['This price disclosure'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[1].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: numbers[1] },
          { kwh: new Decimal(1001), charge: numbers[1].plus(numbers[3]) },
        ],
        rateFunction: [
          { kwh: new Decimal(0), rate: new Decimal(0) },
          { kwh: new Decimal(2000), rate: numbers[5].dividedBy(100) },
        ],
      }),
    ],
  },
  {
    name: 'Ambit Energy',
    ptcName: 'AMBIT ENERGY',
    startTexts: ['per month'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
        ],
        rateFunction: [{ kwh: new Decimal(0), rate: tduRate.plus(numbers[1]) }],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
        ],
        rateFunction: [
          { kwh: new Decimal(0), rate: tduRate.plus(numbers[5]) },
          { kwh: new Decimal(501), rate: tduRate.plus(numbers[6]) },
          { kwh: new Decimal(1001), rate: tduRate.plus(numbers[7]) },
        ],
      }),
    ],
  },
  {
    name: 'Amigo Energy',
    ptcName: 'AMIGO ENERGY',
    startTexts: ['This price disclosure'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: numbers[1] }],
        rateFunction: [
          { kwh: new Decimal(0), rate: numbers[0].dividedBy(100) },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: new Decimal(0) }],
        rateFunction: [
          { kwh: new Decimal(0), rate: numbers[0].dividedBy(100) },
        ],
      }),
    ],
  },
  {
    name: 'AP Gas & Electric',
    ptcName: 'AP GAS & ELECTRIC (TX) LLC',
    startTexts: ['Your actual average price'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Brilliant Energy',
    ptcName: 'BRILLIANT ENERGY LLC',
    startTexts: ['Energy Charge Rate'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: tduCharge }],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Champion Energy',
    ptcName: 'CHAMPION ENERGY SERVICES LLC',
    startTexts: ['This price disclosure', 'The average price per'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Chariot Energy',
    ptcName: 'CHARIOT ENERGY',
    startTexts: ['The above price disclosure'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: tduCharge }],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: new Decimal(0) }],
        rateFunction: [
          { kwh: new Decimal(0), rate: numbers[0].dividedBy(100) },
        ],
      }),
    ],
  },
  {
    name: 'Cirro Energy',
    ptcName: 'CIRRO ENERGY',
    startTexts: ['Energy Charge'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: tduCharge }],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: new Decimal(0) }],
        rateFunction: [
          { kwh: new Decimal(0), rate: numbers[0].dividedBy(100) },
        ],
      }),
    ],
  },
  {
    name: 'Constellation NewEnergy',
    ptcName: 'CONSTELLATION NEWENERGY INC',
    startTexts: ['This estimated average'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[2]) },
          { kwh: new Decimal(1000), charge: tduCharge },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge },
          { kwh: new Decimal(1000), charge: tduCharge.minus(numbers[4]) },
          {
            kwh: new Decimal(2000),
            charge: tduCharge.minus(numbers[4]).minus(numbers[6]),
          },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: numbers[2] },
          { kwh: new Decimal(501), charge: numbers[2].plus(numbers[5]) },
          {
            kwh: new Decimal(1001),
            charge: numbers[2].plus(numbers[5]).plus(numbers[8]),
          },
          {
            kwh: new Decimal(1501),
            charge: numbers[2]
              .plus(numbers[5])
              .plus(numbers[8])
              .plus(numbers[11]),
          },
        ],
        rateFunction: [
          { kwh: new Decimal(0), rate: new Decimal(0) },
          { kwh: new Decimal(2001), rate: numbers[13].dividedBy(100) },
        ],
      }),
    ],
  },
  {
    name: 'CPL Retail Energy',
    ptcName: 'CPL RETAIL ENERGY',
    startTexts: ['Your actual average price'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Direct Energy',
    ptcName: 'DIRECT ENERGY',
    startTexts: ['Your actual average price'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Discount Power',
    ptcName: 'Discount Power',
    startTexts: ['The price you pay'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: tduCharge }],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
          { kwh: new Decimal(1000), charge: tduCharge },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[4].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Eligo Energy',
    ptcName: 'ELIGO ENERGY TX LLC',
    startTexts: ['The price you pay'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[1].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Energy to Go',
    ptcName: 'Energy to Go',
    startTexts: ['The average price above'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: numbers[1] }],
        rateFunction: [
          { kwh: new Decimal(0), rate: numbers[0].dividedBy(100) },
        ],
      }),
    ],
  },
  {
    name: 'Entrust Energy',
    ptcName: 'ENTRUST ENERGY INC',
    startTexts: ['This price disclosure'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[1].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Express Energy',
    ptcName: 'Express Energy',
    startTexts: ['These average prices'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[1].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: new Decimal(0) },
          {
            kwh: new Decimal(500),
            charge: numbers[2].times(-5).plus(numbers[6]),
          },
          {
            kwh: new Decimal(1001),
            charge: numbers[2].times(-5).plus(numbers[9].times(10)),
          },
        ],
        rateFunction: [
          { kwh: new Decimal(0), rate: numbers[2].dividedBy(100) },
          { kwh: new Decimal(500), rate: new Decimal(0) },
          { kwh: new Decimal(1001), rate: numbers[9].dividedBy(100) },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: numbers[1] },
          { kwh: new Decimal(1001), charge: numbers[1].plus(numbers[3]) },
        ],
        rateFunction: [
          { kwh: new Decimal(0), rate: new Decimal(0) },
          { kwh: new Decimal(1001), rate: numbers[5].dividedBy(100) },
        ],
      }),
    ],
  },
  {
    name: 'First Choice Power',
    ptcName: 'FIRST CHOICE POWER',
    startTexts: ['Your actual average price', 'Energy Charge'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1].times(30)) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Frontier Utilities',
    ptcName: 'FRONTIER UTILITIES',
    startTexts: ['The above price disclosure'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: tduCharge }],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Gexa Energy',
    ptcName: 'GEXA ENERGY',
    startTexts: ['The price you pay'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: tduCharge }],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Green Energy Exchange',
    ptcName: 'GREEN ENERGY EXCHANGE',
    startTexts: ['The Average price above'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: tduCharge }],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Green Mountain Energy',
    ptcName: 'GREEN MOUNTAIN ENERGY COMPANY',
    startTexts: ['This price disclosure'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[1].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[3].dividedBy(100)),
          },
          {
            kwh: new Decimal(1001),
            rate: tduRate.plus(numbers[5].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'GridPlus Energy',
    ptcName: 'GridPlus Energy',
    startTexts: ['This price disclosure'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: tduCharge }],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Hello Energy',
    ptcName: 'Hello Energy',
    startTexts: [''],
    functions: [],
  },
  {
    name: 'Iberdrola Texas',
    ptcName: 'Iberdrola Texas',
    startTexts: ['The price you pay'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
        ],
        rateFunction: [{ kwh: new Decimal(0), rate: tduRate.plus(numbers[1]) }],
      }),
    ],
  },
  {
    name: 'Infinite Energy',
    ptcName: 'INFINITE ENERGY',
    startTexts: ['Infinite Energy charges'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
          { kwh: new Decimal(1000), charge: tduCharge },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: numbers[9] }],
        rateFunction: [
          { kwh: new Decimal(0), rate: new Decimal(0) },
          { kwh: new Decimal(1001), rate: numbers[8].dividedBy(100) },
        ],
      }),
    ],
  },
  {
    name: 'Infuse Energy',
    ptcName: 'INFUSE ENERGY LLC',
    startTexts: ['ENERGY CHARGES'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[3]) },
          { kwh: new Decimal(500), charge: tduCharge },
          { kwh: new Decimal(1000), charge: tduCharge.minus(numbers[7]) },
          { kwh: new Decimal(1501), charge: tduCharge.minus(numbers[12]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Just Energy',
    ptcName: 'JUST ENERGY',
    startTexts: ['This price disclosure'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: numbers[1] }],
        rateFunction: [
          { kwh: new Decimal(0), rate: numbers[0].dividedBy(100) },
        ],
      }),
    ],
  },
  {
    name: 'Liberty Power',
    ptcName: 'Liberty Power',
    startTexts: ['This price disclosure'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
        ],
        rateFunction: [{ kwh: new Decimal(0), rate: tduRate.plus(numbers[0]) }],
      }),
    ],
  },
  {
    name: 'Lone Star Energy',
    ptcName: 'Lone Star Energy',
    startTexts: ['The average price above'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: numbers[1] }],
        rateFunction: [
          { kwh: new Decimal(0), rate: numbers[0].dividedBy(100) },
        ],
      }),
    ],
  },
  {
    name: 'MidAmerican Energy Services',
    ptcName: 'MIDAMERICAN ENERGY SERVICES LLC',
    startTexts: ['The average price'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: tduCharge }],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'New Power Texas',
    ptcName: 'New Power Texas',
    startTexts: ['The average price above'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
          {
            kwh: new Decimal(1000),
            charge: tduCharge.plus(numbers[0]).minus(numbers[2]),
          },
        ],
        rateFunction: [{ kwh: new Decimal(0), rate: tduRate.plus(numbers[1]) }],
      }),
    ],
  },
  {
    name: 'Our Energy',
    ptcName: 'OUR ENERGY LLC',
    startTexts: ['The above price disclosure'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[1].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Payless Power',
    ptcName: 'PAYLESS POWER',
    startTexts: [''],
    functions: [],
  },
  {
    name: 'Pogo Energy',
    ptcName: 'Pogo Energy',
    startTexts: ['Average Price per kWh above'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1].times(30)) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'PowerNext',
    ptcName: 'PowerNext',
    startTexts: ['The average price above'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: numbers[1] }],
        rateFunction: [
          { kwh: new Decimal(0), rate: numbers[0].dividedBy(100) },
        ],
      }),
    ],
  },
  {
    name: 'Power of Texas',
    ptcName: 'POWER OF TEXAS HOLDINGS INC',
    startTexts: ['This price disclosure'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[1].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Pulse Power',
    ptcName: 'PULSE POWER LLC',
    startTexts: ['The average price above'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: numbers[1] }],
        rateFunction: [
          { kwh: new Decimal(0), rate: numbers[0].dividedBy(100) },
        ],
      }),
    ],
  },
  {
    name: 'Reliant Energy',
    ptcName: 'RELIANT',
    startTexts: ['This price disclosure'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[1].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Southern Federal Power',
    ptcName: 'SOUTHERN FEDERAL POWER LLC',
    startTexts: ['Your monthly electric bill'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
        ],
        rateFunction: [{ kwh: new Decimal(0), rate: tduRate.plus(numbers[0]) }],
      }),
    ],
  },
  {
    name: 'Southwest Power & Light',
    ptcName: 'SOUTHWEST POWER & LIGHT',
    startTexts: ['Thank you for choosing'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
          { kwh: new Decimal(1000), charge: tduCharge },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Spark Energy',
    ptcName: 'SPARK ENERGY LLC',
    startTexts: ['This estimated average'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: tduCharge }],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: numbers[1] }],
        rateFunction: [
          { kwh: new Decimal(0), rate: new Decimal(0) },
          { kwh: new Decimal(2000), rate: numbers[0].dividedBy(100) },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge },
          { kwh: new Decimal(1000), charge: tduCharge.minus(numbers[7]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Summer Energy',
    ptcName: 'SUMMER ENERGY LLC',
    startTexts: ['Price Disclosure'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          {
            kwh: new Decimal(0),
            charge: numbers[10].plus(numbers[12]).plus(numbers[13]),
          },
          { kwh: new Decimal(1000), charge: numbers[10].plus(numbers[12]) },
        ],
        rateFunction: [
          { kwh: new Decimal(0), rate: numbers[5].dividedBy(100) },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: numbers[10].plus(numbers[11]) },
          { kwh: new Decimal(1000), charge: numbers[10] },
        ],
        rateFunction: [
          { kwh: new Decimal(0), rate: numbers[5].dividedBy(100) },
        ],
      }),
    ],
  },
  {
    name: 'Tara Energy',
    ptcName: 'TARA ENERGY',
    startTexts: ['This price disclosure'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: numbers[1] }],
        rateFunction: [
          { kwh: new Decimal(0), rate: numbers[0].dividedBy(100) },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: new Decimal(0) }],
        rateFunction: [
          { kwh: new Decimal(0), rate: numbers[0].dividedBy(100) },
        ],
      }),
    ],
  },
  {
    name: 'Texans Energy',
    ptcName: 'Texans Energy',
    startTexts: ['The price disclosure'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Texpo Energy',
    ptcName: 'TEXPO ENERGY',
    startTexts: ['Thank you for choosing'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
          { kwh: new Decimal(1000), charge: tduCharge },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Think Energy',
    ptcName: 'THINK ENERGY',
    startTexts: ['The price you pay'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: tduCharge }],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'TriEagle Energy',
    ptcName: 'TRIEAGLE ENERGY LP',
    startTexts: ['This price disclosure'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: numbers[1] }],
        rateFunction: [
          { kwh: new Decimal(0), rate: numbers[0].dividedBy(100) },
        ],
      }),
    ],
  },
  {
    name: 'TXU Energy',
    ptcName: 'TXU ENERGY',
    startTexts: ['Your average price'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[1].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
          {
            kwh: new Decimal(1200),
            charge: tduCharge.plus(numbers[0]).minus(numbers[10]),
          },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[3].dividedBy(100)),
          },
          {
            kwh: new Decimal(1201),
            rate: tduRate.plus(numbers[6].dividedBy(100)),
          },
          {
            kwh: new Decimal(2001),
            rate: tduRate.plus(numbers[8].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
          {
            kwh: new Decimal(800),
            charge: tduCharge.plus(numbers[0]).minus(numbers[6]),
          },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[3].dividedBy(100)),
          },
          {
            kwh: new Decimal(1201),
            rate: tduRate.plus(numbers[5].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'V247 Power',
    ptcName: 'V247 POWER CORPORATION',
    startTexts: ['Fixed Energy Rate'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
          { kwh: new Decimal(1001), charge: tduCharge },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Veteran Energy',
    ptcName: 'VETERAN ENERGY LLC',
    startTexts: ['Your Average Price'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
          { kwh: new Decimal(1000), charge: tduCharge },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Volt Electricity',
    ptcName: 'VOLT ELECTRICITY PROVIDER LP',
    startTexts: ['Volt Energy Charge'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: tduCharge }],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[8].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'Windrose Energy',
    ptcName: 'WINDROSE ENERGY',
    startTexts: ['The above price'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[0]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[1].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [{ kwh: new Decimal(0), charge: numbers[0] }],
        rateFunction: [
          { kwh: new Decimal(0), rate: numbers[1].dividedBy(100) },
        ],
      }),
    ],
  },
  {
    name: 'WTU Retail Energy',
    ptcName: 'WTU RETAIL ENERGY',
    startTexts: ['Your actual average price'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
  {
    name: 'YEP Energy',
    ptcName: 'YEP',
    startTexts: ['Thank you for choosing'],
    functions: [
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
          { kwh: new Decimal(1000), charge: tduCharge },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
      (numbers, tduCharge, tduRate) => ({
        chargeFunction: [
          { kwh: new Decimal(0), charge: tduCharge.plus(numbers[1]) },
        ],
        rateFunction: [
          {
            kwh: new Decimal(0),
            rate: tduRate.plus(numbers[0].dividedBy(100)),
          },
        ],
      }),
    ],
  },
]
