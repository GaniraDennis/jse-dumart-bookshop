import Image from "next/image"

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-white via-white to-[var(--navy)]/5"
      aria-label="Loading page"
      role="status"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="animate-bounce-in">
          <div className="relative">
            <Image
              src="/images/Book Store Shop Logo (1).png"
              alt="JSEdumart Logo"
              width={200}
              height={200}
              priority
              className="object-contain drop-shadow-2xl"
            />
            <div className="absolute inset-0 animate-pulse rounded-full blur-2xl bg-[var(--teal)]/20"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-[var(--navy)] [animation-delay:0ms]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-[var(--teal)] [animation-delay:150ms]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-[var(--yellow)] [animation-delay:300ms]" />
        </div>
      </div>
      <span className="sr-only">Page is loading</span>
    </div>
  )
}
