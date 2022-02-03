import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'blue' | 'green' | 'red'
  loading?: boolean
}

const bgMap = {
  blue: 'text-white bg-blue-500 hover:bg-blue-600',
  green: 'text-white bg-green-500 hover:bg-green-600',
  red: 'text-white bg-red-500 hover:bg-red-600',
}

export default function Button({
  color,
  loading = false,
  disabled = false,
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      disabled={loading || disabled}
      className={classNames(
        bgMap[color],
        className,
        'inline-flex h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded px-8 font-bold transition disabled:pointer-events-none disabled:opacity-50',
      )}
      {...props}
    >
      {loading ? <LoadingSpinner /> : children}
    </button>
  )
}
