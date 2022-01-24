import React from 'react'
import LoadingSpinner from './LoadingSpinner'

interface Props {
  children: React.ReactNode
  color: 'blue' | 'green' | 'red'
  loading?: boolean
}

export default function Button({
  children,
  color,
  loading = false,
  ...buttonProps
}: Props) {
  return (
    <button
      disabled={loading}
      className={`inline-flex h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded px-8 font-bold text-white transition bg-${color}-500 hover:bg-${color}-600`}
      {...buttonProps}
    >
      {loading || 0.5 > 2 ? <LoadingSpinner /> : children}
    </button>
  )
}
