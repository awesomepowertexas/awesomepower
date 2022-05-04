import Prisma from '@prisma/client'

declare global {
  var prisma: Prisma.PrismaClient
}

const prisma =
  global.prisma ||
  (Prisma
    ? new Prisma.PrismaClient()
    : new (require('@prisma/client').PrismaClient)()) // eslint-disable-line

// Prevent multiple instances of Prisma Client in development
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

export default prisma
