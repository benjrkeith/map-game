import clsx from 'clsx'

import { useSettings } from '../../hooks/useSettings'
import { Setting } from './Setting'

export function SettingsMenu({ isShown }: { isShown: boolean }) {
  const settings = useSettings()

  return (
    <div
      className={clsx(
        'bg-zinc-00 absolute bottom-0 z-10 flex w-full flex-col divide-y-2 divide-zinc-700 bg-zinc-800 px-3 duration-200 ease-out',
        { 'shadow-down translate-y-full': isShown },
      )}
    >
      <Setting
        title="Show Borders"
        desc="Show the outline of each country, including those you haven't guessed yet."
        value={settings.showBorders}
        toggle={settings.toggleBorders}
      />

      <Setting
        title="Show Oceans"
        desc="Sets the colour of the oceans to blue."
        value={settings.showOceans}
        toggle={settings.toggleOceans}
      />

      <Setting
        title="Show Country Name"
        desc="Show the name of the starting country."
        value={settings.showCountryName}
        toggle={settings.toggleCountryName}
      />
    </div>
  )
}
