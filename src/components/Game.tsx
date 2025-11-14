import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'

import { useGame } from '../hooks/useGame'
import { BaseStyle } from './BaseStyle'
import { Controls } from './Controls/Controls'
import { Guesses } from './Controls/Guesses'
import { EndScreen } from './EndScreen'
import { TitleBar } from './TitleBar/TitleBar'
import { WorldMap } from './WorldMap/WorldMap'

export function Game() {
  const { startCountry, refineAnswers } = useGame(
    useShallow((s) => ({
      startCountry: s.startCountry,
      refineAnswers: s.refineAnswers,
    })),
  )

  // Expensive so best to do async
  useEffect(() => {
    refineAnswers()
  }, [startCountry])

  return (
    <BaseStyle>
      <TitleBar />
      <WorldMap />

      <div className="flex grow flex-col bg-zinc-900 pb-2">
        <Controls />
        <Guesses />
      </div>

      <EndScreen />
    </BaseStyle>
  )
}
