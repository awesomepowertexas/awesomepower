import Head from 'next/head'
import { useRouter } from 'next/router'
import { useImmer } from 'use-immer'
import Filter from '~/src/components/Plans/Filter'
import PlanList from '~/src/components/Plans/PlanList'
import type { TermOption } from '~/src/utils/types'

export interface PlanFilter {
  rating: number
  term: TermOption
  renewable: boolean
}

export default function PlansPage() {
  const router = useRouter()

  const [planFilter, setPlanFilter] = useImmer<PlanFilter>({
    rating: 1,
    term: 12,
    renewable: false,
  })

  return (
    <>
      <Head>
        <title>Results | Awesome Power</title>
      </Head>

      <div className="min-h-[calc(100vh-8rem)] bg-blue-100 px-4 pt-20 pb-8 md:pt-48 md:pb-20">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="font-solway text-2xl font-bold md:text-4xl">
            Plans for {router.query.zipCode}
          </h1>

          <div className="h-1 w-10 bg-blue-300 md:w-20" />

          <Filter planFilter={planFilter} setPlanFilter={setPlanFilter} />

          <PlanList planFilter={planFilter} />
        </div>
      </div>
    </>
  )
}
