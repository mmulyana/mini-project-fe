import useClickOutside from '../../../hooks/use-click-outside'
import Textfield from '../input/textfield'
import Button from '../button'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useQueryClient } from 'react-query'
import IClose from '../../icon/i-close'
import { UniqueIdentifier } from '@dnd-kit/core'
import { createTask } from '../../../services/task'

type Props = {
  toggle: () => void
  isOpen: boolean
  id: UniqueIdentifier
}

export default function AddItemModal(props: Props) {
  const queryCache = useQueryClient()
  const [form, setForm] = useState({
    name: '',
    progress_percentage: 0,
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

    await createTask(form.name, form.progress_percentage, props.id)

    queryCache.invalidateQueries(['items', props.id])

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
          <div className='p-6 flex justify-between items-center'>
            <p className='text-neutral-100 text-lg font-bold leading-[18px] m-0'>
              Create Task
            </p>
            <Button
              className='!p-0 h-6 w-6 flex items-center justify-center !bg-transparent !shadow-none'
              onClick={props.toggle}
              prepend={<IClose />}
              text=''
            />
          </div>
          <div className='px-6 flex flex-col gap-5'>
            <Textfield
              label='Task Name'
              placeholder='type your task'
              onChange={handleChange}
              value={form.name}
              name='name'
            />
            <div className='w-1/2'>
              <Textfield
                label='Progress'
                placeholder='%'
                type='number'
                max={100}
                min={0}
                onChange={handleChange}
                value={form.progress_percentage}
                name='progress_percentage'
              />
            </div>
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
