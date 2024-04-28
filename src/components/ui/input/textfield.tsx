type Props = {
  label: string
  sizeInput?: 'small' | 'large'
  prepend?: React.ReactNode
  append?: React.ReactNode
} & React.ComponentPropsWithoutRef<'input'>
export default function Textfield({ sizeInput = 'small', ...props }: Props) {
  return (
    <div className='flex flex-col gap-2 items-start w-full'>
      <label htmlFor={props.id} className='text-xs font-bold leading-5'>
        {props.label}
      </label>

      <div className='relative w-full'>
        <input
          className={[
            'rounded-lg border w-full bg-white border-neutral-40 active:border-[#079EB3] focus-within:border-[#01959F]/20 disabled:border-neutral-90 disabled:bg-neutral-40 text-neutral-90 w-fu',
            props.prepend ? 'pl-[50px]' : '',
            props.append ? 'pr-[50px]' : '',
            sizeInput == 'small'
              ? 'px-4 py-2 font-normal text-xs'
              : 'px-4 py-[15px] font-bold text-base',
            props.className ?? '',
          ].join(' ')}
          {...props}
        />

        {/* prepend icon */}
        {!!props.prepend && (
          <div className='absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4 flex items-center justify-center'>
            {props.prepend}
          </div>
        )}

        {/* append icon */}
        {!!props.append && (
          <div className='absolute top-1/2 -translate-y-1/2 right-4 h-4 w-4 flex items-center justify-center'>
            {props.append}
          </div>
        )}
      </div>
    </div>
  )
}
