interface BtnVariantI {
  solid: string
  outline: string
  link: string
}
interface ColorVariantI {
  danger: string
  primary: string
  secondary: string
}

type Props = {
  variant?: keyof BtnVariantI
  color?: keyof ColorVariantI
  text: string
  prepend?: React.ReactNode
  type?: 'submit' | 'reset' | 'button'
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (...param: any) => any
}

export default function Button({
  variant = 'solid',
  color = 'primary',
  type = 'button',
  ...props
}: Props) {
  const BtnVariant: BtnVariantI = {
    solid: `bg-${color}`,
    outline: `border border-${color}`,
    link: `bg-transparent hover:text-${color} text-neutral-100`,
  }

  const textVariant: ColorVariantI = {
    primary: 'text-white',
    danger: 'text-white',
    secondary: 'text-neutral-100',
  }

  return (
    <button
      className={[
        'px-4 py-1 text-sm font-bold rounded-lg shadow-btn flex items-center gap-1',
        BtnVariant[variant],
        textVariant[color],
        props.className ?? '',
      ].join(' ')}
      onClick={props.onClick}
      type={type}
    >
      {!!props.prepend && props.prepend}
      {props.text}
    </button>
  )
}
