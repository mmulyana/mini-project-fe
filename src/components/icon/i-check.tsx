import { IconProps } from './schemas'

export default function ICheck({
  stroke = '#fff',
  width = 16,
  height = 16,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clip-path='url(#clip0_4_931)'>
        <path
          d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z'
          fill='none'
        />
        <path
          d='M5.6001 7.89085L7.2001 9.49086L10.2911 6.3999'
          stroke={stroke}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_4_931'>
          <rect
            width={width}
            height={height}
            fill={stroke}
            transform='translate(0 16) rotate(-90)'
          />
        </clipPath>
      </defs>
    </svg>
  )
}
