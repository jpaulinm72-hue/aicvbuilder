export default function AuthCard({ title, subtitle, children }) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-md animate-fade-in rounded-3xl border border-border bg-background p-10 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  )
}
