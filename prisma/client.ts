import Prisma from '@prisma/client'

declare global {
  // eslint-disable-next-line no-unused-vars
  var prisma: Prisma.PrismaClient
}

const prisma = global.prisma ?? new Prisma.PrismaClient()

// Prevent multiple instances of Prisma Client in development
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

export default prisma
