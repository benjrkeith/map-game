import { useEffect, useRef, useState } from 'react'
import { useShallow } from 'zustand/shallow'

import { useGame } from '../../hooks/useGame'
import { useSettings } from '../../hooks/useSettings'
import { InfoIcon } from './Icons/InfoIcon'
import { SettingsIcon } from './Icons/SettingsIcon'
import { SurrenderIcon } from './Icons/SurrenderIcon'
import { SettingsMenu } from './SettingsMenu'

export function TitleBar() {
  const [showSettings, setShowSettings] = useState(false)
  const toggleSettings = () => setShowSettings((prev) => !prev)

  const { startCountry, state, endGame, toggleInfo } = useGame(
    useShallow((s) => ({
      startCountry: s.startCountry,
      state: s.state,
      endGame: s.endGame,
      toggleInfo: s.toggleInfo,
    })),
  )
  const showCountryName = useSettings((s) => s.showCountryName)

  const ref = useRef<HTMLDivElement>(null)
  const handleMouseDown = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node))
      setShowSettings(false)
  }

  useEffect(() => {
    if (showSettings) document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [showSettings])

  const isOver = state === 'OVER' || state === 'WON'

  return (
    <div ref={ref} className="relative">
      <div className="shadow-down relative z-20 flex gap-2 bg-zinc-900 px-3 py-2 font-bold">
        <h1 className="my-auto truncate text-3xl">
          {showCountryName || isOver ? startCountry.name : 'Map Game'}
        </h1>

        <div className="ml-auto flex gap-1">
          {!isOver && (
            <button type="button" onClick={endGame} className="group p-1">
              <SurrenderIcon className="group-hover:fill-zinc-400" />
            </button>
          )}

          <button type="button" onClick={toggleInfo} className="group p-1">
            <InfoIcon className="group-hover:fill-zinc-400" />
          </button>

          <button type="button" onClick={toggleSettings} className="group p-1">
            <SettingsIcon className="group-hover:fill-zinc-400" />
          </button>
        </div>
      </div>

      <SettingsMenu isShown={showSettings} />
    </div>
  )
}
