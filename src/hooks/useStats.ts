import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  played: number
  completed: number
  averageScore: number | null
}

interface Actions {
  saveGameStats: (score: number) => void
}

type StatsStore = State & Actions

export const useStats = create<StatsStore>()(
  persist(
    (set) => ({
      played: 0,
      completed: 0,
      averageScore: null,
      saveGameStats: (score: number) =>
        set((s) => ({
          played: s.played + 1,
          completed: score === 100 ? s.completed + 1 : s.completed,
          averageScore: s.averageScore
            ? (s.averageScore * s.played + score) / (s.played + 1)
            : score,
        })),
    }),
    { name: 'stats' },
  ),
)
