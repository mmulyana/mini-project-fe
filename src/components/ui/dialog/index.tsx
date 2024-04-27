type Props = {
  children: React.ReactNode
  className?: string
  isOpen: boolean
}
export default function Dialog(props: Props) {
  if (!props.isOpen) return null
  
  return <div className={props.className}>{props.children}</div>
}
