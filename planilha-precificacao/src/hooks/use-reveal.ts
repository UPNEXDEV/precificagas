import { useEffect, useRef } from "react"

/** Adds `is-visible` to the element once it enters the viewport. */
export function useReveal<T extends HTMLElement>(options: IntersectionObserverInit = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible")
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible")
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08, ...options },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
