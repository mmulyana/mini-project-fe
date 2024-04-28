import Header from '../components/ui/header'
import { Kanban } from '../components/ui/kanban'
import AddGroupModal from '../components/ui/modal/add-group-modal'
import { useModal } from '../hooks/use-modal'

export default function Home() {
  const { show, toggle } = useModal()

  return (
    <>
      <Header openModal={toggle} />
      <section className='p-6 container mx-auto'>
        <Kanban />
      </section>
      <AddGroupModal isOpen={show} toggle={toggle} />
    </>
  )
}
