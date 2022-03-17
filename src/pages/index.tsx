import Head from 'next/head'
import IntroBgDesktop from '~/src/assets/svg/intro-bg-desktop.svg'
import IntroBgMobile from '~/src/assets/svg/intro-bg-mobile.svg'
import PawprintsDesktop from '~/src/assets/svg/pawprints-desktop.svg'
import PawprintsMobile from '~/src/assets/svg/pawprints-mobile.svg'
import FAQs from '~/src/components/Landing/FAQs'
import FindPlans from '~/src/components/Landing/FindPlans'

export default function Home() {
  return (
    <>
      <Head>
        <title>Find a cheap electricity plan, headache free</title>
      </Head>

      <div className="relative">
        <IntroBgMobile className="absolute top-0 left-0 z-[-10] h-screen w-full md:hidden" />

        <IntroBgDesktop className="absolute top-0 left-0 z-[-10] hidden h-screen w-full md:block" />

        <PawprintsMobile className="absolute left-0 top-[65vh] z-[-10] w-full md:hidden" />

        <PawprintsDesktop className="absolute left-0 top-[calc(80vh-40vw)] z-[-10] hidden max-h-full w-full overflow-hidden md:block" />

        <div className="h-screen p-4 pt-[16vh] md:pt-[20vh]">
          <h1 className="text-center font-solway text-3xl font-bold md:text-5xl md:leading-tight">
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
