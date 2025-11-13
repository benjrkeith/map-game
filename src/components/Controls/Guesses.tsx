import clsx from 'clsx'
import { useShallow } from 'zustand/shallow'

import { useGame } from '../../hooks/useGame'

export function Guesses() {
  const { guesses, answers, setHighlighted } = useGame(
    useShallow((s) => ({
      guesses: s.guesses,
      answers: s.answers,
      setHighlighted: s.setHighlighted,
    })),
  )

  const correct = answers
    .filter((c) => guesses.includes(c.name))
    .map((c) => c.name)
  const incorrect = guesses.filter((guess) => !correct.includes(guess))

  return (
    <div className="z-20 flex w-full grow flex-col gap-2 bg-zinc-900 px-2 pb-2">
      {correct.length > 0 && (
        <div className="flex w-fit flex-col gap-1">
          <h2 className="text-md font-medium">Correct:</h2>
          <div className="flex flex-wrap gap-1.5">
            {correct.map((guess) => (
              <button
                type="button"
                key={guess}
                onClick={() => setHighlighted(guess)}
                className={clsx(
                  'h-fit w-fit rounded-lg bg-emerald-600 px-2 py-0.5 text-sm',
                )}
              >
                {guess}
              </button>
            ))}
          </div>
        </div>
      )}

      {incorrect.length > 0 && (
        <div className="flex w-fit flex-col gap-1">
          <h2 className="text-md font-medium">Incorrect:</h2>
          <div className="flex flex-wrap gap-1.5">
            {incorrect.map((guess) => (
              <p
                key={guess}
                className={clsx(
                  'h-fit w-fit rounded-lg bg-red-800 px-2 py-0.5 text-sm',
                )}
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
