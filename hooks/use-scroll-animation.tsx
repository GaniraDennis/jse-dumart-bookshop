import * as React from "react"

type Options = {
  threshold?: number
  root?: Element | null
  rootMargin?: string
}

export function useScrollAnimation(options: Options = {}) {
  const ref = React.useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: options.threshold ?? 0.1,
        root: options.root ?? null,
        rootMargin: options.rootMargin ?? "0px",
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.threshold, options.root, options.rootMargin])

  return { ref, isVisible }
}
