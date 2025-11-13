import clsx from 'clsx'
import { useShallow } from 'zustand/shallow'

import { useGame } from '../../hooks/useGame'
import { useSettings } from '../../hooks/useSettings'
import { Country } from './Country'

export function WorldMap() {
  const { showBorders, showOceans } = useSettings(
    useShallow((s) => ({
      showBorders: s.showBorders,
      showOceans: s.showOceans,
    })),
  )

  const { startCountry, state, viewBox, guesses, answers, highlight } = useGame(
    useShallow((s) => ({
      startCountry: s.startCountry,
      state: s.state,
      viewBox: s.viewBox,
      guesses: s.guesses,
      answers: s.answers,
      highlight: s.highlight,
    })),
  )

  const getState = (country: string) => {
    if (startCountry.name === country) return 'START'
    else if (highlight === country) return 'HIGHLIGHT'
    else if (guesses.includes(country)) return 'KNOWN'
    else return state === 'OVER' ? 'MISSED' : 'UNKNOWN'
  }

  return (
    <div className="overflow-hidden">
      <div
        className={clsx(
          'relative z-0 aspect-square w-full min-w-[375px] bg-zinc-800 duration-500 ease-in-out',
          { '!bg-blue-500': showOceans },
        )}
      >
        {[startCountry, ...answers].map((country) => (
          <Country
            key={country.id}
            data={country}
            viewBox={viewBox}
            state={getState(country.name)}
            showBorders={showBorders}
          />
        ))}
      </div>
    </div>
  )
}
