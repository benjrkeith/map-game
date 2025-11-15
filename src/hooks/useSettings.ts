import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  showBorders: boolean
  showOceans: boolean
  showCountryName: boolean
  firstLaunch: boolean
}

interface Actions {
  toggleBorders: () => void
  toggleOceans: () => void
  toggleCountryName: () => void
  toggleFirstLaunch: () => void
}

type SettingsStore = State & Actions

export const useSettings = create<SettingsStore>()(
  persist(
    (set) => ({
      showBorders: true,
      showOceans: true,
      showCountryName: true,
      firstLaunch: true,
      toggleBorders: () => set((s) => ({ showBorders: !s.showBorders })),
      toggleOceans: () => set((s) => ({ showOceans: !s.showOceans })),
      toggleCountryName: () =>
        set((s) => ({ showCountryName: !s.showCountryName })),
      toggleFirstLaunch: () => set({ firstLaunch: false }),
    }),
    { name: 'settings' },
  ),
)
