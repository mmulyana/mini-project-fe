import { UniqueIdentifier } from '@dnd-kit/core'
import { BASE_URL, TOKEN } from '.'

export async function updateItem(
  item_id: UniqueIdentifier,
  todo_id: number,
  target_id: UniqueIdentifier
) {
  const body = {
    target_todo_id: target_id,
  }
  return await fetch(`${BASE_URL}/todos/${todo_id}/items/${item_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(body),
  })
}

export async function createTask(
  name: string,
  progress_percentage: number,
  id: UniqueIdentifier
) {
  return await fetch(`${BASE_URL}/todos/${id}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      name,
      progress_percentage,
    }),
  })
}
