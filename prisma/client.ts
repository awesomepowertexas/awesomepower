import Prisma from '@prisma/client/index.js'

declare global {
  // eslint-disable-next-line no-unused-vars
  var prisma: Prisma.PrismaClient
}

const prisma =
  global.prisma ||
  (Prisma && Prisma.PrismaClient
    ? new Prisma.PrismaClient()
    : new (await import('@prisma/client/index.js')).PrismaClient())

// Prevent multiple instances of Prisma Client in development
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

export default prisma
