import clsx from 'clsx'
import { type KeyboardEvent, useRef, useState } from 'react'
import { useShallow } from 'zustand/shallow'

import allCountries from '../../data.json'
import { useGame } from '../../hooks/useGame'
import { CountryList } from './CountryList'

export function Controls() {
  const [input, setInput] = useState('')
  const [selected, setSelected] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const { startCountry, state, guesses, makeGuess, toggleStats } = useGame(
    useShallow((s) => ({
      startCountry: s.startCountry,
      state: s.state,
      guesses: s.guesses,
      makeGuess: s.makeGuess,
      toggleStats: s.toggleStats,
    })),
  )

  const filtered = allCountries.filter(
    (c) =>
      c.name.toLowerCase().includes(input.toLowerCase()) &&
      c.name !== startCountry.name &&
      !guesses.includes(c.name),
  )
  const isValidInput = input === filtered[selected]?.name

  const handleSubmit = () => {
    makeGuess(filtered[selected].name)
    setInput('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (selected > 0) setSelected((prev) => prev - 1)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (selected < filtered.length - 1) setSelected((prev) => prev + 1)
    } else if (e.key === 'Escape') {
      inputRef.current?.blur()
    } else if (e.key === 'Enter') {
      if (input === '') return
      const target = filtered[selected]?.name
      if (target === input) handleSubmit()
      else if (target) {
        setInput(target)
        setSelected(0)
        inputRef.current?.setSelectionRange(target.length, target.length)
      }
    }
  }

  return (
    <div className="relative flex h-fit flex-col">
      {(state === 'INIT' || state === 'PROGRESS') && (
        <div className="peer z-20 flex flex-col items-center bg-zinc-900 px-2">
          <div className="relative flex w-full pt-3 text-lg">
            <input
              autoComplete="off"
              value={input}
              ref={inputRef}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setInput(e.target.value)
                setSelected(0)
              }}
              className="w-full rounded-l-2xl border-2 border-r-0 border-zinc-600 px-4 py-2 hover:border-blue-200/50 focus:border-blue-200/80 focus:outline-0"
            />

            <button
              type="button"
              disabled={!isValidInput}
              onClick={handleSubmit}
              className={clsx(
                'rounded-r-2xl border-2 border-blue-400 px-4 font-semibold text-blue-400 hover:bg-blue-400 hover:text-white focus:border-blue-200 focus:outline-0',
                { 'cursor-not-allowed': !isValidInput },
              )}
            >
              Guess
            </button>
          </div>
        </div>
      )}

      {(state === 'OVER' || state === 'WON') && (
        <div className="z-20 grid grid-cols-2 bg-zinc-900 px-2 pt-3 text-lg font-semibold">
          <button
            onClick={toggleStats}
            className="mx-6 rounded-lg bg-purple-600 py-0.5 hover:bg-purple-800"
          >
            View Stats
          </button>
          <button
            onClick={() => window.location.reload()}
            className="mx-6 rounded-lg bg-emerald-600 py-0.5 hover:bg-emerald-800"
          >
            New Game
          </button>
        </div>
      )}

      <CountryList
        countries={filtered}
        selected={selected}
        isHidden={!isValidInput && input !== ''}
        callback={(country: string) => {
          setInput(country)
          setSelected(0)
          inputRef.current?.focus()
        }}
      />
    </div>
  )
}
