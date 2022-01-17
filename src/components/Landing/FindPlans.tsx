import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import Button from '~/components/_global/Button'
import LoadingSpinner from '~/components/_global/LoadingSpinner'
import { trpc } from '~/utils/trpc'
import usePlanStore from '../Plans/store'

function FindPlans() {
  const router = useRouter()

  const { setPlans } = usePlanStore()

  const [zipCode, setZipCode] = useState('')
  const inputEl = useRef<HTMLInputElement>(null)

  const plansQuery = trpc.useQuery(['plan.all', { zipCode }], {
    enabled: zipCode.length === 5,
  })

  if (plansQuery.data) {
    setPlans(plansQuery.data)

    setTimeout(() => {
      inputEl.current?.focus()
    })
  }

  function handleKeyPress($event: React.KeyboardEvent<HTMLInputElement>) {
    if ($event.key === 'Enter') {
      viewPlans()
    } else if ($event.key < '0' || $event.key > '9') {
      $event.preventDefault()
    }
  }

  function viewPlans() {
    if (plansQuery.data && plansQuery.data.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(`/plans/${zipCode}`)
    }
  }

  return (
    <div className="mx-auto mt-16 md:mt-20 w-full max-w-md bg-blue-900 text-center rounded-lg shadow p-5">
      <p className="h-10 flex items-center justify-center font-solway font-bold text-white md:text-xl uppercase">
        View plans in your zip code
      </p>

      <input
        ref={inputEl}
        value={zipCode}
        onChange={($event) => setZipCode($event.target.value)}
        onKeyPress={handleKeyPress}
        disabled={plansQuery.isLoading}
        type="text"
        className="my-4 w-56 h-16 rounded text-3xl text-center text-gray-800 font-solway font-light"
        placeholder="12345"
        maxLength={5}
        data-cypress="find-plans"
      />

      <div className="h-10 flex items-center justify-center">
        {zipCode.length === 5 &&
          (plansQuery.isLoading ? (
            <LoadingSpinner className="text-white" />
          ) : plansQuery.isError ? (
            <p className="font-bold tracking-widest text-red-300 text-xs uppercase pb-1">
              Sorry, something went wrong
            </p>
          ) : plansQuery.data?.length === 0 ? (
            <p className="font-bold tracking-widest text-red-300 text-xs uppercase pb-1">
              No plans found for this zip code
            </p>
          ) : (
            <Link href={`/plans/${zipCode}`}>
              <a>
                <Button color="green">
                  View {plansQuery.data?.length} plans
                </Button>
              </a>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default FindPlans
