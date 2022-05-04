import lodash from 'lodash'
import { useRouter } from 'next/router'
import { useState } from 'react'
import LoadingSpinner from '~/src/components/_global/LoadingSpinner'
import type { PlanFilter } from '~/src/pages/plans/[zipCode]'
import { trpc } from '~/src/utils/trpc'
import type { OrderBy } from '~/src/utils/types'
import PlanListCard from './PlanListCard'
import usePlanStore from './store'

interface Props {
  planFilter: PlanFilter
}

export default function PlanList({ planFilter }: Props) {
  const router = useRouter()

  const { plans, setPlans } = usePlanStore()

  const plansQuery = trpc.useQuery(
    ['plan.all', { zipCode: router.query.zipCode as string }],
    { enabled: plans.length === 0 },
  )

  if (plansQuery.data) {
    setPlans(plansQuery.data)
  }

  const [orderBy, setOrderBy] = useState<OrderBy>('mid')

  const filteredPlans = lodash
    .cloneDeep(plans)
    .filter(
      (plan) =>
        (plan.provider.rating ?? 1) >= planFilter.rating &&
        (planFilter.term !== 'All' ? plan.term == planFilter.term : true) &&
        (planFilter.renewable ? plan.percentRenewable >= 99 : true) &&
        !plan.isPrepaid &&
        plan.rateType === 'Fixed' &&
        plan.language === 'English' &&
        plan.lowUsageRate &&
        plan.midUsageRate &&
        plan.highUsageRate,
    )
    .sort((a, b) => {
      if (orderBy === 'low') {
        return a.lowUsageRate!.toNumber() - b.lowUsageRate!.toNumber()
      } else if (orderBy === 'mid') {
        return a.midUsageRate!.toNumber() - b.midUsageRate!.toNumber()
      }
      return a.highUsageRate!.toNumber() - b.highUsageRate!.toNumber()
    })

  return (
    <div>
      {plansQuery.isLoading ? (
        <div className="flex w-full justify-center">
          <LoadingSpinner size={50} className="mt-8 text-blue-500" />
        </div>
      ) : filteredPlans.length === 0 ? (
        <div
          v-else-if="filteredPlans.length === 0"
          key="no-plans"
          className="w-full"
        >
          <p className="mt-8 text-center text-gray-700">
            No plans found for the given filters
          </p>
        </div>
      ) : (
        <div
          key={`plans${filteredPlans.length}${
            filteredPlans.map((plan) => plan.ptcIdKey)[0]
          }`}
          className="flex w-full flex-col"
        >
          <p className="my-4 text-xs text-gray-700">
            All rates shown are estimates
          </p>

          <div className="flex flex-col gap-8">
            {filteredPlans.map((plan) => (
              <PlanListCard
                key={plan.id}
                plan={plan}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
