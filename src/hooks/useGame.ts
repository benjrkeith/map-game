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
  highlighted: string
  state: 'INIT' | 'PROGRESS' | 'OVER' | 'WON'
}

interface Actions {
  makeGuess: (guess: string) => void
  refineAnswers: () => Promise<void>
  setHighlighted: (country: string) => void
  endGame: () => void
}

type GameStore = State & Actions

export const useGame = create<GameStore>()((set, get) => ({
  startCountry,
  viewBox,
  guesses: [],
  answers,
  highlighted: '',
  state: 'INIT',

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

  setHighlighted: (country) => {
    set({ highlighted: country })
    setTimeout(() => set(() => ({ highlighted: '' })), 1000)
  },

  endGame: () => set({ state: 'OVER' }),
}))
