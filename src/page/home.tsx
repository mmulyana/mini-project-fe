import Header from '../components/ui/header'
import { Kanban } from '../components/ui/kanban'
import { useModal } from '../hooks/use-modal'

export default function Home() {
  const { toggle: toggleAddGroup } = useModal()

  return (
    <>
      <Header openModal={toggleAddGroup} />
      <section className='p-6 container mx-auto'>
        <Kanban />
      </section>
    </>
  )
}
