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

export async function getGroups() {
  const response = await fetch(BASE_URL + '/todos', {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await response.json()
  return data
}
