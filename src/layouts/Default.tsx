import { ReactNode } from 'react'
import Footer from '~/components/_layouts/Default/Footer'
import Header from '~/components/_layouts/Default/Header'

interface Props {
  children: ReactNode
}

function DefaultLayout({ children }: Props) {
  return (
    <div>
      <Header />

      <main className="min-h-[calc(100vh-8rem)]">{children}</main>

      <Footer />
    </div>
  )
}

export default DefaultLayout
