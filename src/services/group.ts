import { BASE_URL, TOKEN } from '.'

export async function createGroup(title: string, description: string) {
  const payload = {
    title,
    description,
  }
  return await fetch(BASE_URL + '/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(payload),
  })
}
