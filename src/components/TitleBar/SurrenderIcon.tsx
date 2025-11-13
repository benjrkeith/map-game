import type { SVGProps } from 'react'

export function SurrenderIcon(props: SVGProps<SVGPathElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={25}
      height={25}
      viewBox="0 0 51.48 51.48"
    >
      <path
        fill="#FFF"
        {...props}
        fillRule="nonzero"
        d="M9.66 51.48c2.523 0 4.5-2.416 4.5-5.5V27.5h27.732c1.89 0 3.362-.732 4.039-2.009.678-1.277.458-2.907-.601-4.473l-1.392-2.054c-1.208-1.784-1.194-4.788.031-6.56l1.315-1.902c1.474-2.131 1.034-3.708.641-4.458-.394-.75-1.44-2.008-4.032-2.008H13.985C13.471 1.69 11.765 0 9.66 0 7.137 0 5.161 2.416 5.161 5.5v40.48c0 3.084 1.976 5.5 4.499 5.5z"
      />
    </svg>
  )
}
