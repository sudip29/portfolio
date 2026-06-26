import { useEffect, useRef, useState } from 'react'

interface Options extends IntersectionObserverInit {
  /** Fire only once (default: true) */
  once?: boolean
}

export function useIntersection<T extends Element>(
  options: Options = {},
): [React.RefObject<T | null>, boolean] {
  const { once = true, threshold = 0.2, rootMargin = '0px', root } = options
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin, root },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, threshold, rootMargin, root])

  return [ref, visible]
}
