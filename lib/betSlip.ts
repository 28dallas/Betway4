'use client'

import { create } from 'zustand'

export interface Bet {
  id: string
  match: string
  selection: string
  odds: number
  stake: number
  sport: string
  eventId: string
}

interface BetSlipStore {
  bets: Bet[]
  isOpen: boolean
  addBet: (bet: Omit<Bet, 'stake'>) => void
  removeBet: (id: string) => void
  updateStake: (id: string, stake: number) => void
  clearAll: () => void
  getTotalStake: () => number
  getTotalPayout: () => number
  toggleBetSlip: () => void
}

export const useBetSlip = create<BetSlipStore>((set, get) => ({
  bets: [],
  isOpen: false,
  
  addBet: (bet) => set((state) => {
    const exists = state.bets.find(b => b.id === bet.id)
    if (exists) return state
    
    return {
      bets: [...state.bets, { ...bet, stake: 0 }],
      isOpen: true
    }
  }),
  
  removeBet: (id) => set((state) => ({
    bets: state.bets.filter(bet => bet.id !== id)
  })),
  
  updateStake: (id, stake) => set((state) => ({
    bets: state.bets.map(bet => 
      bet.id === id ? { ...bet, stake } : bet
    )
  })),
  
  clearAll: () => set({ bets: [] }),
  
  getTotalStake: () => {
    const { bets } = get()
    return bets.reduce((total, bet) => total + bet.stake, 0)
  },
  
  getTotalPayout: () => {
    const { bets } = get()
    return bets.reduce((total, bet) => total + (bet.stake * bet.odds), 0)
  },
  
  toggleBetSlip: () => set((state) => ({ isOpen: !state.isOpen }))
}))