import IPlus from '../../icon/i-plus'
import Button from '../button'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModal: (param: any) => void
}
export default function Header(props: Props) {
  return (
    <div className='w-full h-16 border-b border-neutral-40'>
      <div className='flex items-center gap-[10px] px-5 container mx-auto h-full'>
        <p className='text-lg font-bold text-[#1E1F21] leading-7'>
          Product Roadmap
        </p>
        <Button
          variant='solid'
          color='primary'
          text='Add New Group'
          onClick={props.openModal}
          prepend={<IPlus />}
        />
      </div>
    </div>
  )
}
