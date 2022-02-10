import Head from 'next/head'
import Link from 'next/link'
import Button from '~/components/_global/Button'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Not Found | Awesome Power</title>
      </Head>

      <div className="pt-32">
        <div className="mx-auto max-w-6xl">
          <h1>Page not found</h1>

          <div className="mt-4">
            <Link href="/">
              <a>
                <Button color="blue">Back to Home</Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
