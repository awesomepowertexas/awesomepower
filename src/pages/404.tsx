import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Button from '~/components/_global/Button'

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>Not Found | Awesome Power</title>
      </Head>

      <div className="pt-32">
        <div className="max-w-6xl mx-auto">
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

export default Custom404
