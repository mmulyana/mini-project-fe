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
import { getGroups } from '../../../services/group'
import { updateItem } from '../../../services/task'
import { useModal } from '../../../hooks/use-modal'
import AddItemModal from '../modal/add-item-modal'
import { useState } from 'react'

interface GroupI {
  id: UniqueIdentifier
  title: string
  description: string
}

type VariantColor = 1 | 2 | 3 | 4

export function Kanban() {
  const { show, toggle } = useModal()
  const [activeId, setActiveId] = useState<UniqueIdentifier>(0)
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
                toggle={toggle}
                setActiveId={setActiveId}
              />
            )
          })}
        </div>
      </DndContext>
      <AddItemModal isOpen={show} toggle={toggle} id={activeId} />
    </>
  )
}
