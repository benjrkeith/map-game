import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'

import { useGame } from '../hooks/useGame'
import { useStats } from '../hooks/useStats'

export function EndScreen() {
  const { state, guesses, answers } = useGame(
    useShallow((s) => ({
      state: s.state,
      guesses: s.guesses,
      answers: s.answers,
    })),
  )

  const saveGameStats = useStats((s) => s.saveGameStats)

  const correct = answers
    .filter((c) => guesses.includes(c.name))
    .map((c) => c.name)
  const incorrect = guesses.filter((guess) => !correct.includes(guess))
  const score = Math.round((correct.length / answers.length) * 100)

  useEffect(() => {
    saveGameStats(score)
  }, [])

  return (
    <div className="shadow-up relative z-20 grow bg-zinc-900 p-2">
      EndScreen
    </div>
  )
}
