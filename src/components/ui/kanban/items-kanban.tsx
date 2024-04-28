import { useSortable } from '@dnd-kit/sortable'
import ProgressCount from '../progress-count'
import Settings from '../settings'
import { CSS } from '@dnd-kit/utilities'
import { UniqueIdentifier } from '@dnd-kit/core'

export type ItemProps = {
  id: number
  name: string
  done: null | boolean
  todo_id: number
  progress_percentage: number | null
  toggleEdit: () => void
  setActiveId: (val: UniqueIdentifier) => void
  setActiveGroupId: (val: UniqueIdentifier) => void
}
export function ItemKanban(props: ItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      data: {
        type: 'item',
        item: {
          id: props.id,
          todo_id: props.todo_id,
          name: props.name,
        },
      },
    })

  const handleEdit = () => props.setActiveGroupId(props.todo_id)

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={[
        'p-4 rounded-[4px] border border-neutral-40 flex flex-col gap-2 w-full relative bg-white',
      ].join(' ')}
    >
      <div className='w-full h-10 absolute top-0 left-0' {...listeners}></div>
      <p className='text-neutral-90 text-sm font-bold leading-6'>
        {props.name}
      </p>
      <hr className='border-dashed border border-gray-40' />
      <div className='flex items-center gap-3 h-4 w-full'>
        <ProgressCount percentage={props.progress_percentage ?? 0} />
        <Settings
          id={props.id}
          todo_id={props.todo_id}
          toggleEdit={props.toggleEdit}
          setActiveId={props.setActiveId}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  )
}
