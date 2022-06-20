import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import usageWeightImage from '~/src/assets/img/usage-weight.png'

function FAQ({ question, answer }: { question: string; answer: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div
        className="faq-question mt-6 flex cursor-pointer items-start"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 flex-shrink-0 md:pt-1">
          <FontAwesomeIcon
            icon={faCircleChevronDown}
            className={`mt-[0.2rem] h-4 text-blue-500 transition ${
              isOpen ? '-rotate-180 transform' : ''
            }`}
          />
        </div>

        <div className="flex-grow">
          <p className="font-bold md:pt-px md:text-xl">{question}</p>
        </div>
      </div>

      <div className={classNames({ hidden: !isOpen })}>
        <div className="pl-8 text-sm leading-loose text-gray-700 md:text-base md:leading-loose">
          <div className="h-4" />
          {answer}
        </div>
      </div>
    </div>
  )
}

export default function FAQs() {
  return (
    <div id="faqs" className="-mt-8 px-6 pt-8 pb-12 md:pt-48 md:pb-64">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-8 flex flex-col items-center">
          <h2 className="border-b-4 border-blue-300 px-3 pb-1 text-center font-solway text-2xl font-bold md:text-3xl">
            FAQs
          </h2>
        </div>

        <FAQ
          question={'Is this website still active?'}
          answer={
            <>
              <p>
                While I try to keep this website up and running, I haven't had
                the time to maintain the list of plans as much as I'd like.
              </p>

              <p className="mt-4">
                At this point,{' '}
                <a
                  href="https://powertochoose.org"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold"
                >
                  Power to Choose
                </a>{' '}
                gives reasonably good results, to the point where Awesome Power
                doesn't offer as much value as it used to. Generally, the
                cheapest plans on Power to Choose will be similar to the ones
                shown on Awesome Power.
              </p>
            </>
          }
        />

        <FAQ
          question={'How much does this website cost to use?'}
          answer={<p>Awesome Power is free to use and always will be.</p>}
        />

        <FAQ
          question={'Can we see the calculations used in the results?'}
          answer={
            <>
              <p>
                Yep! Awesome Power is open source; check out the codebase&nbsp;
                <a
                  href="https://github.com/awesomepowertexas/awesomepower"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold"
                >
                  here
                </a>
                .
              </p>

              <p className="mt-4">
                Below are the distributions for each of the low, mid, and high
                usage profiles.
              </p>

              <div className="mt-6">
                <div className="rounded border shadow md:w-11/12">
                  <Image
                    src={usageWeightImage}
                    alt="Usage weight distribution for the different usage profiles."
                  />
                </div>
              </div>

              <p className="mt-8">
                Basically, for each plan, we calculate the plan’s cost at every
                kWh from 1 to 5000, then multiply that cost by the weight (the
                number on the y-axis). We then sum up all of those weighted
                costs to get an expected cost for that usage profile.
              </p>
            </>
          }
        />

        <FAQ
          question={'Why don’t the results include plan XYZ?'}
          answer={
            <>
              <p>
                The most challenging and time-consuming part of maintaining
                Awesome Power is collecting the complete pricing profile for
                every plan. Every night, we retrieve a list of all of the plans
                on Power To Choose. However, this list only tells us each plan’s
                cost at 500, 1000, and 2000 kWh. In order for Awesome Power to
                work, we need to know the cost at every kWh, which you can only
                determine from the Electricity Facts Label (EFL) for that plan.
                The EFL does not have a standard format, so we try to figure out
                the different rates and charges by collecting all of the numbers
                visible on the EFL, and applying the numbers to one of the known
                cost functions for that provider. This process is entirely
                automated.
              </p>

              <p className="mt-4">
                We get the pricing profile for most of the plans this way, but
                many EFLs are tough to interpret, and we have no choice but to
                leave that plan off of the results.
              </p>
            </>
          }
        />
      </div>
    </div>
  )
}
