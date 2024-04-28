import useClickOutside from '../../../hooks/use-click-outside'
import Textfield from '../input/textfield'
import Textarea from '../input/textarea'
import Button from '../button'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useQueryClient } from 'react-query'
import { createGroup } from '../../../services/group'

type Props = {
  toggle: () => void
  isOpen: boolean
}

export default function AddGroupModal(props: Props) {
  const queryCache = useQueryClient()
  const [form, setForm] = useState({
    title: '',
    description: '',
  })

  function handleChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const modalRef = useClickOutside({ callback: props.toggle })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    await createGroup(form.title, form.description)

    queryCache.invalidateQueries('groups')

    props.toggle()
  }

  if (!props.isOpen) return null

  return (
    <div className='fixed top-0 left-0 h-screen w-full'>
      <div className='bg-neutral-90/80 absolute top-0 left-0 w-full h-full'></div>
      <div
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-fit bg-white rounded-[10px]'
        ref={modalRef}
      >
        <form onSubmit={handleSubmit}>
          <div className='p-6'>
            <p className='text-neutral-100 text-lg font-bold leading-[18px] m-0'>
              Add New Group
            </p>
          </div>
          <div className='px-6 flex flex-col gap-5'>
            <Textfield
              label='Title'
              placeholder='placeholder'
              onChange={handleChange}
              value={form.title}
              name='title'
            />
            <Textarea
              label='description'
              name='description'
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className='mt-2 p-6 flex justify-end gap-[10px] items-center'>
            <Button
              text='Cancel'
              variant='outline'
              color='secondary'
              type='button'
              onClick={props.toggle}
            />
            <Button
              type='submit'
              text='Submit'
              variant='solid'
              color='primary'
            />
          </div>
        </form>
      </div>
    </div>
  )
}
