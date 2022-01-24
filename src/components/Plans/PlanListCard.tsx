import Image from 'next/image'
import Button from '~/components/_global/Button'
import { InferQueryOutput } from '~/utils/trpc'
import type { OrderBy } from '~/utils/types'
import StarGroup from './StarGroup'

interface Props {
  plan: InferQueryOutput<'plan.all'>[number]
  orderBy: OrderBy
  setOrderBy: (_val: string) => void
}

export default function PlanListCard({ plan, orderBy, setOrderBy }: Props) {
  const mainUsageRate =
    orderBy === 'low'
      ? plan.lowUsageRate
      : orderBy === 'mid'
      ? plan.midUsageRate
      : plan.highUsageRate

  return (
    <div
      data-cypress="plan-card"
      className="rounded bg-white p-4 shadow md:p-6"
    >
      {/* Desktop */}
      <div className="hidden md:flex">
        <div className="flex w-40 flex-shrink-0 flex-col items-center">
          <div className="relative mt-4 h-24 w-40">
            <Image
              src={`/provider-images/${plan.provider.name}.png`}
              alt={plan.provider.name}
              layout="fill"
              className="object-contain"
            />
          </div>

          <div className="mt-2">
            <StarGroup rating={plan.provider.rating ?? 1} />
          </div>
        </div>

        <div className="ml-4 flex flex-grow flex-col">
          <p className="overflow-hidden font-bold leading-tight">{plan.name}</p>

          <p className="mt-2 text-sm text-gray-700">
            {plan.term} month term · {plan.percentRenewable}% renewable
          </p>

          {plan.isNewCustomer && (
            <p className="mt-2 text-sm text-orange-500">
              <i>New customers only</i>
            </p>
          )}

          <div className="flex-grow" />

          <div className="mt-4 flex items-center">
            <a href={plan.enrollUrl} target="_blank" rel="noreferrer">
              <Button color="green">Sign up</Button>
            </a>

            <a
              href={plan.factsUrl}
              className="ml-6 text-blue-600"
              target="_blank"
              rel="noreferrer"
            >
              Facts
            </a>

            <a
              href={plan.termsUrl}
              className="ml-6 text-blue-600"
              target="_blank"
              rel="noreferrer"
            >
              Terms
            </a>
          </div>
        </div>

        <div className="ml-4 flex w-64 items-center">
          <div className="flex flex-1 flex-col items-center">
            <div className="flex items-center">
              <p
                className="cursor-pointer text-xs font-bold uppercase text-gray-500"
                onClick={() => {
                  setOrderBy(orderBy === 'low' ? 'mid' : 'low')
                }}
              >
                {orderBy === 'low' ? 'mid' : 'low'}
              </p>

              <p className="ml-2 font-solway text-2xl font-light">
                {(
                  (orderBy === 'low'
                    ? plan.midUsageRate!.toNumber()
                    : plan.lowUsageRate!.toNumber()) * 100
                ).toFixed(1)}
                ¢
              </p>
            </div>

            <div className="mt-4 flex items-center">
              <p
                className="cursor-pointer text-xs font-bold uppercase text-gray-500"
                onClick={() => {
                  setOrderBy(orderBy === 'high' ? 'mid' : 'high')
                }}
              >
                {orderBy === 'high' ? 'mid' : 'high'}
              </p>

              <p className="ml-2 font-solway text-2xl font-light">
                {(
                  (orderBy === 'high'
                    ? plan.midUsageRate!.toNumber()
                    : plan.highUsageRate!.toNumber()) * 100
                ).toFixed(1)}
                ¢
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center">
            <p className="text-xs font-bold uppercase text-blue-700">
              {orderBy}
            </p>

            <p className="font-solway text-5xl font-light">
              {(mainUsageRate!.toNumber() * 100).toFixed(1)}¢
            </p>

            <p className="text-xs font-bold uppercase text-gray-500">per kWh</p>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col md:hidden">
        <div className="text-center">
          <p className="text-lg font-bold">{plan.name}</p>
        </div>

        <div className="mt-6 flex items-center">
          <div className="flex flex-1 flex-col items-center">
            <div className="relative h-24 w-40">
              <Image
                src={`/provider-images/${plan.provider.name}.png`}
                alt={plan.provider.name}
                layout="fill"
                className="object-contain"
              />
            </div>

            <div className="mt-4">
              <StarGroup rating={plan.provider.rating ?? 1} />
            </div>
          </div>

          <div className="ml-6 flex-1 text-sm">
            <p className="text-gray-700">{plan.term} month term</p>

            <p className="mt-3 text-gray-700">
              {plan.percentRenewable}% renewable
            </p>

            {plan.isNewCustomer && (
              <p className="mt-3 text-sm text-orange-500">
                <i>New customers only</i>
              </p>
            )}

            <div className="mt-3 flex">
              <a
                href={plan.factsUrl}
                className="text-blue-600"
                target="_blank"
                rel="noreferrer"
              >
                Facts
              </a>

              <span className="mx-2 text-gray-600">·</span>

              <a
                href={plan.termsUrl}
                className="text-blue-600"
                target="_blank"
                rel="noreferrer"
              >
                Terms
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center">
          <div className="flex flex-1 flex-col items-center">
            <div className="flex items-center">
              <p
                className="cursor-pointer text-xs font-bold uppercase text-gray-500"
                onClick={() => {
                  setOrderBy(orderBy === 'low' ? 'mid' : 'low')
                }}
              >
                {orderBy === 'low' ? 'mid' : 'low'}
              </p>

              <p className="ml-2 font-solway text-2xl font-light">
                {(
                  (orderBy === 'low'
                    ? plan.midUsageRate!.toNumber()
                    : plan.lowUsageRate!.toNumber()) * 100
                ).toFixed(1)}
                ¢
              </p>
            </div>

            <div className="mt-4 flex items-center">
              <p
                className="cursor-pointer text-xs font-bold uppercase text-gray-500"
                onClick={() => setOrderBy(orderBy === 'high' ? 'mid' : 'high')}
              >
                {orderBy === 'high' ? 'mid' : 'high'}
              </p>

              <p className="ml-2 font-solway text-2xl font-light">
                {(
                  (orderBy === 'high'
                    ? plan.midUsageRate!.toNumber()
                    : plan.highUsageRate!.toNumber()) * 100
                ).toFixed(1)}
                ¢
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center">
            <p className="text-xs font-bold uppercase text-blue-700">
              {orderBy}
            </p>

            <p className="font-solway text-5xl font-light">
              {(mainUsageRate!.toNumber() * 100).toFixed(1)}¢
            </p>

            <p className="text-xs font-bold uppercase text-gray-500">per kWh</p>
          </div>
        </div>

        <a
          href={plan.enrollUrl}
          target="_blank"
          className="mt-8 flex flex-col items-stretch"
          rel="noreferrer"
        >
          <Button color="green">Sign up</Button>
        </a>
      </div>
    </div>
  )
}
