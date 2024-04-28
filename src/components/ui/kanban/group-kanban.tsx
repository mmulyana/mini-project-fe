import IPlusCircle from '../../icon/i-plus-circle'
import Button from '../button'
import Label from '../label'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { useQuery } from 'react-query'
import { UniqueIdentifier } from '@dnd-kit/core'
import { ItemKanban } from './items-kanban'
import { getTask } from '../../../services/task'

export type GroupsProps = {
  id: UniqueIdentifier
  title: string
  description: string
  variant: 1 | 2 | 3 | 4
  toggle: () => void
  toggleEdit: () => void
  setActiveId: (val: UniqueIdentifier) => void
  setActiveGroupId: (val: UniqueIdentifier) => void
}

export type ItemProps = {
  id: number
  name: string
  done: null | boolean
  todo_id: number
  progress_percentage: number | null
}
export function GroupsKanban(props: GroupsProps) {
  const { data } = useQuery<ItemProps[]>(['items', props.id], {
    queryFn: () => getTask(props.id),
  })

  const { attributes, setNodeRef } = useSortable({
    id: props.id,
    data: {
      type: 'group',
      group: {
        id: props.id,
      },
    },
  })

  const groupVariant = {
    1: 'bg-[#F7FEFF] border-[#4DB5BC] text-[#01959F]',
    2: 'bg-[#FFFCF5] border-[#FEEABC] text-[#FA9810]',
    3: 'bg-[#FFFAFA] border-[#F5B1B7] text-[#E11428]',
    4: 'bg-[#F8FBF9] border-[#B8DBCA] text-[#43936C]',
  }
  return (
    <div
      {...attributes}
      ref={setNodeRef}
      className={[
        'p-4 rounded-[4px] border flex flex-col items-start gap-2 h-fit',
        groupVariant[props.variant],
      ].join(' ')}
    >
      <Label title={props.title} variant={props.variant} />
      <p className='text-neutral-90 text-xs font-bold leading-5'>
        {props.description}
      </p>
      <SortableContext items={data?.map((d) => d.id) ?? []}>
        {data?.map((d) => (
          <ItemKanban
            key={d.id}
            {...d}
            setActiveId={props.setActiveId}
            setActiveGroupId={props.setActiveGroupId}
            toggleEdit={props.toggleEdit}
          />
        ))}
      </SortableContext>
      <Button
        text='New Task'
        variant='link'
        color='secondary'
        className='!p-0 !shadow-none'
        prepend={<IPlusCircle />}
        type='submit'
        onClick={() => {
          props.setActiveId(props.id)
          props.toggle()
        }}
      />
    </div>
  )
}
