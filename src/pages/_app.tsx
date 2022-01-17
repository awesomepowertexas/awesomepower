import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { withTRPC } from '@trpc/next'
import { Decimal } from 'decimal.js'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import superjson from 'superjson'
import DefaultLayout from '~/layouts/Default'
import { AppRouter } from '~/server/routers/_app'
import '../styles/globals.css'

superjson.registerCustom<Decimal, string>(
  {
    isApplicable: (v): v is Decimal => Decimal.isDecimal(v),
    serialize: (v) => v.toJSON(),
    deserialize: (v) => new Decimal(v),
  },
  'decimal.js',
)

export type NextPageWithLayout = NextPage & {
  getLayout?: (_page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return getLayout(
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Find a cheap electricity plan, headache free"
        />
        <meta property="og:title" content="Awesome Power Texas" />
        <meta
          property="og:description"
          content="Find a cheap electricity plan, headache free"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://awesomepowertexas.com" />
        <meta
          property="og:image"
          content="https://awesomepowertexas.com/og-image.png"
        />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="754" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Component {...pageProps} />

      <ReactQueryDevtools initialIsOpen={false} />
    </>,
  )
}) as AppType

/**
 * Determine base URL depending on the environment.
 */
function getBaseUrl() {
  if (process.browser) {
    return ''
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return `http://localhost:${process.env.PORT ?? 3000}`
}

export default withTRPC<AppRouter>({
  config() {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },

  ssr: true,

  responseMeta({ clientErrors }) {
    if (clientErrors.length) {
      return {
        status: clientErrors[0].data?.httpStatus ?? 500,
      }
    }

    return {}
  },
})(App)
