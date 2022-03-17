import { faker } from '@faker-js/faker'
import consola from 'consola'
import lodash from 'lodash'
import { PROVIDERS } from '../data/providers.js'
import { TDUS } from '../data/tdus.js'
import prisma from '../prisma/client.js'
import { getPtcPlans } from './plans/ptc.js'

const isProduction = process.env.APP_ENV === 'production'

/**
 * TDUs
 */

for (const tdu of TDUS) {
  await prisma.tdu.upsert({
    where: { name: tdu.name },
    update: tdu,
    create: tdu,
  })
}

/**
 * Providers
 */

for (const providerData of PROVIDERS) {
  const provider = {
    name: providerData.name,
    ptcName: providerData.ptcName,
  }

  await prisma.provider.upsert({
    where: { name: provider.name },
    update: provider,
    create: {
      ...provider,
      rating: isProduction ? undefined : lodash.random(1, 5),
    },
  })
}

// Set actual ratings in production
if (isProduction) {
  const ptcPlans = await getPtcPlans()

  for (const provider of await prisma.provider.findMany()) {
    const plan = ptcPlans.find((plan) => plan.providerName === provider.ptcName)

    if (plan && plan.rating) {
      await prisma.provider.update({
        where: { id: provider.id },
        data: { rating: plan.rating },
      })
    }
  }
}

/**
 * Plans
 */

if (!isProduction) {
  let ptcIdKey = 1

  for (const provider of await prisma.provider.findMany()) {
    await prisma.provider.update({
      where: { id: provider.id },
      data: { rating: lodash.random(1, 5) },
    })
  }

  for (const tdu of await prisma.tdu.findMany()) {
    for (const provider of await prisma.provider.findMany()) {
      await prisma.plan.upsert({
        where: { ptcIdKey },
        update: {},
        create: {
          tdu: {
            connect: {
              id: tdu.id,
            },
          },
          provider: {
            connect: {
              id: provider.id,
            },
          },
          name: faker.company.bs(),
          ptcIdKey: ptcIdKey++,
          eflNumbers: [],
          lowUsageRate: lodash.round(lodash.random(0.07, 0.15, true), 4),
          midUsageRate: lodash.round(lodash.random(0.07, 0.15, true), 4),
          highUsageRate: lodash.round(lodash.random(0.07, 0.15, true), 4),
          kwh500: lodash.round(lodash.random(0.07, 0.15, true), 3),
          kwh1000: lodash.round(lodash.random(0.07, 0.15, true), 3),
          kwh2000: lodash.round(lodash.random(0.07, 0.15, true), 3),
          rateType: 'Fixed',
          isPrepaid: false,
          isTimeOfUse: false,
          isPromotion: false,
          promotionDescription: '',
          isNewCustomer: false,
          percentRenewable: lodash.random(0, 100),
          term: ptcIdKey % 4 === 0 ? 12 : lodash.random(1, 36),
          cancellationFee: lodash.random(0, 500).toString(),
          language: 'English',
          termsUrl: faker.internet.url(),
          factsUrl: faker.internet.url(),
          enrollUrl: faker.internet.url(),
          enrollPhone: faker.phone.phoneNumber(),
        },
      })
    }
  }
}

console.log()
consola.success('Database seeded successfully')
