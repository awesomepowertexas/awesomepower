import classNames from 'classnames'
import { useState } from 'react'
import Star from '~/assets/svg/star.svg'

interface Props {
  rating: number
  setRating?: (_val: number) => void
  editable?: boolean
}

export default function StarGroup({
  rating,
  setRating = (_index) => null,
  editable = false,
}: Props) {
  const [activeHoverIndex, setActiveHoverIndex] = useState(-1)

  const filled = activeHoverIndex !== -1 ? activeHoverIndex : rating

  return (
    <>
      <div className="flex text-[#ECEE88]">
        {Array.from(new Array(5), (_, i) => i + 1).map((index) => (
          <Star
            key={index}
            className={classNames('h-6', {
              'text-transparent': filled < index,
              'cursor-pointer': editable,
            })}
            onMouseEnter={() => (editable ? setActiveHoverIndex(index) : null)}
            onMouseLeave={() => (editable ? setActiveHoverIndex(-1) : null)}
            onClick={() => (editable ? setRating(index) : null)}
          />
        ))}
      </div>
    </>
  )
}
