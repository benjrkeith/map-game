import { Slider } from './Slider'

interface SettingProps {
  title: string
  desc: string
  value: boolean
  toggle: () => void
}

export function Setting({ title, desc, value, toggle }: SettingProps) {
  return (
    <div className="flex gap-3 py-3">
      <div className="my-auto">
        <h3 className="text-xl font-medium xs:text-2xl">{title}</h3>
        <p className="text-sm xs:text-base">{desc}</p>
      </div>

      <div className="my-auto ml-auto">
        <Slider value={value} toggle={toggle} />
      </div>
    </div>
  )
}
