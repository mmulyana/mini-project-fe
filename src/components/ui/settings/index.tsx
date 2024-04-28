import { useState } from 'react'
import Button from '../button'
import Dialog from '../dialog'
import IMore from '../../icon/i-more'
import useClickOutside from '../../../hooks/use-click-outside'
import { UniqueIdentifier } from '@dnd-kit/core'
import IArrowRight from '../../icon/i-arrow-right'
import IArrowLeft from '../../icon/i-arrow-left'
import IEdit from '../../icon/i-edit'
import ITrash from '../../icon/i-trash'
import { useQueryClient } from 'react-query'
import { updateItem } from '../../../services/task'

type Props = {
  id: UniqueIdentifier
  todo_id: number
  toggleEdit: () => void
  setActiveId: (val: UniqueIdentifier) => void
  handleEdit: () => void
  handleDelete: () => void
}
export default function Settings(props: Props) {
  const queryCache = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(!isOpen)

  async function handleMove(direction: 'left' | 'right') {
    let id = props.todo_id
    if (direction == 'left') {
      id -= 1
    } else {
      id += 1
    }
    await updateItem(props.id, props.todo_id, id)

    queryCache.invalidateQueries(['items', props.todo_id])
    queryCache.invalidateQueries(['items', id])
  }

  const ref = useClickOutside({
    callback: () => setIsOpen(false),
  })

  return (
    <div className='relative' ref={ref}>
      <Button
        prepend={<IMore />}
        text=''
        variant='link'
        color='secondary'
        className='border-none rounded-[4px] h-6 w-6 !p-0 flex items-center justify-center shadow-none hover:bg-neutral-50'
        onClick={handleOpen}
      />
      <Dialog
        className='py-1 bg-white w-[200px] shadow-dialog rounded-[4px] absolute top-[100%+24px] z-10'
        isOpen={isOpen}
      >
        <Button
          prepend={<IArrowRight stroke='currentColor' />}
          text='Move Right'
          className='gap-4 !text-neutral-90 w-full !shadow-none hover:!text-primary'
          variant='link'
          color='primary'
          onClick={() => handleMove('right')}
        />
        <Button
          prepend={<IArrowLeft stroke='currentColor' />}
          text='Move Left'
          className='gap-4 !text-neutral-90 w-full !shadow-none hover:!text-primary'
          variant='link'
          color='primary'
          onClick={() => handleMove('left')}
        />
        <Button
          prepend={<IEdit stroke='currentColor' />}
          text='Edit'
          className='gap-4 !text-neutral-90 w-full !shadow-none hover:!text-primary'
          variant='link'
          color='primary'
          onClick={() => {
            props.handleEdit()
            props.setActiveId(props.id)
            props.toggleEdit()
          }}
        />
        <Button
          prepend={<ITrash stroke='currentColor' />}
          text='Delete'
          className='gap-4 !text-neutral-90 w-full !shadow-none hover:!text-danger'
          variant='link'
          color='primary'
          onClick={() => props.handleDelete()}
        />
      </Dialog>
    </div>
  )
}
