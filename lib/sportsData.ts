export interface Match {
  id: string
  sport: string
  league: string
  homeTeam: string
  awayTeam: string
  startTime: string
  status: 'upcoming' | 'live' | 'finished'
  homeScore?: number
  awayScore?: number
  odds: {
    home: number
    draw?: number
    away: number
  }
  markets: Market[]
}

export interface Market {
  id: string
  name: string
  type: string
  selections: Selection[]
}

export interface Selection {
  id: string
  name: string
  odds: number
}

export const sportsData: Match[] = [
  {
    id: '1',
    sport: 'Football',
    league: 'Premier League',
    homeTeam: 'Manchester United',
    awayTeam: 'Arsenal',
    startTime: '16:30',
    status: 'upcoming',
    odds: { home: 2.45, draw: 3.20, away: 2.90 },
    markets: [
      {
        id: 'm1',
        name: 'Match Result',
        type: '1X2',
        selections: [
          { id: 's1', name: 'Manchester United', odds: 2.45 },
          { id: 's2', name: 'Draw', odds: 3.20 },
          { id: 's3', name: 'Arsenal', odds: 2.90 }
        ]
      },
      {
        id: 'm2',
        name: 'Total Goals',
        type: 'over_under',
        selections: [
          { id: 's4', name: 'Over 2.5', odds: 1.85 },
          { id: 's5', name: 'Under 2.5', odds: 1.95 }
        ]
      }
    ]
  },
  {
    id: '2',
    sport: 'Basketball',
    league: 'NBA',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    startTime: '20:00',
    status: 'live',
    homeScore: 89,
    awayScore: 92,
    odds: { home: 2.10, away: 1.75 },
    markets: [
      {
        id: 'm3',
        name: 'Match Winner',
        type: 'moneyline',
        selections: [
          { id: 's6', name: 'Lakers', odds: 2.10 },
          { id: 's7', name: 'Warriors', odds: 1.75 }
        ]
      },
      {
        id: 'm4',
        name: 'Total Points',
        type: 'over_under',
        selections: [
          { id: 's8', name: 'Over 220.5', odds: 1.90 },
          { id: 's9', name: 'Under 220.5', odds: 1.90 }
        ]
      }
    ]
  }
]

export const getSportMatches = (sport?: string) => {
  if (!sport || sport === 'All') return sportsData
  return sportsData.filter(match => match.sport === sport)
}

export const getLiveMatches = () => {
  return sportsData.filter(match => match.status === 'live')
}

export const getUpcomingMatches = () => {
  return sportsData.filter(match => match.status === 'upcoming')
}