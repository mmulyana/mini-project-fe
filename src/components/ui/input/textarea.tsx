type Props = { label: string } & React.ComponentPropsWithoutRef<'textarea'>

export default function Textarea(props: Props) {
  return (
    <div className='flex flex-col gap-2 items-start'>
      <label htmlFor={props.id} className='text-xs font-bold leading-5'>
        {props.label}
      </label>
      <textarea
        {...props}
        className={[
          'p-2.5 rounded-lg border w-full bg-white border-neutral-40 active:border-[#079EB3] focus-within:border-[#01959F]/20 disabled:border-neutral-90 disabled:bg-neutral-40 text-neutral-90 text-sm',
          props.className ?? '',
        ].join(' ')}
      >
        {props.placeholder}
      </textarea>
    </div>
  )
}
