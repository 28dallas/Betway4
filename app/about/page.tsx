import Link from 'next/link'
import { ArrowRight, ShieldCheck, Smartphone, Wallet, Zap } from 'lucide-react'

const pillars = [
  {
    title: 'Fast navigation',
    description: 'The product is organized to help users move from browsing matches to placing bets without getting lost in the interface.',
    icon: Zap,
  },
  {
    title: 'Wallet clarity',
    description: 'Deposits, withdrawals, account balance, and transaction history are surfaced as core product flows rather than buried utilities.',
    icon: Wallet,
  },
  {
    title: 'Mobile-first feel',
    description: 'Layouts are meant to stay usable on smaller screens where many betting users actually spend their time.',
    icon: Smartphone,
  },
  {
    title: 'Trust cues',
    description: 'Responsible gaming reminders, clear actions, and simpler page structure all help the platform feel more credible.',
    icon: ShieldCheck,
  },
]

export default function AboutPage() {
  return (
    <div className="bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-800 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.14),_transparent_26%),radial-gradient(circle_at_85%_15%,_rgba(250,204,21,0.14),_transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_45%,#111827_100%)]">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              About SportsBet Pro
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Built to make sports betting feel cleaner, faster, and easier to trust.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              SportsBet Pro is structured around quick sportsbook browsing, clear account actions, and simpler wallet
              flows so users can move through the product without friction.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/sports" className="btn-primary">
                Explore Sports
              </Link>
              <Link
                href="/signup"
                className="rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-100 transition-colors hover:border-slate-500 hover:text-white"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon

            return (
              <article key={pillar.title} className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
                <div className="mb-5 inline-flex rounded-2xl bg-slate-950 p-3 text-emerald-300">
                  <Icon size={22} />
                </div>
                <h2 className="text-xl font-semibold text-white">{pillar.title}</h2>
                <p className="mt-3 leading-7 text-slate-400">{pillar.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">What We Prioritize</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Speed from browsing to betting</h2>
          <p className="mt-4 leading-8 text-slate-300">
            The best sportsbook experiences reduce hesitation. That means readable match cards, obvious next steps,
            and fewer dead-end pages across the account journey.
          </p>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">How It Is Evolving</p>
          <h2 className="mt-3 text-3xl font-bold text-white">More complete support pages and product routes</h2>
          <p className="mt-4 leading-8 text-slate-300">
            The app is moving away from thin placeholders toward pages that actually support user decisions, whether
            they land in casino, promotions, privacy, or support flows.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Next Step</p>
            <h2 className="mt-3 text-3xl font-bold text-white">See the product where it matters most.</h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-300">
              The real value of the platform shows up in live odds, sports browsing, wallet flows, and account actions.
            </p>
          </div>
          <Link href="/sports" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200 lg:mt-0">
            Go to sportsbook
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
