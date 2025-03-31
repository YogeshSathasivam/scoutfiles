export function BackgroundDecorator() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Top-right blob - adjusted for dark mode */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl opacity-70"
        style={{ transform: "rotate(-15deg)" }}
      />

      {/* Bottom-left blob - adjusted for dark mode */}
      <div
        className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl opacity-70"
        style={{ transform: "rotate(25deg)" }}
      />

      {/* Center small blob - adjusted for dark mode */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 dark:bg-blue-500/10 rounded-full blur-3xl opacity-60 animate-float" />

      {/* Additional dark mode accent blob */}
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-transparent dark:bg-indigo-500/10 rounded-full blur-3xl opacity-0 dark:opacity-60 animate-float"
        style={{ animationDelay: "2s" }}
      />

      {/* Pattern overlay - adjusted for dark mode */}
      <div className="absolute inset-0 bg-pattern opacity-5 dark:opacity-[0.07]"></div>
    </div>
  )
}

