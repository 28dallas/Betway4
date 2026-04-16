'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BadgePercent,
  CircleDollarSign,
  Flame,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  Wallet,
} from 'lucide-react'
import { authService, type User } from '@/lib/auth'

type Category = 'Popular' | 'Live Casino' | 'Slots' | 'Jackpots' | 'New Games' | 'Instant Win'

interface CasinoGame {
  name: string
  type: string
  category: Category
  provider: string
  tag: string
  accent: string
  rtp: string
  players: string
  jackpot?: string
  description: string
}

const categories: Category[] = ['Popular', 'Live Casino', 'Slots', 'Jackpots', 'New Games', 'Instant Win']

const featuredGames: CasinoGame[] = [
  {
    name: 'Emerald Fortune',
    type: 'Slot',
    category: 'Slots',
    provider: 'Pragmatic Play',
    tag: 'Hot',
    accent: 'from-emerald-500/30 to-lime-400/10',
    rtp: '96.4%',
    players: '2.3k playing',
    jackpot: '$18,400',
    description: 'Fast bonus rounds, sticky wilds, and a high-visibility slot card for the hero collection.',
  },
  {
    name: 'Neon Roulette',
    type: 'Live Table',
    category: 'Live Casino',
    provider: 'Evolution',
    tag: 'Live',
    accent: 'from-cyan-500/30 to-sky-400/10',
    rtp: '97.3%',
    players: '1.2k playing',
    description: 'A strong live casino anchor with clear table limits, live status, and dealer-led pacing.',
  },
  {
    name: 'Blackjack Royale',
    type: 'Table',
    category: 'Popular',
    provider: 'NetEnt',
    tag: 'Top Rated',
    accent: 'from-amber-500/30 to-orange-400/10',
    rtp: '99.2%',
    players: '680 playing',
    description: 'Good for pushing high-intent users into a premium table experience with clear rules.',
  },
  {
    name: 'Mega Crash',
    type: 'Instant Win',
    category: 'Instant Win',
    provider: 'Spribe',
    tag: 'Trending',
    accent: 'from-rose-500/30 to-fuchsia-400/10',
    rtp: '96.1%',
    players: '4.8k playing',
    description: 'A fast session game that adds urgency and variety to the page beyond traditional tables.',
  },
  {
    name: 'Golden Baccarat',
    type: 'Live Table',
    category: 'Jackpots',
    provider: 'Evolution',
    tag: 'VIP',
    accent: 'from-yellow-500/30 to-amber-300/10',
    rtp: '98.7%',
    players: '124 playing',
    jackpot: '$52,900',
    description: 'Adds a premium high-limit lane with a bigger reward signal for the more serious audience.',
  },
  {
    name: 'Night Spin Deluxe',
    type: 'Slot',
    category: 'New Games',
    provider: 'Play’n GO',
    tag: 'New',
    accent: 'from-violet-500/30 to-indigo-400/10',
    rtp: '95.9%',
    players: '940 playing',
    description: 'Useful for a new releases row that keeps the casino page from feeling static.',
  },
]

const liveTables = [
  { name: 'Lightning Roulette', players: '1.2k playing', limit: '$1 - $500', badge: 'Live now' },
  { name: 'Speed Blackjack', players: '860 playing', limit: '$5 - $1,000', badge: 'Fast table' },
  { name: 'Salon Privé Baccarat', players: '124 playing', limit: '$25 - $5,000', badge: 'High limit' },
]

const providers = ['Evolution', 'Pragmatic Play', 'NetEnt', 'Play’n GO', 'Red Tiger', 'Spribe']

const trustPoints = [
  {
    title: 'Fast wallet flow',
    description: 'Move between sportsbook and casino balance actions without losing the same account context.',
    icon: Wallet,
  },
  {
    title: 'Bonus-ready structure',
    description: 'The layout supports welcome offers, cashback, reloads, and time-based drops without feeling cluttered.',
    icon: BadgePercent,
  },
  {
    title: 'Safer play reminders',
    description: 'Clear responsible gaming cues make the page feel more complete and more trustworthy.',
    icon: ShieldCheck,
  },
]

export default function CasinoPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [activeCategory, setActiveCategory] = useState<Category>('Popular')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setUser(authService.getCurrentUser())
  }, [])

  const visibleGames = featuredGames.filter((game) => {
    const matchesCategory =
      activeCategory === 'Popular'
        ? true
        : game.category === activeCategory || (activeCategory === 'Jackpots' && Boolean(game.jackpot))

    const normalizedSearch = searchTerm.trim().toLowerCase()
    const matchesSearch =
      normalizedSearch.length === 0 ||
      game.name.toLowerCase().includes(normalizedSearch) ||
      game.provider.toLowerCase().includes(normalizedSearch) ||
      game.type.toLowerCase().includes(normalizedSearch)

    return matchesCategory && matchesSearch
  })

  const featuredPromoGame = visibleGames[0] || featuredGames[0]

  const handlePrimaryAction = () => {
    router.push(user ? '/deposit' : '/signup')
  }

  const handlePlay = (game: CasinoGame) => {
    const target = user ? `/deposit?game=${encodeURIComponent(game.name)}` : '/login'
    router.push(target)
  }

  return (
    <div className="bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-800 bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.14),_transparent_24%),radial-gradient(circle_at_85%_20%,_rgba(34,197,94,0.12),_transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_45%,#111827_100%)]">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-200">
                <Sparkles size={16} />
                Casino Lounge
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Real categories, real CTAs, and a casino page that actually behaves like a product.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Browse by category, search for games, highlight live tables, and push users into the right next step
                whether that is signing up, depositing, or exploring the lobby.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={handlePrimaryAction} className="btn-primary">
                  {user ? 'Deposit to Play' : 'Claim Welcome Bonus'}
                </button>
                <Link
                  href="/responsible-gaming"
                  className="rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-100 transition-colors hover:border-slate-500 hover:text-white"
                >
                  Responsible Gaming
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <CircleDollarSign size={18} />
                    <span className="text-sm font-semibold">Welcome Offer</span>
                  </div>
                  <p className="mt-3 text-2xl font-bold text-white">100% up to $200</p>
                  <p className="mt-2 text-sm text-slate-400">Give players a clear bonus and a fast route into the lobby.</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                  <div className="flex items-center gap-2 text-amber-300">
                    <Flame size={18} />
                    <span className="text-sm font-semibold">Trending Now</span>
                  </div>
                  <p className="mt-3 text-2xl font-bold text-white">{visibleGames.length} featured picks</p>
                  <p className="mt-2 text-sm text-slate-400">The grid below now updates with the selected category and search.</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Timer size={18} />
                    <span className="text-sm font-semibold">Quick Cashouts</span>
                  </div>
                  <p className="mt-3 text-2xl font-bold text-white">Wallet-first flow</p>
                  <p className="mt-2 text-sm text-slate-400">Keep the casino tied to deposit and account actions users already understand.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30">
              <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/10 via-slate-900 to-emerald-500/10 p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                    Featured Promo
                  </span>
                  <span className="text-sm text-slate-400">{activeCategory}</span>
                </div>

                <h2 className="mt-6 text-3xl font-bold text-white">{featuredPromoGame.name}</h2>
                <p className="mt-3 text-slate-300">{featuredPromoGame.description}</p>

                <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Provider</span>
                    <span className="font-semibold text-amber-300">{featuredPromoGame.provider}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
                    <span>RTP</span>
                    <span className="font-semibold text-white">{featuredPromoGame.rtp}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
                    <span>Players</span>
                    <span className="font-semibold text-white">{featuredPromoGame.players}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-700/80 px-4 py-3">
                  <div>
                    <p className="text-sm text-slate-400">Popular pick</p>
                    <p className="font-semibold text-white">{featuredPromoGame.type}</p>
                  </div>
                  <button
                    onClick={() => handlePlay(featuredPromoGame)}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
                  >
                    {user ? 'Play from Wallet' : 'Unlock Access'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                    : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:max-w-xs">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search game or provider"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-emerald-500"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Featured Games</p>
            <h2 className="mt-3 text-3xl font-bold text-white">A working grid instead of a static mockup</h2>
          </div>
          <p className="text-sm text-slate-400">
            Showing <span className="font-semibold text-white">{visibleGames.length}</span> game{visibleGames.length === 1 ? '' : 's'}
          </p>
        </div>

        {visibleGames.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleGames.map((game) => (
              <article key={game.name} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/20">
                <div className={`h-40 bg-gradient-to-br ${game.accent} p-6`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                        {game.type}
                      </span>
                      <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                        {game.provider}
                      </span>
                    </div>
                    <span className="rounded-full bg-slate-950/60 px-3 py-1 text-xs font-semibold text-amber-200">
                      {game.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{game.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{game.players}</p>
                    </div>
                    {game.jackpot && (
                      <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">
                        Jackpot {game.jackpot}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 min-h-[84px] text-slate-400">{game.description}</p>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-slate-400">
                      RTP: <span className="font-semibold text-white">{game.rtp}</span>
                    </span>
                    <div className="flex items-center gap-1 text-amber-300">
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} className="text-slate-600" />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handlePlay(game)}
                      className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
                    >
                      {user ? 'Play Now' : 'Login to Play'}
                    </button>
                    <button
                      onClick={() => setActiveCategory(game.category)}
                      className="text-sm font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
                    >
                      More {game.category}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
            <h3 className="text-2xl font-semibold text-white">No games match that search yet</h3>
            <p className="mt-3 text-slate-400">Try another keyword or switch back to a broader category.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setActiveCategory('Popular')
              }}
              className="mt-6 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Live Casino</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Tables that make the page feel active</h2>
            <div className="mt-8 space-y-4">
              {liveTables.map((table) => (
                <div key={table.name} className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.8)]" />
                      <h3 className="text-lg font-semibold text-white">{table.name}</h3>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{table.players}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-400">
                      Limits:
                      <span className="ml-2 font-semibold text-white">{table.limit}</span>
                    </div>
                    <button
                      onClick={() => setActiveCategory('Live Casino')}
                      className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200"
                    >
                      {table.badge}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Trusted Providers</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Studios users expect to see</h2>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {providers.map((provider) => (
                <button
                  key={provider}
                  onClick={() => setSearchTerm(provider)}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-5 text-center font-semibold text-slate-200 transition-colors hover:border-emerald-500/40 hover:text-white"
                >
                  {provider}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Suggested extra block</p>
              <p className="mt-3 leading-7 text-slate-200">
                Provider tiles now do something useful too: clicking one filters the grid by that studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {trustPoints.map((item) => {
            const Icon = item.icon

            return (
              <article key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
                <div className="mb-5 inline-flex rounded-2xl bg-slate-950 p-3 text-emerald-300">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{item.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Responsible Gaming</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Casino pages should still show clear safety cues.</h2>
              <p className="mt-4 max-w-2xl leading-8 text-slate-300">
                Keep deposit limits, time-outs, self-exclusion, and support information easy to find. A polished page
                should still stay grounded and responsible.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
              <ul className="space-y-4 text-slate-300">
                <li>Set deposit and session limits directly from the account area.</li>
                <li>Show a visible link to support or responsible gaming resources.</li>
                <li>Use bonus language that is clear, not misleading, and easy to verify.</li>
              </ul>
              <Link href="/responsible-gaming" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200">
                Review responsible gaming page
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
