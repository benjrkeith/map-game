import { create } from 'zustand'

import { getIncorrectAnswers } from '../lib/getIncorrectAnswers'
import { init } from '../lib/init'
import * as types from '../types'

const { startCountry, viewBox, answers } = init()

interface State {
  startCountry: types.Country
  viewBox: types.ViewBox
  guesses: string[]
  answers: types.Country[]
  highlight: string
  state: 'INIT' | 'PROGRESS' | 'OVER' | 'WON'
  hideStats: boolean
}

interface Actions {
  makeGuess: (guess: string) => void
  refineAnswers: () => Promise<void>
  setHighlight: (country: string) => void
  endGame: () => void
  toggleStats: () => void
}

type GameStore = State & Actions

export const useGame = create<GameStore>()((set, get) => ({
  startCountry,
  viewBox,
  guesses: [],
  answers,
  highlight: '',
  state: 'INIT',
  hideStats: false,

  makeGuess: (guess: string) => {
    set((s) => ({ guesses: [...s.guesses, guess] }))
    const { state, answers, guesses } = get()

    if (state === 'INIT') set({ state: 'PROGRESS' })
    const isWon = answers.every((a) => guesses.includes(a.name))
    if (isWon) set({ state: 'WON' })
  },

  refineAnswers: async () => {
    const incorrect = await getIncorrectAnswers(viewBox)
    set((s) => ({
      answers: s.answers.filter((a) => !incorrect.includes(a.name)),
    }))

    console.log(
      startCountry.name,
      get().answers.map((c) => c.name),
    )
  },

  setHighlight: (country) => {
    // Fix for stroke not appearing if the target is lower on z-index than
    // its neighbours. Can't animate z-index changes so this is best solution.
    set((s) => {
      const index = s.answers.findIndex((i) => i.name === country)
      if (index === -1) return s

      const items = [...s.answers]
      items.push(items.splice(index, 1)[0])

      return { answers: items }
    })

    setTimeout(() => {
      set({ highlight: country })
      setTimeout(() => set({ highlight: '' }), 1000)
    }, 100)
  },

  endGame: () => set({ state: 'OVER' }),
  toggleStats: () => set((s) => ({ hideStats: !s.hideStats })),
}))
