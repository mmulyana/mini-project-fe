import IPlusCircle from '../../icon/i-plus-circle'
import Button from '../button'
import Label from '../label'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { useQuery } from 'react-query'
import { UniqueIdentifier } from '@dnd-kit/core'
import { ItemKanban } from './items-kanban'

const getGroup = async (id: UniqueIdentifier) => {
  const response = await fetch(
    `https://todo-api-18-140-52-65.rakamin.com/todos/${id}/items`,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1NTUsImV4cCI6MTcyMjg4NDk0Nn0.qbzETtVoPsE3SDY4yUMkgGyE4ED71B9fNsVy6n20rjQ`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await response.json()
  return data
}

export type GroupsProps = {
  id: UniqueIdentifier
  title: string
  description: string
  variant: 1 | 2 | 3 | 4
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
    queryFn: () => getGroup(props.id),
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
          <ItemKanban key={d.id} {...d} />
        ))}
      </SortableContext>
      <Button
        text='New Task'
        variant='link'
        color='secondary'
        className='!p-0 !shadow-none'
        prepend={<IPlusCircle />}
        type='submit'
        onClick={() => alert('tes')}
      />
    </div>
  )
}
