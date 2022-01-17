import lodash from 'lodash'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { PlanFilter } from '~/pages/plans/[zipCode]'
import { trpc } from '~/utils/trpc'
import type { OrderBy } from '~/utils/types'
import LoadingSpinner from '../_global/LoadingSpinner'
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

  const planListRef = useRef(null)
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
    <div className="relative">
      {plansQuery.isLoading ? (
        <div className="w-full flex justify-center">
          <LoadingSpinner size={50} className="text-blue-500 mt-8" />
        </div>
      ) : filteredPlans.length === 0 ? (
        <div
          v-else-if="filteredPlans.length === 0"
          key="no-plans"
          className="w-full"
        >
          <p className="text-center text-gray-700 mt-8">
            No plans found for the given filters
          </p>
        </div>
      ) : (
        <div
          ref={planListRef}
          key={`plans${filteredPlans.length}${
            filteredPlans.map((plan) => plan.ptcIdKey)[0]
          }`}
          className="w-full flex flex-col"
        >
          <p className="text-gray-700 text-xs mt-4 -mb-4">
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
