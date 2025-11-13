import clsx from 'clsx'

import * as types from '../../types'

interface CountryProps {
  data: types.Country
  viewBox: types.ViewBox
  state: 'START' | 'KNOWN' | 'UNKNOWN' | 'MISSED' | 'HIGHLIGHT'
  showBorders: boolean
}

export function Country({ data, viewBox, state, showBorders }: CountryProps) {
  return (
    <svg
      id={`${data.id}-${data.name}`}
      viewBox={viewBox.str}
      className="absolute h-full w-full"
    >
      <path
        d={data.path}
        style={{ strokeWidth: viewBox.w / 100 }}
        className={clsx('duration-500 ease-in-out', {
          'fill-offwhite stroke-offwhite': state === 'START',
          'fill-emerald-600 stroke-emerald-600': state === 'KNOWN',
          'fill-zinc-800 stroke-zinc-800': state === 'UNKNOWN',
          'fill-amber-500 stroke-amber-500': state === 'MISSED',
          'fill-purple-800 stroke-purple-800 !stroke-1': state === 'HIGHLIGHT',
          '!stroke-zinc-700': showBorders && state !== 'HIGHLIGHT',
        })}
      />
    </svg>
  )
}
