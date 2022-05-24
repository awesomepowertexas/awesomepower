import { z } from 'zod'
import { getTduNameFromZipCode } from '~/src/utils/ptc'
import { createRouter } from '../../createRouter'

/**
 * List all plans within a given zip code.
 */
const listPlansRouter = createRouter().query('plan.all', {
  input: z.object({
    zipCode: z.string().length(5),
  }),

  async resolve({ ctx, input }) {
    const tduCompanyName = await getTduNameFromZipCode(input.zipCode)

    if (!tduCompanyName) {
      return []
    }

    return await ctx.prisma.plan.findMany({
      where: {
        tdu: {
          is: {
            ptcName: tduCompanyName,
          },
        },
        isActive: true,
        language: 'English',
        rateType: 'Fixed',
        NOT: {
          lowUsageRate: null,
          midUsageRate: null,
          highUsageRate: null,
        },
        lowUsageRate: { gt: 0 },
        midUsageRate: { gt: 0 },
        highUsageRate: { gt: 0 },
      },
      include: {
        provider: true,
      },
    })
  },
})

export default listPlansRouter
