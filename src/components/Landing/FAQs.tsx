import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import usageWeightImage from '~/assets/img/usage-weight.png'

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
          question={'How much does this website cost to use?'}
          answer={
            <p>
              Awesome Power is free to use and always will be. In the future, we
              may accept donations to cover server costs.
            </p>
          }
        />

        <FAQ
          question={'How is this different than Power To Choose?'}
          answer={
            <>
              <p>
                Power To Choose tells an incomplete story of plan pricing. Plans
                are ranked in order of their cost at exactly 1000 kWh; however,
                these results says nothing about the rest of the range of the
                plan. If you use just 1 kWh over (or under) 1000 kWh, you may
                pay twice as much as expected!
              </p>

              <p className="mt-4">
                Awesome Power solves this by using a weighted average to
                calculate plan costs. We take the average of a plan's cost
                across a range of kWh, so that misleading price jumps will be
                accounted for in the final pricing estimate.
              </p>
            </>
          }
        />

        <FAQ
          question={'Can we see the calculations used in the results?'}
          answer={
            <>
              <p>
                Yep! Awesome Power is open source; check out the codebase&nbsp;
                <a
                  href="https://github.com/awesomepowertexas/awesomepower"
                  className="font-bold"
                  target="_blank"
                  rel="noreferrer"
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

        <FAQ
          question={'What happened to the old Awesome Power website?'}
          answer={
            <>
              <p>
                In 2017, the creators of Awesome Power worked hard to improve
                consumer access to energy usage data by attending several
                meetings with the Public Utility Commission of Texas, and
                helping to determine the requirements for the state’s data
                access site, Smart Meter Texas.
              </p>

              <p className="mt-4">
                Finally, on December 7, 2019, SMT 2.0 was unveiled.
              </p>

              <p className="mt-4">
                Unfortunately, this meant that Awesome Power’s integration with
                Smart Meter Texas was broken. So, we simplified Awesome Power to
                only require a zip code to find the cheapest plans.
              </p>

              <p className="mt-4">
                If there's anything else that hasn't been answered in these
                FAQs, shoot me an email at michael@awesomepowertexas.com, and
                I'll try to get back to you.
              </p>
            </>
          }
        />
      </div>
    </div>
  )
}
