import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useImmer } from 'use-immer'
import Filter from '~/components/Plans/Filter'
import PlanList from '~/components/Plans/PlanList'
import type { TermOption } from '~/utils/types'

export interface PlanFilter {
  rating: number
  term: TermOption
  renewable: boolean
}

const PlansPage: NextPage = () => {
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

      <div className="min-h-[calc(100vh-8rem)] bg-blue-100 pt-20 md:pt-48 px-4 pb-8 md:pb-20">
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="font-solway font-bold text-2xl md:text-4xl">
            Plans for {router.query.zipCode}
          </h1>

          <div className="w-10 md:w-20 h-1 bg-blue-300" />

          <Filter planFilter={planFilter} setPlanFilter={setPlanFilter} />

          <PlanList planFilter={planFilter} />
        </div>
      </div>
    </>
  )
}

export default PlansPage
