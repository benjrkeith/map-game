import { useEffect, useRef, useState } from 'react'

import { useGame } from '../../hooks/useGame'
import { useSettings } from '../../hooks/useSettings'
import { SettingsMenu } from './SettingsMenu'

export function TitleBar() {
  const [showSettings, setShowSettings] = useState(false)
  const toggleSettings = () => setShowSettings((prev) => !prev)

  const startCountry = useGame((s) => s.startCountry)
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
        <button
          type="button"
          style={{ fontWeight: 2000 }}
          className="ml-auto px-3 text-4xl"
          onClick={toggleSettings}
        >
          ⋮
        </button>
      </div>

      <SettingsMenu isShown={showSettings} />
    </div>
  )
}
