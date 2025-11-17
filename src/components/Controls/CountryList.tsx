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
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const con = containerRef.current
    const button = con?.children[0] as HTMLButtonElement
    if (!button) return

    const elHeight = button.offsetHeight
    containerRef.current?.scrollTo({ top: selected * elHeight })
  }, [selected])

  return (
    <div
      ref={containerRef}
      className={clsx(
        'shadow-up absolute z-10 flex max-h-38 w-full flex-col divide-y-2 divide-zinc-700 overflow-y-scroll border-b-2 border-zinc-700 bg-zinc-900/90 text-lg duration-100 ease-out xs:text-xl',
        {
          'peer-has-focus:-translate-y-full': countries.length > 0 && isHidden,
        },
      )}
    >
      {countries.length
        ? countries.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => callback(c.name)}
              className={clsx(
                'mt-auto box-border px-2 py-1 text-left hover:bg-zinc-800',
                {
                  'bg-zinc-700': i === selected,
                },
              )}
            >
              {c.name}
            </button>
          ))
        : '0'}
    </div>
  )
}
