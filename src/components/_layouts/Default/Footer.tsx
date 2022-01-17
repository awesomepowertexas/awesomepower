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
    <footer className="md:h-40 bg-gray-900 text-white text-sm p-10">
      <div className="h-full max-w-4xl flex flex-col gap-6 md:flex-row md:items-center justify-between mx-auto">
        <div className="flex-1 flex items-center gap-4 text-3xl">
          <a
            href="https://www.facebook.com/AwesomePowerTexas/"
            target="_blank"
            className="hover:text-gray-500 transition"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faFacebookSquare} />
          </a>

          <a
            href="https://twitter.com/AwesomePowerTX"
            target="_blank"
            className="hover:text-gray-500 transition"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faTwitterSquare} />
          </a>

          <a
            href="https://github.com/awesomepowertexas/awesomepower"
            target="_blank"
            className="hover:text-gray-500 transition"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>

        <div className="flex-grow flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-center md:gap-8">
          <Link href="/">
            <a className="font-bold hover:text-gray-500 transition">Home</a>
          </Link>

          <button
            className="cursor-pointer font-bold hover:text-gray-500 transition"
            onClick={navigateToFaqs}
          >
            FAQs
          </button>

          <Link href="/privacy">
            <a className="font-bold hover:text-gray-500 transition">Privacy</a>
          </Link>

          <Link href="/terms">
            <a className="font-bold hover:text-gray-500 transition">Terms</a>
          </Link>
        </div>

        <div className="flex-1 text-2xs text-gray-500 md:text-right">
          Copyright © {new Date().getFullYear()}
          <br />
          Michael Hays
        </div>
      </div>
    </footer>
  )
}

export default Footer
