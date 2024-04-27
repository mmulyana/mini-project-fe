type Props = {
  title: string
  variant: 1 | 2 | 3 | 4
}
export default function Label(props: Props) {
  const labelVariant = {
    1: 'bg-[#F7FEFF] border-[#4DB5BC] text-[#01959F]',
    2: 'bg-[#FFFCF5] border-[#FEEABC] text-[#FA9810]',
    3: 'bg-[#FFFAFA] border-[#F5B1B7] text-[#E11428]',
    4: 'bg-[#F8FBF9] border-[#B8DBCA] text-[#43936C]',
  }
  return (
    <div
      className={[
        'py-0.5 px-2 rounded-[4px] border',
        labelVariant[props.variant],
      ].join(' ')}
    >
      <p className='m-0 text-xs font-normal leading-5'>{props.title}</p>
    </div>
  )
}
