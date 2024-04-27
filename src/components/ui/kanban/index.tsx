import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useQuery, useQueryClient } from 'react-query'
import { GroupsKanban } from './group-kanban'

interface GroupI {
  id: UniqueIdentifier
  title: string
  description: string
}

type VariantColor = 1 | 2 | 3 | 4

const getGroups = async () => {
  const response = await fetch(
    'https://todo-api-18-140-52-65.rakamin.com/todos',
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

export const updateItem = async (
  item_id: UniqueIdentifier,
  todo_id: number,
  target_id: UniqueIdentifier
) => {
  const body = {
    target_todo_id: target_id,
  }
  return await fetch(
    `https://todo-api-18-140-52-65.rakamin.com/todos/${todo_id}/items/${item_id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1NTUsImV4cCI6MTcyMjg4NDk0Nn0.qbzETtVoPsE3SDY4yUMkgGyE4ED71B9fNsVy6n20rjQ`,
      },
      body: JSON.stringify(body),
    }
  )
}

export function Kanban() {
  const queryCache = useQueryClient()
  const { data } = useQuery<GroupI[]>({
    queryKey: ['groups'],
    queryFn: getGroups,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  async function handleDragEnd(event: DragEndEvent) {
    const itemid = event.active.data.current?.item.id
    const todoid = event.active.data.current?.item.todo_id
    const target_id = event.over?.data.current?.group.id

    await updateItem(itemid, todoid, target_id)

    queryCache.invalidateQueries(['items', todoid])
    queryCache.invalidateQueries(['items', target_id])
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative'>
          {data?.map((d, i) => {
            return (
              <GroupsKanban
                key={d.id}
                id={d.id}
                title={d.title}
                description={d.description}
                variant={i >= 4 ? 1 : ((i + 1) as VariantColor)}
              />
            )
          })}
        </div>
      </DndContext>
    </>
  )
}
