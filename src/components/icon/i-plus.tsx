import { IconProps } from './schemas'

export default function IPlus({
  stroke = '#fff',
  width = 12,
  height = 12,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6 2.5V9.5'
        stroke={stroke}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.5 6H9.5'
        stroke={stroke}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
