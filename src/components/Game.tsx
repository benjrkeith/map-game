import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'

import { useGame } from '../hooks/useGame'
import { BaseStyle } from './BaseStyle'
import { Controls } from './Controls/Controls'
import { EndScreen } from './EndScreen'
import { TitleBar } from './TitleBar/TitleBar'
import { WorldMap } from './WorldMap/WorldMap'

export function Game() {
  const { startCountry, state, refineAnswers } = useGame(
    useShallow((s) => ({
      startCountry: s.startCountry,
      state: s.state,
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
      {(state === 'INIT' || state === 'PROGRESS') && <Controls />}
      {(state === 'OVER' || state === 'WON') && <EndScreen />}
    </BaseStyle>
  )
}
