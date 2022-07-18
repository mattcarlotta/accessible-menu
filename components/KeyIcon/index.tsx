import type { ReactNode } from 'react'

export default function KeyIcon({
  children,
  fontSize,
  height,
  rotate,
  width,
  x,
  y
}: {
  children: ReactNode
  fontSize?: string
  height: string
  rotate?: string
  width: string
  x?: string
  y?: string
}) {
  return (
    <svg
      className="align-middle inline-block"
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <g fill="#fff" stroke="#000" strokeWidth="2">
        <path d="M 10 90 L 10 20 L 20 10 L 80 10 L 90 20 L 90 90 Z" />
        <path d="M 10 90 L 20 70 L 20 10" />
        <path d="M 20 70 L 80 70" />
        <path d="M 90 90 L 80 70 L 80 10" />
      </g>
      <text
        x={x || '50'}
        y={y || '45'}
        rotate={rotate || '0'}
        fontSize={fontSize || '1rem'}
        textAnchor="middle"
      >
        {children}
      </text>
    </svg>
  )
}
