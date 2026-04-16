import Link from 'next/link'
import { ArrowRight, Lock, Shield, Database, Eye } from 'lucide-react'

const privacyItems = [
  {
    title: 'Account details',
    body: 'Basic registration information supports login, profile access, and wallet-linked account actions.',
    icon: Lock,
  },
  {
    title: 'Transaction records',
    body: 'Deposits, withdrawals, and balance activity may be stored so account history stays visible and traceable.',
    icon: Database,
  },
  {
    title: 'Usage protection',
    body: 'Some activity data can help detect abuse, resolve issues, and improve reliability across the product.',
    icon: Shield,
  },
  {
    title: 'Clear visibility',
    body: 'Privacy pages should explain data use in plain language instead of vague, legal-heavy filler.',
    icon: Eye,
  },
]

export default function PrivacyPage() {
  return (
    <div className="bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-800 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_25%),radial-gradient(circle_at_80%_15%,_rgba(34,197,94,0.12),_transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_48%,#111827_100%)]">
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-300">
              Privacy Policy
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
              Clearer privacy guidance for account, wallet, and betting activity.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              This page explains the kinds of information the platform may use to support authentication, payments,
              history, security, and the overall reliability of the user experience.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {privacyItems.map((item) => {
            const Icon = item.icon

            return (
              <article key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
                <div className="mb-5 inline-flex rounded-2xl bg-slate-950 p-3 text-sky-300">
                  <Icon size={22} />
                </div>
                <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                <p className="mt-3 leading-7 text-slate-400">{item.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">What May Be Stored</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Profile, balance, transactions, and usage context</h2>
          <p className="mt-4 leading-8 text-slate-300">
            The platform may process account details, transaction records, wallet state, and betting-related activity
            so users can sign in, review actions, and manage their profile with continuity.
          </p>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Why It Matters</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Users should understand the reason behind the data.</h2>
          <p className="mt-4 leading-8 text-slate-300">
            Privacy pages are more useful when they connect each data type to a concrete product need like account
            access, support, compliance review, or transaction visibility.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">Related Page</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Review your account details directly.</h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-300">
              The profile page is the most direct place to connect privacy expectations to the actual account data a
              user sees in the app.
            </p>
          </div>
          <Link href="/profile" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200 lg:mt-0">
            Open profile
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
