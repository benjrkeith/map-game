import clsx from 'clsx'
import { useEffect, useRef } from 'react'

import * as types from '../../types'

interface CountryListProps {
  countries: types.Country[]
  selected: number
  isHidden: boolean
  callback: (country: string) => void
}

export function CountryList({
  countries,
  selected,
  isHidden,
  callback,
}: CountryListProps) {
  const selectedRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    selectedRef.current?.scrollIntoView()
  }, [selected])

  return (
    <div
      className={clsx(
        'shadow-up absolute flex max-h-38 w-full flex-col divide-y-2 divide-zinc-700 overflow-scroll border-b-2 border-zinc-700 bg-zinc-900/90 text-lg duration-100 ease-out',
        {
          'peer-has-focus:-translate-y-full': countries.length > 0 && isHidden,
        },
      )}
    >
      {countries.map((c, i) => (
        <button
          key={c.id}
          type="button"
          ref={selected === i ? selectedRef : null}
          onMouseDown={() => callback(c.name)}
          className={clsx('mt-auto px-2 py-1 text-left hover:bg-zinc-800', {
            'bg-zinc-700': i === selected,
          })}
        >
          {c.name}
        </button>
      ))}
    </div>
  )
}
