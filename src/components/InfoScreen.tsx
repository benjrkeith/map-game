import clsx from 'clsx'
import { type MouseEvent, useRef } from 'react'
import { useShallow } from 'zustand/shallow'

import { useGame } from '../hooks/useGame'
import { useSettings } from '../hooks/useSettings'
import { InfoIcon } from './TitleBar/Icons/InfoIcon'
import { SettingsIcon } from './TitleBar/Icons/SettingsIcon'
import { SurrenderIcon } from './TitleBar/Icons/SurrenderIcon'

export function InfoScreen() {
  const innerRef = useRef<HTMLDivElement>(null)
  const { hideInfo, toggleInfo } = useGame(
    useShallow((s) => ({ hideInfo: s.hideInfo, toggleInfo: s.toggleInfo })),
  )

  const { firstLaunch, toggleFirstLaunch } = useSettings(
    useShallow((s) => ({
      firstLaunch: s.firstLaunch,
      toggleFirstLaunch: s.toggleFirstLaunch,
    })),
  )

  const hidePage = () => {
    if (firstLaunch) toggleFirstLaunch()
    if (!hideInfo) toggleInfo()
  }

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!innerRef.current?.contains(e.target as Node)) hidePage()
  }

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'pointer-events-none absolute z-50 flex h-full w-full opacity-0 backdrop-blur-xs duration-300 ease-in-out',
        { '!pointer-events-auto !opacity-100': firstLaunch || !hideInfo },
      )}
    >
      <div
        ref={innerRef}
        className="m-auto flex h-fit w-7/8 flex-col gap-6 rounded-sm bg-zinc-900 px-4 py-6 text-left shadow-xl shadow-black/40"
      >
        <h1 className="text-center text-4xl font-bold xs:text-5xl">Map Game</h1>

        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold xs:text-2xl">Objective</h3>
          <p className="xs:text-lg">
            Given a starting location, name every other country and territory
            that appears on the map.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold xs:text-2xl">Difficulty</h3>
          <p className="xs:text-lg">
            The difficulty can be adjusted in the settings panel, accessible at
            the top-right of the page.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold xs:text-2xl">Legend</h3>

          <div className="flex flex-col gap-2 xs:gap-3">
            <div className="flex items-center gap-3">
              <SurrenderIcon />
              <span className="xs:text-lg">
                End the current game and view your results.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <InfoIcon />
              <span className="xs:text-lg">Open this info page.</span>
            </div>

            <div className="flex items-center gap-3">
              <SettingsIcon />
              <span className="xs:text-lg">Open the settings panel.</span>
            </div>
          </div>
        </div>

        <div className="flex w-full">
          <button
            className="mx-auto w-fit rounded-3xl bg-blue-600 px-5 py-2 text-lg font-semibold hover:bg-blue-800 xs:py-3 xs:text-xl"
            onClick={hidePage}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  )
}
