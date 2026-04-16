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
  // ── FOOTBALL ──────────────────────────────────────────────
  {
    id: 'f1',
    sport: 'Football',
    league: 'Premier League',
    homeTeam: 'Manchester United',
    awayTeam: 'Arsenal',
    startTime: 'Today 16:30',
    status: 'upcoming',
    odds: { home: 2.45, draw: 3.20, away: 2.90 },
    markets: [
      { id: 'f1m1', name: 'Match Result', type: '1X2', selections: [{ id: 's1', name: 'Man United', odds: 2.45 }, { id: 's2', name: 'Draw', odds: 3.20 }, { id: 's3', name: 'Arsenal', odds: 2.90 }] },
      { id: 'f1m2', name: 'Total Goals', type: 'over_under', selections: [{ id: 's4', name: 'Over 2.5', odds: 1.85 }, { id: 's5', name: 'Under 2.5', odds: 1.95 }] },
      { id: 'f1m3', name: 'Both Teams to Score', type: 'yes_no', selections: [{ id: 's6', name: 'Yes', odds: 1.72 }, { id: 's7', name: 'No', odds: 2.05 }] },
    ],
  },
  {
    id: 'f2',
    sport: 'Football',
    league: 'Premier League',
    homeTeam: 'Chelsea',
    awayTeam: 'Liverpool',
    startTime: 'Today 19:00',
    status: 'live',
    homeScore: 1,
    awayScore: 1,
    odds: { home: 2.80, draw: 3.10, away: 2.50 },
    markets: [
      { id: 'f2m1', name: 'Match Result', type: '1X2', selections: [{ id: 's8', name: 'Chelsea', odds: 2.80 }, { id: 's9', name: 'Draw', odds: 3.10 }, { id: 's10', name: 'Liverpool', odds: 2.50 }] },
      { id: 'f2m2', name: 'Next Goal', type: 'next_goal', selections: [{ id: 's11', name: 'Chelsea', odds: 2.10 }, { id: 's12', name: 'No Goal', odds: 4.50 }, { id: 's13', name: 'Liverpool', odds: 1.90 }] },
    ],
  },
  {
    id: 'f3',
    sport: 'Football',
    league: 'La Liga',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    startTime: 'Tomorrow 20:00',
    status: 'upcoming',
    odds: { home: 2.10, draw: 3.40, away: 3.20 },
    markets: [
      { id: 'f3m1', name: 'Match Result', type: '1X2', selections: [{ id: 's14', name: 'Real Madrid', odds: 2.10 }, { id: 's15', name: 'Draw', odds: 3.40 }, { id: 's16', name: 'Barcelona', odds: 3.20 }] },
      { id: 'f3m2', name: 'Total Goals', type: 'over_under', selections: [{ id: 's17', name: 'Over 2.5', odds: 1.75 }, { id: 's18', name: 'Under 2.5', odds: 2.05 }] },
    ],
  },
  {
    id: 'f4',
    sport: 'Football',
    league: 'Serie A',
    homeTeam: 'AC Milan',
    awayTeam: 'Inter Milan',
    startTime: 'Sat 18:00',
    status: 'upcoming',
    odds: { home: 2.60, draw: 3.00, away: 2.70 },
    markets: [
      { id: 'f4m1', name: 'Match Result', type: '1X2', selections: [{ id: 's19', name: 'AC Milan', odds: 2.60 }, { id: 's20', name: 'Draw', odds: 3.00 }, { id: 's21', name: 'Inter Milan', odds: 2.70 }] },
      { id: 'f4m2', name: 'Both Teams to Score', type: 'yes_no', selections: [{ id: 's22', name: 'Yes', odds: 1.65 }, { id: 's23', name: 'No', odds: 2.20 }] },
    ],
  },
  {
    id: 'f5',
    sport: 'Football',
    league: 'Bundesliga',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    startTime: 'Sat 15:30',
    status: 'upcoming',
    odds: { home: 1.75, draw: 3.80, away: 4.20 },
    markets: [
      { id: 'f5m1', name: 'Match Result', type: '1X2', selections: [{ id: 's24', name: 'Bayern Munich', odds: 1.75 }, { id: 's25', name: 'Draw', odds: 3.80 }, { id: 's26', name: 'Dortmund', odds: 4.20 }] },
      { id: 'f5m2', name: 'Total Goals', type: 'over_under', selections: [{ id: 's27', name: 'Over 3.5', odds: 1.90 }, { id: 's28', name: 'Under 3.5', odds: 1.90 }] },
    ],
  },
  {
    id: 'f6',
    sport: 'Football',
    league: 'Champions League',
    homeTeam: 'PSG',
    awayTeam: 'Manchester City',
    startTime: 'Wed 20:00',
    status: 'upcoming',
    odds: { home: 2.90, draw: 3.30, away: 2.40 },
    markets: [
      { id: 'f6m1', name: 'Match Result', type: '1X2', selections: [{ id: 's29', name: 'PSG', odds: 2.90 }, { id: 's30', name: 'Draw', odds: 3.30 }, { id: 's31', name: 'Man City', odds: 2.40 }] },
      { id: 'f6m2', name: 'Both Teams to Score', type: 'yes_no', selections: [{ id: 's32', name: 'Yes', odds: 1.60 }, { id: 's33', name: 'No', odds: 2.30 }] },
    ],
  },
  {
    id: 'f7',
    sport: 'Football',
    league: 'Ligue 1',
    homeTeam: 'Marseille',
    awayTeam: 'Lyon',
    startTime: 'Sun 17:05',
    status: 'upcoming',
    odds: { home: 2.20, draw: 3.10, away: 3.30 },
    markets: [
      { id: 'f7m1', name: 'Match Result', type: '1X2', selections: [{ id: 's34', name: 'Marseille', odds: 2.20 }, { id: 's35', name: 'Draw', odds: 3.10 }, { id: 's36', name: 'Lyon', odds: 3.30 }] },
    ],
  },

  // ── BASKETBALL ────────────────────────────────────────────
  {
    id: 'b1',
    sport: 'Basketball',
    league: 'NBA',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    startTime: 'Today 20:00',
    status: 'live',
    homeScore: 89,
    awayScore: 92,
    odds: { home: 2.10, away: 1.75 },
    markets: [
      { id: 'b1m1', name: 'Match Winner', type: 'moneyline', selections: [{ id: 'bs1', name: 'Lakers', odds: 2.10 }, { id: 'bs2', name: 'Warriors', odds: 1.75 }] },
      { id: 'b1m2', name: 'Total Points', type: 'over_under', selections: [{ id: 'bs3', name: 'Over 220.5', odds: 1.90 }, { id: 'bs4', name: 'Under 220.5', odds: 1.90 }] },
    ],
  },
  {
    id: 'b2',
    sport: 'Basketball',
    league: 'NBA',
    homeTeam: 'Celtics',
    awayTeam: 'Heat',
    startTime: 'Today 22:30',
    status: 'upcoming',
    odds: { home: 1.65, away: 2.25 },
    markets: [
      { id: 'b2m1', name: 'Match Winner', type: 'moneyline', selections: [{ id: 'bs5', name: 'Celtics', odds: 1.65 }, { id: 'bs6', name: 'Heat', odds: 2.25 }] },
      { id: 'b2m2', name: 'Total Points', type: 'over_under', selections: [{ id: 'bs7', name: 'Over 215.5', odds: 1.88 }, { id: 'bs8', name: 'Under 215.5', odds: 1.92 }] },
    ],
  },
  {
    id: 'b3',
    sport: 'Basketball',
    league: 'NBA',
    homeTeam: 'Bucks',
    awayTeam: 'Nets',
    startTime: 'Tomorrow 19:00',
    status: 'upcoming',
    odds: { home: 1.55, away: 2.50 },
    markets: [
      { id: 'b3m1', name: 'Match Winner', type: 'moneyline', selections: [{ id: 'bs9', name: 'Bucks', odds: 1.55 }, { id: 'bs10', name: 'Nets', odds: 2.50 }] },
      { id: 'b3m2', name: 'Handicap (-5.5)', type: 'handicap', selections: [{ id: 'bs11', name: 'Bucks -5.5', odds: 1.90 }, { id: 'bs12', name: 'Nets +5.5', odds: 1.90 }] },
    ],
  },
  {
    id: 'b4',
    sport: 'Basketball',
    league: 'EuroLeague',
    homeTeam: 'Real Madrid',
    awayTeam: 'CSKA Moscow',
    startTime: 'Thu 20:45',
    status: 'upcoming',
    odds: { home: 1.80, away: 2.00 },
    markets: [
      { id: 'b4m1', name: 'Match Winner', type: 'moneyline', selections: [{ id: 'bs13', name: 'Real Madrid', odds: 1.80 }, { id: 'bs14', name: 'CSKA Moscow', odds: 2.00 }] },
    ],
  },

  // ── TENNIS ────────────────────────────────────────────────
  {
    id: 't1',
    sport: 'Tennis',
    league: 'ATP Masters 1000',
    homeTeam: 'Djokovic',
    awayTeam: 'Alcaraz',
    startTime: 'Today 14:00',
    status: 'live',
    homeScore: 1,
    awayScore: 1,
    odds: { home: 1.85, away: 1.95 },
    markets: [
      { id: 't1m1', name: 'Match Winner', type: 'moneyline', selections: [{ id: 'ts1', name: 'Djokovic', odds: 1.85 }, { id: 'ts2', name: 'Alcaraz', odds: 1.95 }] },
      { id: 't1m2', name: 'Total Sets', type: 'over_under', selections: [{ id: 'ts3', name: 'Over 3.5', odds: 2.10 }, { id: 'ts4', name: 'Under 3.5', odds: 1.70 }] },
    ],
  },
  {
    id: 't2',
    sport: 'Tennis',
    league: 'WTA Tour',
    homeTeam: 'Swiatek',
    awayTeam: 'Sabalenka',
    startTime: 'Today 16:00',
    status: 'upcoming',
    odds: { home: 1.70, away: 2.10 },
    markets: [
      { id: 't2m1', name: 'Match Winner', type: 'moneyline', selections: [{ id: 'ts5', name: 'Swiatek', odds: 1.70 }, { id: 'ts6', name: 'Sabalenka', odds: 2.10 }] },
    ],
  },
  {
    id: 't3',
    sport: 'Tennis',
    league: 'ATP 500',
    homeTeam: 'Sinner',
    awayTeam: 'Medvedev',
    startTime: 'Tomorrow 13:00',
    status: 'upcoming',
    odds: { home: 1.90, away: 1.90 },
    markets: [
      { id: 't3m1', name: 'Match Winner', type: 'moneyline', selections: [{ id: 'ts7', name: 'Sinner', odds: 1.90 }, { id: 'ts8', name: 'Medvedev', odds: 1.90 }] },
      { id: 't3m2', name: 'Total Sets', type: 'over_under', selections: [{ id: 'ts9', name: 'Over 3.5', odds: 2.20 }, { id: 'ts10', name: 'Under 3.5', odds: 1.65 }] },
    ],
  },

  // ── BASEBALL ──────────────────────────────────────────────
  {
    id: 'bb1',
    sport: 'Baseball',
    league: 'MLB',
    homeTeam: 'New York Yankees',
    awayTeam: 'Boston Red Sox',
    startTime: 'Today 18:05',
    status: 'upcoming',
    odds: { home: 1.80, away: 2.05 },
    markets: [
      { id: 'bb1m1', name: 'Moneyline', type: 'moneyline', selections: [{ id: 'bbs1', name: 'Yankees', odds: 1.80 }, { id: 'bbs2', name: 'Red Sox', odds: 2.05 }] },
      { id: 'bb1m2', name: 'Total Runs', type: 'over_under', selections: [{ id: 'bbs3', name: 'Over 8.5', odds: 1.90 }, { id: 'bbs4', name: 'Under 8.5', odds: 1.90 }] },
    ],
  },
  {
    id: 'bb2',
    sport: 'Baseball',
    league: 'MLB',
    homeTeam: 'LA Dodgers',
    awayTeam: 'San Francisco Giants',
    startTime: 'Today 21:10',
    status: 'upcoming',
    odds: { home: 1.65, away: 2.25 },
    markets: [
      { id: 'bb2m1', name: 'Moneyline', type: 'moneyline', selections: [{ id: 'bbs5', name: 'Dodgers', odds: 1.65 }, { id: 'bbs6', name: 'Giants', odds: 2.25 }] },
    ],
  },
  {
    id: 'bb3',
    sport: 'Baseball',
    league: 'MLB',
    homeTeam: 'Chicago Cubs',
    awayTeam: 'St. Louis Cardinals',
    startTime: 'Tomorrow 14:20',
    status: 'upcoming',
    odds: { home: 2.10, away: 1.75 },
    markets: [
      { id: 'bb3m1', name: 'Moneyline', type: 'moneyline', selections: [{ id: 'bbs7', name: 'Cubs', odds: 2.10 }, { id: 'bbs8', name: 'Cardinals', odds: 1.75 }] },
    ],
  },

  // ── HOCKEY ────────────────────────────────────────────────
  {
    id: 'h1',
    sport: 'Hockey',
    league: 'NHL',
    homeTeam: 'Toronto Maple Leafs',
    awayTeam: 'Montreal Canadiens',
    startTime: 'Today 19:00',
    status: 'upcoming',
    odds: { home: 1.90, draw: 4.50, away: 3.80 },
    markets: [
      { id: 'h1m1', name: 'Match Result', type: '1X2', selections: [{ id: 'hs1', name: 'Maple Leafs', odds: 1.90 }, { id: 'hs2', name: 'Draw', odds: 4.50 }, { id: 'hs3', name: 'Canadiens', odds: 3.80 }] },
      { id: 'h1m2', name: 'Total Goals', type: 'over_under', selections: [{ id: 'hs4', name: 'Over 5.5', odds: 1.85 }, { id: 'hs5', name: 'Under 5.5', odds: 1.95 }] },
    ],
  },
  {
    id: 'h2',
    sport: 'Hockey',
    league: 'NHL',
    homeTeam: 'Colorado Avalanche',
    awayTeam: 'Vegas Golden Knights',
    startTime: 'Tomorrow 21:00',
    status: 'upcoming',
    odds: { home: 2.05, draw: 4.20, away: 3.40 },
    markets: [
      { id: 'h2m1', name: 'Match Result', type: '1X2', selections: [{ id: 'hs6', name: 'Avalanche', odds: 2.05 }, { id: 'hs7', name: 'Draw', odds: 4.20 }, { id: 'hs8', name: 'Golden Knights', odds: 3.40 }] },
    ],
  },
  {
    id: 'h3',
    sport: 'Hockey',
    league: 'NHL',
    homeTeam: 'Boston Bruins',
    awayTeam: 'Tampa Bay Lightning',
    startTime: 'Sat 20:00',
    status: 'upcoming',
    odds: { home: 1.95, draw: 4.30, away: 3.60 },
    markets: [
      { id: 'h3m1', name: 'Match Result', type: '1X2', selections: [{ id: 'hs9', name: 'Bruins', odds: 1.95 }, { id: 'hs10', name: 'Draw', odds: 4.30 }, { id: 'hs11', name: 'Lightning', odds: 3.60 }] },
    ],
  },
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
