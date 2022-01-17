import Link from 'next/link'
import { useRouter } from 'next/router'
import Logo from '~/assets/svg/logo.svg'

function Header() {
  const router = useRouter()

  function navigateToFaqs() {
    if (router.pathname === '/') {
      document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push('/#faqs')
    }
  }

  return (
    <header className="absolute w-full h-12 md:h-24 flex items-end px-5 md:px-12">
      <div className="z-20 w-full max-w-6xl flex items-center justify-between mx-auto">
        <Link href="/">
          <a className="relative w-48 md:w-80" data-cypress="logo">
            <Logo />
          </a>
        </Link>

        <span
          className="cursor-pointer font-bold text-sm hover:text-blue-700 mb-1"
          onClick={navigateToFaqs}
        >
          FAQs
        </span>
      </div>
    </header>
  )
}

export default Header
