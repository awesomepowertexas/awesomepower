import {
  faFacebookSquare,
  faGithub,
  faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Footer() {
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
    <footer className="bg-gray-900 p-10 text-sm text-white md:h-40">
      <div className="mx-auto flex h-full max-w-4xl flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-4 text-3xl">
          <a
            href="https://www.facebook.com/AwesomePowerTexas/"
            target="_blank"
            className="transition hover:text-gray-500"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faFacebookSquare} />
          </a>

          <a
            href="https://twitter.com/AwesomePowerTX"
            target="_blank"
            className="transition hover:text-gray-500"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faTwitterSquare} />
          </a>

          <a
            href="https://github.com/awesomepowertexas/awesomepower"
            target="_blank"
            className="transition hover:text-gray-500"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>

        <div className="flex flex-grow flex-col items-start gap-4 md:flex-row md:items-center md:justify-center md:gap-8">
          <Link href="/">
            <a className="font-bold transition hover:text-gray-500">Home</a>
          </Link>

          <button
            className="cursor-pointer font-bold transition hover:text-gray-500"
            onClick={navigateToFaqs}
          >
            FAQs
          </button>

          <Link href="/privacy">
            <a className="font-bold transition hover:text-gray-500">Privacy</a>
          </Link>

          <Link href="/terms">
            <a className="font-bold transition hover:text-gray-500">Terms</a>
          </Link>
        </div>

        <div className="text-2xs flex-1 text-gray-500 md:text-right">
          Copyright © {new Date().getFullYear()}
          <br />
          Michael Hays
        </div>
      </div>
    </footer>
  )
}

export default Footer
