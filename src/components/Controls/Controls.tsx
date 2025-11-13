import clsx from 'clsx'
import { type KeyboardEvent, useRef, useState } from 'react'
import { useShallow } from 'zustand/shallow'

import allCountries from '../../data.json'
import { useGame } from '../../hooks/useGame'
import { useSettings } from '../../hooks/useSettings'
import { CountryList } from './CountryList'
import { Guesses } from './Guesses'

export function Controls() {
  const [input, setInput] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const { startCountry, guesses, makeGuess } = useGame(
    useShallow((s) => ({
      startCountry: s.startCountry,
      state: s.state,
      guesses: s.guesses,
      makeGuess: s.makeGuess,
    })),
  )

  const showCountryName = useSettings((s) => s.showCountryName)

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
      if (selected > 0) setSelected((prev) => prev - 1)
    } else if (e.key === 'ArrowDown') {
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
    <div className="relative flex min-h-[30vh] grow flex-col items-center bg-zinc-900">
      <div className="peer relative z-20 flex w-full bg-zinc-900 p-2 text-lg">
        <input
          autoFocus
          autoComplete="off"
          value={input}
          ref={inputRef}
          onFocus={() => console.log('ahh')}
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

      {showCountryName && (
        <h2 className="relative z-20 w-full bg-zinc-900 p-1 text-center text-lg">
          Starting country is...{' '}
          <span className="font-bold">{startCountry.name}</span>
        </h2>
      )}

      <CountryList
        countries={filtered}
        selected={selected}
        isHidden={!isValidInput && input !== ''}
        callback={(country: string) => {
          setInput(country)
          setSelected(0)
        }}
      />

      <Guesses />
    </div>
  )
}
