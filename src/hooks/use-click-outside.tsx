import { useRef, useEffect } from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (param?: any) => any
}

const useClickOutside = ({ callback }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [callback])

  return ref
}

export default useClickOutside
