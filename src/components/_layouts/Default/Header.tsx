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
    <header className="absolute flex h-12 w-full items-end px-5 md:h-24 md:px-12">
      <div className="z-20 mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link href="/">
          <a className="relative w-48 md:w-80" data-cypress="logo">
            <Logo />
          </a>
        </Link>

        <span
          className="mb-1 cursor-pointer text-sm font-bold hover:text-blue-700"
          onClick={navigateToFaqs}
        >
          FAQs
        </span>
      </div>
    </header>
  )
}

export default Header
