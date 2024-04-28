import useClickOutside from '../../../hooks/use-click-outside'
import Button from '../button'
import IClose from '../../icon/i-close'
import IExclamation from '../../icon/i-excalamation'
import { useLocation, useNavigate } from 'react-router-dom'
import { deleteTask } from '../../../services/task'
import { useQueryClient } from 'react-query'

type Props = {
  isOpen: boolean
}

export default function DeleteItemModal(props: Props) {
  const queryCache = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const modalRef = useClickOutside({ callback: () => navigate('/v1/home') })

  async function handleDelete() {
    const id = queryParams.get('id') ?? ''
    const groupId = queryParams.get('group') ?? ''

    await deleteTask(id, groupId)
    queryCache.resetQueries()
    navigate('/v1/home')
  }

  if (!props.isOpen) return null

  return (
    <div className='fixed top-0 left-0 h-screen w-full z-30'>
      <div className='bg-neutral-90/80 absolute top-0 left-0 w-full h-full z-40'></div>
      <div
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-fit bg-white rounded-[10px] z-50'
        ref={modalRef}
      >
        <div className='p-6 flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <IExclamation />
            <p className='text-neutral-100 text-lg font-bold leading-[18px] m-0'>
              Delete Task
            </p>
          </div>
          <Button
            className='!p-0 h-6 w-6 flex items-center justify-center !bg-transparent !shadow-none'
            onClick={() => navigate('/v1/home')}
            prepend={<IClose />}
            text=''
          />
        </div>
        <div className='px-6 flex flex-col gap-5'>
          <p className='text-[#404040] text-sm'>
            Are you sure want to delete this task? your action can&apos;t be
            reverted.
          </p>
        </div>
        <div className='mt-2 p-6 flex justify-end gap-[10px] items-center'>
          <Button
            text='Cancel'
            variant='outline'
            color='secondary'
            type='button'
            onClick={() => navigate('/v1/home')}
          />
          <Button
            type='button'
            text='Submit'
            variant='solid'
            color='danger'
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  )
}
