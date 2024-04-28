type Props = {
  percentage: number
}
export default function ProgressCount(props: Props) {
  return (
    <div className='grid grid-cols-[calc(100%-50px)_1fr] max-w-full h-4 gap-3'>
      <div className='relative w-full h-4 rounded-full overflow-hidden bg-neutral-50'>
        <div
          className={[
            'h-4',
            props.percentage == 100 ? 'bg-success' : 'bg-primary',
          ].join(' ')}
          style={{
            width: props.percentage + '%',
          }}
        ></div>
      </div>
      {props.percentage === 100 ? (
        <div className='w-4 h-4 rounded-full bg-success'></div>
      ) : (
        <p className='text-xs text-neutral-70 m-0 leading-4'>
          {props.percentage + ' %'}
        </p>
      )}
    </div>
  )
}
