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
      className="bg-white rounded shadow p-4 md:p-6"
    >
      {/* Desktop */}
      <div className="hidden md:flex">
        <div className="w-40 flex-shrink-0 flex flex-col items-center">
          <div className="relative w-40 h-24 mt-4">
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

        <div className="flex-grow flex flex-col ml-4">
          <p className="font-bold leading-tight overflow-hidden">{plan.name}</p>

          <p className="text-sm text-gray-700 mt-2">
            {plan.term} month term · {plan.percentRenewable}% renewable
          </p>

          {plan.isNewCustomer && (
            <p className="text-sm text-orange-500 mt-2">
              <i>New customers only</i>
            </p>
          )}

          <div className="flex-grow" />

          <div className="flex items-center mt-4">
            <a href={plan.enrollUrl} target="_blank" rel="noreferrer">
              <Button color="green">Sign up</Button>
            </a>

            <a
              href={plan.factsUrl}
              className="text-blue-600 ml-6"
              target="_blank"
              rel="noreferrer"
            >
              Facts
            </a>

            <a
              href={plan.termsUrl}
              className="text-blue-600 ml-6"
              target="_blank"
              rel="noreferrer"
            >
              Terms
            </a>
          </div>
        </div>

        <div className="w-64 flex items-center ml-4">
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center">
              <p
                className="cursor-pointer font-bold text-gray-500 text-xs uppercase"
                onClick={() => {
                  setOrderBy(orderBy === 'low' ? 'mid' : 'low')
                }}
              >
                {orderBy === 'low' ? 'mid' : 'low'}
              </p>

              <p className="font-solway font-light text-2xl ml-2">
                {(
                  (orderBy === 'low'
                    ? plan.midUsageRate!.toNumber()
                    : plan.lowUsageRate!.toNumber()) * 100
                ).toFixed(1)}
                ¢
              </p>
            </div>

            <div className="flex items-center mt-4">
              <p
                className="cursor-pointer font-bold text-gray-500 text-xs uppercase"
                onClick={() => {
                  setOrderBy(orderBy === 'high' ? 'mid' : 'high')
                }}
              >
                {orderBy === 'high' ? 'mid' : 'high'}
              </p>

              <p className="font-solway font-light text-2xl ml-2">
                {(
                  (orderBy === 'high'
                    ? plan.midUsageRate!.toNumber()
                    : plan.highUsageRate!.toNumber()) * 100
                ).toFixed(1)}
                ¢
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <p className="font-bold text-blue-700 text-xs uppercase">
              {orderBy}
            </p>

            <p className="font-solway font-light text-5xl">
              {(mainUsageRate!.toNumber() * 100).toFixed(1)}¢
            </p>

            <p className="font-bold text-gray-500 text-xs uppercase">per kWh</p>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col">
        <div className="text-center">
          <p className="font-bold text-lg">{plan.name}</p>
        </div>

        <div className="flex items-center mt-6">
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-40 h-24">
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

          <div className="flex-1 text-sm ml-6">
            <p className="text-gray-700">{plan.term} month term</p>

            <p className="text-gray-700 mt-3">
              {plan.percentRenewable}% renewable
            </p>

            {plan.isNewCustomer && (
              <p className="text-sm text-orange-500 mt-3">
                <i>New customers only</i>
              </p>
            )}

            <div className="flex mt-3">
              <a
                href={plan.factsUrl}
                className="text-blue-600"
                target="_blank"
                rel="noreferrer"
              >
                Facts
              </a>

              <span className="text-gray-600 mx-2">·</span>

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

        <div className="flex items-center mt-8">
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center">
              <p
                className="cursor-pointer font-bold text-gray-500 text-xs uppercase"
                onClick={() => {
                  setOrderBy(orderBy === 'low' ? 'mid' : 'low')
                }}
              >
                {orderBy === 'low' ? 'mid' : 'low'}
              </p>

              <p className="font-solway font-light text-2xl ml-2">
                {(
                  (orderBy === 'low'
                    ? plan.midUsageRate!.toNumber()
                    : plan.lowUsageRate!.toNumber()) * 100
                ).toFixed(1)}
                ¢
              </p>
            </div>

            <div className="flex items-center mt-4">
              <p
                className="cursor-pointer font-bold text-gray-500 text-xs uppercase"
                onClick={() => setOrderBy(orderBy === 'high' ? 'mid' : 'high')}
              >
                {orderBy === 'high' ? 'mid' : 'high'}
              </p>

              <p className="font-solway font-light text-2xl ml-2">
                {(
                  (orderBy === 'high'
                    ? plan.midUsageRate!.toNumber()
                    : plan.highUsageRate!.toNumber()) * 100
                ).toFixed(1)}
                ¢
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <p className="font-bold text-blue-700 text-xs uppercase">
              {orderBy}
            </p>

            <p className="font-solway font-light text-5xl">
              {(mainUsageRate!.toNumber() * 100).toFixed(1)}¢
            </p>

            <p className="font-bold text-gray-500 text-xs uppercase">per kWh</p>
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
