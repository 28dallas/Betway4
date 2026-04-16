'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { Search, ShoppingCart, RefreshCw, Wifi, WifiOff } from 'lucide-react'
import { useBetSlip } from '@/lib/betSlip'
import { useOdds } from '@/lib/oddsContext'
import { sportsData, type Match } from '@/lib/sportsData'
import type { NormalizedMatch } from '@/app/api/odds/route'

const POLL_INTERVAL = 60_000
const SPORT_CATEGORIES = ['All', 'Football', 'Basketball', 'Tennis', 'American Football', 'Baseball', 'Hockey']

function toMatch(m: NormalizedMatch): Match {
  return {
    id: m.id,
    sport: m.sport,
    league: m.league,
    homeTeam: m.homeTeam,
    awayTeam: m.awayTeam,
    startTime: m.startTime,
    status: m.status,
    odds: m.odds,
    markets: [
      {
        id: `${m.id}-1x2`,
        name: 'Match Result',
        type: '1X2',
        selections: [
          { id: `${m.id}-h`, name: m.homeTeam, odds: m.odds.home },
          ...(m.odds.draw ? [{ id: `${m.id}-d`, name: 'Draw', odds: m.odds.draw }] : []),
          { id: `${m.id}-a`, name: m.awayTeam, odds: m.odds.away },
        ],
      },
    ],
  }
}

export default function SportsPage() {
  const [selectedSport, setSelectedSport] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [matches, setMatches] = useState<Match[]>(sportsData)
  const [isLive, setIsLive] = useState(false) // true = data from real API
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [loading, setLoading] = useState(false)
  const { addBet, toggleBetSlip, bets } = useBetSlip()
  const { convert } = useOdds()

  const fetchMatches = useCallback(async (sport: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/odds?sport=${encodeURIComponent(sport)}`, { cache: 'no-store' })
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      if (data.matches && data.matches.length > 0) {
        setMatches(data.matches.map(toMatch))
        setIsLive(true)
        setLastUpdated(new Date())
      } else {
        // API key not set or no games — use static fallback
        const filtered = sport === 'All' ? sportsData : sportsData.filter(m => m.sport === sport)
        setMatches(filtered)
        setIsLive(false)
      }
    } catch {
      const filtered = sport === 'All' ? sportsData : sportsData.filter(m => m.sport === sport)
      setMatches(filtered)
      setIsLive(false)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial fetch + poll
  useEffect(() => {
    fetchMatches(selectedSport)
    const id = setInterval(() => fetchMatches(selectedSport), POLL_INTERVAL)
    return () => clearInterval(id)
  }, [selectedSport, fetchMatches])

  const handleAddBet = (match: Match, selection: string, odds: number) => {
    addBet({
      id: `${match.id}-${selection}`,
      match: `${match.homeTeam} vs ${match.awayTeam}`,
      selection,
      odds,
      sport: match.sport,
      eventId: match.id,
    })
  }

  const filtered = searchTerm.trim()
    ? matches.filter(m =>
        m.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.league.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : matches

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-1">Sports Betting</h1>
            <p className="text-gray-400">Find the best odds on all your favorite sports</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              {isLive ? (
                <><Wifi size={14} className="text-green-400" /><span className="text-green-400 text-xs font-medium">Live data</span></>
              ) : (
                <><WifiOff size={14} className="text-gray-500" /><span className="text-gray-500 text-xs">Demo data</span></>
              )}
              <button
                onClick={() => fetchMatches(selectedSport)}
                disabled={loading}
                className="p-1.5 rounded-md bg-dark-800 hover:bg-dark-700 text-gray-400 hover:text-white transition-colors"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
            {lastUpdated && (
              <span className="text-gray-600 text-xs">Updated {lastUpdated.toLocaleTimeString()}</span>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search teams, leagues, or matches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
          />
        </div>

        {/* Sport tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SPORT_CATEGORIES.map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                selectedSport === sport
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>

        {/* Floating betslip button */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={toggleBetSlip}
            className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg flex items-center space-x-2"
          >
            <ShoppingCart size={20} />
            {bets.length > 0 && (
              <span className="bg-accent-500 text-dark-900 text-xs font-bold px-2 py-1 rounded-full">
                {bets.length}
              </span>
            )}
          </button>
        </div>

        {/* Matches */}
        <div className="space-y-4">
          {loading && matches.length === 0 && (
            <div className="text-center py-16">
              <RefreshCw className="mx-auto mb-3 text-gray-500 animate-spin" size={28} />
              <p className="text-gray-400">Loading matches...</p>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No matches found{searchTerm ? ` for "${searchTerm}"` : ''}</p>
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="mt-4 text-primary-500 hover:text-primary-400 text-sm">
                  Clear search
                </button>
              )}
            </div>
          )}

          <AnimatePresence>
            {filtered.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.04, 0.4) }}
                className="card hover:border-primary-500/50 transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-primary-500 text-sm font-medium">{match.league}</span>
                    <p className="text-gray-400 text-xs">{match.startTime}</p>
                  </div>
                  {match.status === 'live' && (
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-red-500 text-sm font-medium">LIVE</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-5">
                  <span className="text-white font-medium text-base flex-1">{match.homeTeam}</span>
                  {match.homeScore !== undefined ? (
                    <span className="text-xl font-bold text-white px-4">
                      {match.homeScore} - {match.awayScore}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm px-4">vs</span>
                  )}
                  <span className="text-white font-medium text-base flex-1 text-right">{match.awayTeam}</span>
                </div>

                <div className={`grid ${match.odds.draw ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                  <button
                    onClick={() => handleAddBet(match, match.homeTeam, match.odds.home)}
                    className="odds-button text-center hover:bg-primary-600/20"
                  >
                    <div className="text-xs text-gray-400 mb-1">1</div>
                    <div className="font-semibold text-lg">{convert(match.odds.home)}</div>
                  </button>
                  {match.odds.draw && (
                    <button
                      onClick={() => handleAddBet(match, 'Draw', match.odds.draw!)}
                      className="odds-button text-center hover:bg-primary-600/20"
                    >
                      <div className="text-xs text-gray-400 mb-1">X</div>
                      <div className="font-semibold text-lg">{convert(match.odds.draw)}</div>
                    </button>
                  )}
                  <button
                    onClick={() => handleAddBet(match, match.awayTeam, match.odds.away)}
                    className="odds-button text-center hover:bg-primary-600/20"
                  >
                    <div className="text-xs text-gray-400 mb-1">2</div>
                    <div className="font-semibold text-lg">{convert(match.odds.away)}</div>
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-700">
                  <span className="text-gray-500 text-xs">{match.sport}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
