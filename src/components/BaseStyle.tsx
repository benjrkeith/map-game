import type { PropsWithChildren } from 'react'

export function BaseStyle({ children }: PropsWithChildren) {
  return (
    <div className="h-full w-full overflow-y-scroll bg-zinc-700">
      <div className="mx-auto flex h-fit min-h-full w-full max-w-2xl min-w-[375px] flex-col bg-zinc-800 text-white shadow-xl shadow-black">
        {children}
      </div>
    </div>
  )
}
