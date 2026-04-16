import Link from 'next/link'

interface InfoPageProps {
  badge: string
  title: string
  intro: string
  highlights: string[]
  sections: Array<{
    title: string
      description: string
    }>
  ctaHref?: string
  ctaLabel?: string
  primaryHref?: string
  primaryLabel?: string
}

export default function InfoPage({
  badge,
  title,
  intro,
  highlights,
  sections,
  ctaHref = '/sports',
  ctaLabel = 'Explore Sports',
}: InfoPageProps) {
  return (
    <div className="bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.18),_transparent_32%),radial-gradient(circle_at_left,_rgba(234,179,8,0.12),_transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-300">
              {badge}
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl">{title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">{intro}</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={ctaHref} className="btn-primary">
              {ctaLabel}
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
            >
              Back Home
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-slate-100 shadow-lg shadow-slate-950/20">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg shadow-slate-950/20">
              <h2 className="mb-4 text-2xl font-semibold text-white">{section.title}</h2>
              <p className="leading-7 text-slate-300">{section.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
