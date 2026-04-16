import Link from 'next/link'
import { ArrowRight, AlertCircle, CreditCard, ShieldCheck, User } from 'lucide-react'

const termsBlocks = [
  {
    title: 'Accounts and eligibility',
    text: 'Users should register with accurate information and meet the age, identity, and location conditions that apply to platform access.',
    icon: User,
  },
  {
    title: 'Bets and review',
    text: 'Placed bets depend on available balance, valid markets, and any internal review conditions connected to platform rules.',
    icon: ShieldCheck,
  },
  {
    title: 'Payments and withdrawals',
    text: 'Deposits and withdrawals may be limited by provider availability, verification requirements, or review procedures.',
    icon: CreditCard,
  },
  {
    title: 'General conduct',
    text: 'Misuse, abuse, or intentionally misleading account activity may lead to restricted access or additional review.',
    icon: AlertCircle,
  },
]

export default function TermsPage() {
  return (
    <div className="bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-800 bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.14),_transparent_24%),radial-gradient(circle_at_80%_10%,_rgba(239,68,68,0.12),_transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_48%,#111827_100%)]">
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300">
              Terms and Conditions
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
              The key rules behind accounts, bets, and payment actions.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Terms pages are most useful when they explain what affects eligibility, betting actions, payment review,
              and account behavior in plain language.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup" className="btn-primary">
                Create Account
              </Link>
              <Link
                href="/deposit"
                className="rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-100 transition-colors hover:border-slate-500 hover:text-white"
              >
                View Wallet Flow
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {termsBlocks.map((block) => {
            const Icon = block.icon

            return (
              <article key={block.title} className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
                <div className="mb-5 inline-flex rounded-2xl bg-slate-950 p-3 text-amber-300">
                  <Icon size={22} />
                </div>
                <h2 className="text-2xl font-semibold text-white">{block.title}</h2>
                <p className="mt-4 leading-8 text-slate-400">{block.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Important Theme</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Clarity reduces support issues later.</h2>
          <p className="mt-4 leading-8 text-slate-300">
            Eligibility rules, transaction review, and betting limitations should be visible early so they do not
            surprise users only after they have already taken action.
          </p>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">Practical Effect</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Terms should support product behavior, not just compliance.</h2>
          <p className="mt-4 leading-8 text-slate-300">
            When terms reflect real app behavior, they help users understand why a balance check, deposit review, or
            withdrawal approval step might exist.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Related Flow</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Review how deposits and withdrawals work.</h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-300">
              The wallet pages are where users are most likely to feel the practical effect of the platform rules.
            </p>
          </div>
          <Link href="/deposit" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200 lg:mt-0">
            Go to deposits
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
