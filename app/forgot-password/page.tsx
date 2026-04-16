'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, KeyRound, Mail, ShieldCheck } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-800 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.14),_transparent_24%),radial-gradient(circle_at_80%_15%,_rgba(34,197,94,0.12),_transparent_28%),linear-gradient(135deg,#020617_0%,#0f172a_50%,#111827_100%)]">
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300">
                Account Recovery
              </div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
                Password recovery should still feel intentional, even in a demo app.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                This page now gives users a proper recovery entry point. It does not send real reset emails yet, but
                it no longer feels like a dead end.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-black/20">
              <div className="mb-6 inline-flex rounded-2xl bg-slate-950 p-3 text-indigo-300">
                <KeyRound size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-white">Reset request</h2>
              <p className="mt-3 text-slate-400">
                Enter an email below to simulate the recovery step. The app will show the next instruction state.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Email address</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-indigo-500">
                  Continue
                </button>
              </form>

              {submitted && (
                <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                  A real reset email is not connected yet, but the next step would normally send a secure recovery link
                  to <span className="font-semibold text-white">{email}</span>.
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Link href="/login" className="font-semibold text-indigo-300 hover:text-indigo-200">
                  Back to login
                </Link>
                <Link href="/signup" className="font-semibold text-slate-300 hover:text-white">
                  Create new account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
            <div className="mb-5 inline-flex rounded-2xl bg-slate-950 p-3 text-indigo-300">
              <Mail size={22} />
            </div>
            <h2 className="text-xl font-semibold text-white">Recovery email</h2>
            <p className="mt-3 leading-7 text-slate-400">
              In a full implementation, users would receive a time-limited link after submitting their account email.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
            <div className="mb-5 inline-flex rounded-2xl bg-slate-950 p-3 text-emerald-300">
              <ShieldCheck size={22} />
            </div>
            <h2 className="text-xl font-semibold text-white">Safer reset flow</h2>
            <p className="mt-3 leading-7 text-slate-400">
              Real recovery needs token validation, expiry handling, and a secure password confirmation step.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
            <div className="mb-5 inline-flex rounded-2xl bg-slate-950 p-3 text-amber-300">
              <KeyRound size={22} />
            </div>
            <h2 className="text-xl font-semibold text-white">Current limitation</h2>
            <p className="mt-3 leading-7 text-slate-400">
              This demo page provides the right structure now, but it still needs backend recovery logic to become fully functional.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">Quick Exit</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Return to access or create a fresh account.</h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-300">
              Until recovery emails are implemented, the cleanest paths are returning to login or creating a new test account.
            </p>
          </div>
          <Link href="/login" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200 lg:mt-0">
            Go to login
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
