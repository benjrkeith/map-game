import { useEffect, useRef, useState } from 'react'
import { useShallow } from 'zustand/shallow'

import { useGame } from '../../hooks/useGame'
import { useSettings } from '../../hooks/useSettings'
import { SettingsIcon } from './SettingsIcon'
import { SettingsMenu } from './SettingsMenu'
import { SurrenderIcon } from './SurrenderIcon'

export function TitleBar() {
  const [showSettings, setShowSettings] = useState(false)
  const toggleSettings = () => setShowSettings((prev) => !prev)

  const { startCountry, state, endGame } = useGame(
    useShallow((s) => ({
      startCountry: s.startCountry,
      state: s.state,
      endGame: s.endGame,
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

  return (
    <div ref={ref} className="relative">
      <div className="shadow-down relative z-20 flex bg-zinc-900 px-3 py-2 font-bold">
        <h1 className="my-auto truncate text-3xl">
          {showCountryName ? startCountry.name : 'Map Game'}
        </h1>

        <div className="ml-auto flex gap-2">
          {(state === 'INIT' || state === 'PROGRESS') && (
            <button
              type="button"
              onClick={endGame}
              className="tooltip group p-1"
            >
              <SurrenderIcon className="group-hover:fill-zinc-400" />
              <span className="tooltip-text">Surrender</span>
            </button>
          )}

          <button
            type="button"
            onClick={toggleSettings}
            className="tooltip group p-1"
          >
            <SettingsIcon className="group-hover:fill-zinc-400" />
            <span className="tooltip-text">Settings</span>
          </button>
        </div>
      </div>

      <SettingsMenu isShown={showSettings} />
    </div>
  )
}
