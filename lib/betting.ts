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

const readStoredBets = (): PlacedBet[] => {
  if (typeof window === 'undefined') {
    return []
  }

  const storedBets = window.localStorage.getItem('userBets')
  return storedBets ? JSON.parse(storedBets) : []
}

export const useBetting = create<BettingStore>((set, get) => ({
  userBets: readStoredBets(),

  placeBet: async (betData) => {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('User not authenticated')
    
    if (user.balance < betData.stake) {
      throw new Error('Insufficient balance')
    }

    const bet: PlacedBet = {
      ...betData,
      id: Date.now().toString(),
      userId: user.id,
      status: 'pending',
      placedAt: new Date().toISOString()
    }

    // Update user balance
    const updatedUser = { ...user, balance: user.balance - betData.stake }
    window.localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    
    // Update users array
    const users = JSON.parse(window.localStorage.getItem('users') || '[]')
    const updatedUsers = users.map((u: any) => u.id === user.id ? updatedUser : u)
    window.localStorage.setItem('users', JSON.stringify(updatedUsers))

    set((state) => {
      const newBets = [...state.userBets, bet]
      window.localStorage.setItem('userBets', JSON.stringify(newBets))
      return { userBets: newBets }
    })

    return bet
  },

  getUserBets: (userId) => {
    const { userBets } = get()
    return userBets.filter(bet => bet.userId === userId)
  },

  getActiveBets: (userId) => {
    const { userBets } = get()
    return userBets.filter(bet => bet.userId === userId && bet.status === 'pending')
  },

  getBetHistory: (userId) => {
    const { userBets } = get()
    return userBets.filter(bet => bet.userId === userId && bet.status !== 'pending')
  },

  settleBet: (betId, result) => {
    set((state) => {
      const updatedBets = state.userBets.map(bet => {
        if (bet.id === betId) {
          const settledBet = {
            ...bet,
            status: result,
            settledAt: new Date().toISOString()
          }

          // Update user balance if won
          if (result === 'won') {
            const user = authService.getCurrentUser()
            if (user) {
              const updatedUser = { ...user, balance: user.balance + bet.potentialWin }
              window.localStorage.setItem('currentUser', JSON.stringify(updatedUser))
              
              const users = JSON.parse(window.localStorage.getItem('users') || '[]')
              const updatedUsers = users.map((u: any) => u.id === user.id ? updatedUser : u)
              window.localStorage.setItem('users', JSON.stringify(updatedUsers))
            }
          }

          return settledBet
        }
        return bet
      })
      
      window.localStorage.setItem('userBets', JSON.stringify(updatedBets))
      return { userBets: updatedBets }
    })
  }
}))
