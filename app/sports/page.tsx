'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, Filter, Clock, Users, ShoppingCart } from 'lucide-react'
import { getSportMatches } from '@/lib/sportsData'
import { useBetSlip } from '@/lib/betSlip'

export default function SportsPage() {
  const [selectedSport, setSelectedSport] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const { addBet, toggleBetSlip, bets } = useBetSlip()

  const sportCategories = ['All', 'Football', 'Basketball', 'Tennis', 'Baseball', 'Hockey']
  const matches = getSportMatches(selectedSport)

  const handleAddBet = (match: any, selection: string, odds: number) => {
    addBet({
      id: `${match.id}-${selection}`,
      match: `${match.homeTeam} vs ${match.awayTeam}`,
      selection,
      odds,
      sport: match.sport,
      eventId: match.id
    })
  }

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">Sports Betting</h1>
          <p className="text-gray-400 text-lg">Find the best odds on all your favorite sports</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search teams, leagues, or matches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Sport Categories */}
          <div className="flex flex-wrap gap-2">
            {sportCategories.map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedSport === sport
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bet Slip Toggle */}
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
        <div className="space-y-6">
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-primary-500 text-sm font-medium">{match.league}</span>
                  <p className="text-gray-400 text-xs">{match.startTime}</p>
                </div>
                {match.status === 'live' && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-500 text-sm font-medium">LIVE</span>
                  </div>
                )}
              </div>

              <div className="text-center mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium text-lg">{match.homeTeam}</span>
                  {match.homeScore !== undefined ? (
                    <div className="text-2xl font-bold text-white">
                      {match.homeScore} - {match.awayScore}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">vs</span>
                  )}
                  <span className="text-white font-medium text-lg">{match.awayTeam}</span>
                </div>
              </div>

              <div className={`grid ${match.odds.draw ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                <button 
                  onClick={() => handleAddBet(match, match.homeTeam, match.odds.home)}
                  className="odds-button text-center hover:bg-primary-600/20"
                >
                  <div className="text-xs text-gray-400 mb-1">Home</div>
                  <div className="font-semibold text-lg">{match.odds.home}</div>
                </button>
                
                {match.odds.draw && (
                  <button 
                    onClick={() => handleAddBet(match, 'Draw', match.odds.draw!)}
                    className="odds-button text-center hover:bg-primary-600/20"
                  >
                    <div className="text-xs text-gray-400 mb-1">Draw</div>
                    <div className="font-semibold text-lg">{match.odds.draw}</div>
                  </button>
                )}
                
                <button 
                  onClick={() => handleAddBet(match, match.awayTeam, match.odds.away)}
                  className="odds-button text-center hover:bg-primary-600/20"
                >
                  <div className="text-xs text-gray-400 mb-1">Away</div>
                  <div className="font-semibold text-lg">{match.odds.away}</div>
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <button className="w-full text-primary-500 hover:text-primary-400 text-sm font-medium transition-colors">
                  +{match.markets.length - 1} More Markets
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
