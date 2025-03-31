export function ModernLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        <div
          className="absolute top-2 left-2 w-12 h-12 rounded-full border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent animate-spin"
          style={{ animationDuration: "1.5s" }}
        ></div>
        <div
          className="absolute top-4 left-4 w-8 h-8 rounded-full border-4 border-t-transparent border-r-transparent border-b-primary border-l-transparent animate-spin"
          style={{ animationDuration: "2s" }}
        ></div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground animate-pulse-slow">{text}</p>
    </div>
  )
}

