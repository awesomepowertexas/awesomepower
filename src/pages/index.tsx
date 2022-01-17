import type { NextPage } from 'next'
import Head from 'next/head'
import IntroBgDesktop from '~/assets/svg/intro-bg-desktop.svg'
import IntroBgMobile from '~/assets/svg/intro-bg-mobile.svg'
import PawprintsDesktop from '~/assets/svg/pawprints-desktop.svg'
import PawprintsMobile from '~/assets/svg/pawprints-mobile.svg'
import FAQs from '~/components/Landing/FAQs'
import FindPlans from '~/components/Landing/FindPlans'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Find a cheap electricity plan, headache free</title>
      </Head>

      <div className="relative">
        <IntroBgMobile className="absolute md:hidden z-[-10] w-full h-screen top-0 left-0" />

        <IntroBgDesktop className="absolute hidden md:block z-[-10] w-full h-screen top-0 left-0" />

        <PawprintsMobile className="absolute md:hidden z-[-10] w-full left-0 top-[65vh]" />

        <PawprintsDesktop className="z-[-10] absolute hidden md:block w-full left-0 top-[calc(80vh-40vw)] max-h-full overflow-hidden" />

        <div className="h-screen p-4 pt-[16vh] md:pt-[20vh]">
          <h1 className="font-bold font-solway text-3xl text-center md:text-5xl md:leading-tight">
            <div>
              Find a cheap
              <span className="hidden md:inline">&nbsp;</span>
              <br className="md:hidden" />
              electricity plan,
            </div>

            <div>
              <span className="border-b-4 border-blue-300 px-3 pb-1">
                headache-free
              </span>
            </div>
          </h1>

          <FindPlans />
        </div>

        <FAQs />
      </div>
    </>
  )
}

export default Home
