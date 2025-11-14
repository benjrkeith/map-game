import clsx from 'clsx'
import { type MouseEvent, useEffect, useRef } from 'react'
import { useShallow } from 'zustand/shallow'

import { useGame } from '../hooks/useGame'
import { useStats } from '../hooks/useStats'

export function EndScreen() {
  const { state, guesses, answers, hideStats, toggleStats } = useGame(
    useShallow((s) => ({
      state: s.state,
      guesses: s.guesses,
      answers: s.answers,
      hideStats: s.hideStats,
      toggleStats: s.toggleStats,
    })),
  )

  const innerRef = useRef<HTMLDivElement>(null)
  const { played, completed, averageScore, saveGameStats } = useStats()

  const correct = answers
    .filter((c) => guesses.includes(c.name))
    .map((c) => c.name)
  const incorrect = guesses.filter((guess) => !correct.includes(guess))
  const missing = answers
    .filter((c) => !guesses.includes(c.name))
    .map((c) => c.name)
  const score = Math.round((correct.length / answers.length) * 100)

  useEffect(() => {
    if (state === 'OVER' || state === 'WON') saveGameStats(score)
  }, [state])

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!innerRef.current?.contains(e.target as Node)) toggleStats()
  }

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'pointer-events-none absolute z-50 flex h-full w-full opacity-0 backdrop-blur-xs duration-300 ease-in-out',
        {
          '!pointer-events-auto opacity-100':
            (state === 'WON' || state === 'OVER') && !hideStats,
        },
      )}
    >
      <div
        ref={innerRef}
        className="m-auto flex h-fit w-3/4 flex-col gap-4 rounded-sm bg-zinc-900 px-4 py-6 text-center shadow-xl shadow-black/40"
      >
        <h3 className="w-full text-3xl font-semibold">
          {state === 'WON' ? 'You win!' : 'Game over!'}
        </h3>

        <div className="flex justify-evenly">
          <div className="text-lg">
            <p className="text-emerald-600">{correct.length} correct</p>
            <p className="text-amber-500">{missing.length} missed</p>
            <p className="text-rose-600">{incorrect.length} incorrect</p>
          </div>

          <div className="my-auto text-center">
            <p className="text-4xl font-semibold">{score}%</p>
            <p className="text-lg">Score</p>
          </div>
        </div>

        <div className="">
          <div className="z-20 grid grid-cols-2 gap-4 bg-zinc-900 px-4 text-lg font-semibold">
            <button
              onClick={toggleStats}
              className="rounded-lg bg-purple-600 py-0.5 hover:bg-purple-800"
            >
              View Map
            </button>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-emerald-600 py-0.5 hover:bg-emerald-800"
            >
              New Game
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="text-xl font-semibold">All Time</h4>
          <div className="grid grid-cols-3">
            <Stat label="Played" value={played} />
            <Stat
              label="AVG Score"
              value={`${Math.round(averageScore ?? 0)}%`}
            />
            <Stat label="Completed" value={completed} />
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatProps {
  label: string
  value: number | string
}

function Stat(props: StatProps) {
  const { label, value } = props

  return (
    <div className="text-center">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs">{label}</p>
    </div>
  )
}
