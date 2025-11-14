import { useShallow } from 'zustand/shallow'

import { useGame } from '../../hooks/useGame'

export function Guesses() {
  const { state, guesses, answers, setHighlight } = useGame(
    useShallow((s) => ({
      state: s.state,
      guesses: s.guesses,
      answers: s.answers,
      setHighlight: s.setHighlight,
    })),
  )

  const correct = answers
    .filter((c) => guesses.includes(c.name))
    .map((c) => c.name)
    .sort()
  const incorrect = guesses.filter((guess) => !correct.includes(guess))
  const missing = answers
    .filter((c) => !guesses.includes(c.name))
    .map((c) => c.name)
    .sort()

  return (
    <div className="relative z-20 flex w-full grow flex-col gap-2 bg-zinc-900 px-2 pt-3 font-medium">
      {correct.length > 0 && (
        <div className="flex w-full flex-col gap-1">
          <h2 className="text-md font-semibold">Correct:</h2>
          <div className="flex flex-wrap gap-1.5">
            {correct.map((guess) => (
              <button
                type="button"
                key={guess}
                onClick={() => setHighlight(guess)}
                className="h-fit w-fit rounded-lg bg-emerald-600 px-2 py-0.5 text-sm"
              >
                {guess}
              </button>
            ))}
          </div>
        </div>
      )}

      {state === 'OVER' && missing.length > 0 && (
        <div className="flex w-fit flex-col gap-1">
          <h2 className="text-md font-semibold">Missed:</h2>
          <div className="flex flex-wrap gap-1.5">
            {missing.map((guess) => (
              <button
                type="button"
                key={guess}
                onClick={() => setHighlight(guess)}
                className="h-fit w-fit rounded-lg bg-amber-500 px-2 py-0.5 text-sm"
              >
                {guess}
              </button>
            ))}
          </div>
        </div>
      )}

      {incorrect.length > 0 && (
        <div className="flex w-fit flex-col gap-1">
          <h2 className="text-md font-semibold">Incorrect:</h2>
          <div className="flex flex-wrap gap-1.5">
            {incorrect.map((guess) => (
              <p
                key={guess}
                className="h-fit w-fit rounded-lg bg-red-800 px-2 py-0.5 text-sm"
              >
                {guess}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
