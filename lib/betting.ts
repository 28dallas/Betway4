'use client'

import { create } from 'zustand'
import { authService } from './auth'

export interface PlacedBet {
  id: string
  userId: string
  eventId: string
  selection: string
  odds: number
  stake: number
  potentialWin: number
  status: 'pending' | 'won' | 'lost' | 'void'
  placedAt: string
  settledAt?: string
  match: string
  sport: string
}

interface BettingStore {
  userBets: PlacedBet[]
  placeBet: (bet: Omit<PlacedBet, 'id' | 'userId' | 'placedAt' | 'status'>) => Promise<PlacedBet>
  getUserBets: (userId: string) => PlacedBet[]
  getActiveBets: (userId: string) => PlacedBet[]
  getBetHistory: (userId: string) => PlacedBet[]
  settleBet: (betId: string, result: 'won' | 'lost' | 'void') => void
}

export const useBetting = create<BettingStore>((set, get) => ({
  userBets: [],

  placeBet: async (betData) => {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('Please login to place bets')

    const token = authService.getToken()
    const res = await fetch('/api/bets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(betData),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Failed to place bet')

    const bet: PlacedBet = data.bet

    // Refresh balance from DB
    await authService.refreshUser()

    set((state) => ({ userBets: [...state.userBets, bet] }))
    return bet
  },

  getUserBets: (userId) => get().userBets.filter((b) => b.userId === userId),
  getActiveBets: (userId) => get().userBets.filter((b) => b.userId === userId && b.status === 'pending'),
  getBetHistory: (userId) => get().userBets.filter((b) => b.userId === userId && b.status !== 'pending'),

  settleBet: (betId, result) => {
    set((state) => ({
      userBets: state.userBets.map((bet) =>
        bet.id === betId ? { ...bet, status: result, settledAt: new Date().toISOString() } : bet
      ),
    }))
  },
}))
