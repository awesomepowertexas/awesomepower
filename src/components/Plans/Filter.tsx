import type { PlanFilter } from '~/src/pages/plans/[zipCode]'
import { termOptions } from '~/src/utils/types'
import StarGroup from './StarGroup'

interface Props {
  planFilter: PlanFilter
  setPlanFilter: (_currentState: (_draftState: PlanFilter) => void) => void
}

export default function Filter({ planFilter, setPlanFilter }: Props) {
  return (
    <>
      <h2 className="mt-4 text-center text-sm font-bold uppercase tracking-widest text-blue-900 md:mt-8">
        Filter
      </h2>

      <div className="mt-2 flex flex-col items-center justify-between gap-8 rounded bg-blue-700 p-4 text-sm font-bold text-white md:flex-row">
        <StarGroup
          rating={planFilter.rating}
          setRating={(rating) =>
            setPlanFilter((state) => {
              state.rating = rating
            })
          }
          editable={true}
        />

        <div className="flex items-center">
          <select
            id="select-term"
            value={planFilter.term}
            onChange={($event) => {
              setPlanFilter((state) => {
                state.term = $event.target.value
              })
            }}
            className="py-1 text-gray-900"
          >
            {termOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label htmlFor="select-term" className="ml-1">
            month term
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="input-renewable"
            checked={planFilter.renewable}
            onChange={($event) => {
              setPlanFilter((state) => {
                state.renewable = $event.target.checked
              })
            }}
            type="checkbox"
          />

          <label htmlFor="input-renewable" className="ml-1">
            100% renewable
          </label>
        </div>
      </div>
    </>
  )
}
