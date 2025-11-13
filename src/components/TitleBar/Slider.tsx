interface SliderProps {
  value: boolean
  toggle: () => void
}

export function Slider({ value, toggle }: SliderProps) {
  return (
    <label className="relative block h-8 w-14 cursor-pointer rounded-full bg-rose-400 transition-colors has-checked:bg-emerald-600">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={value}
        onChange={toggle}
      />
      <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-zinc-900 transition-[inset-inline-start] peer-checked:start-6" />
    </label>
  )
}
