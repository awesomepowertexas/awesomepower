import produce from 'immer'
import create from 'zustand'
import type { InferQueryOutput } from '~/src/utils/trpc'

interface PlanStore {
  plans: InferQueryOutput<'plan.all'>
  setPlans: (_plans: InferQueryOutput<'plan.all'>) => void
}

const usePlanStore = create<PlanStore>((set) => ({
  plans: [],
  setPlans: (newPlans) =>
    set(
      produce((state: PlanStore) => {
        state.plans = newPlans
      }),
    ),
}))

export default usePlanStore
