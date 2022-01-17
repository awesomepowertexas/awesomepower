import { Head, Html, Main, NextScript } from 'next/document'

function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&family=Solway:wght@300;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  )
}

export default Document
