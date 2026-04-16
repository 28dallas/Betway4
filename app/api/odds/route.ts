import { NextRequest, NextResponse } from 'next/server'

// The-Odds-API sport keys we care about
const SPORT_KEYS = [
  'soccer_epl',
  'soccer_spain_la_liga',
  'soccer_germany_bundesliga',
  'soccer_italy_serie_a',
  'soccer_france_ligue_one',
  'soccer_uefa_champs_league',
  'basketball_nba',
  'tennis_atp_french_open',
  'americanfootball_nfl',
]

const SPORT_LABEL: Record<string, string> = {
  soccer_epl: 'Football',
  soccer_spain_la_liga: 'Football',
  soccer_germany_bundesliga: 'Football',
  soccer_italy_serie_a: 'Football',
  soccer_france_ligue_one: 'Football',
  soccer_uefa_champs_league: 'Football',
  basketball_nba: 'Basketball',
  tennis_atp_french_open: 'Tennis',
  americanfootball_nfl: 'American Football',
}

const LEAGUE_LABEL: Record<string, string> = {
  soccer_epl: 'Premier League',
  soccer_spain_la_liga: 'La Liga',
  soccer_germany_bundesliga: 'Bundesliga',
  soccer_italy_serie_a: 'Serie A',
  soccer_france_ligue_one: 'Ligue 1',
  soccer_uefa_champs_league: 'Champions League',
  basketball_nba: 'NBA',
  tennis_atp_french_open: 'ATP French Open',
  americanfootball_nfl: 'NFL',
}

// In-memory cache — avoids hammering the free tier
const cache: { data: NormalizedMatch[] | null; ts: number } = { data: null, ts: 0 }
const CACHE_TTL = 60_000 // 60 seconds

export interface NormalizedMatch {
  id: string
  sport: string
  league: string
  homeTeam: string
  awayTeam: string
  startTime: string
  status: 'upcoming' | 'live'
  odds: { home: number; draw?: number; away: number }
}

async function fetchFromApi(sportKey: string): Promise<NormalizedMatch[]> {
  const apiKey = process.env.THE_ODDS_API_KEY
  if (!apiKey) return []

  const url = `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?apiKey=${apiKey}&regions=eu&markets=h2h&oddsFormat=decimal&dateFormat=iso`

  const res = await fetch(url, { next: { revalidate: 0 } })
  if (!res.ok) return []

  const games = await res.json()

  return games.map((g: any) => {
    const bookmaker = g.bookmakers?.[0]
    const market = bookmaker?.markets?.find((m: any) => m.key === 'h2h')
    const outcomes: any[] = market?.outcomes || []

    const home = outcomes.find((o: any) => o.name === g.home_team)?.price ?? 0
    const away = outcomes.find((o: any) => o.name === g.away_team)?.price ?? 0
    const drawOutcome = outcomes.find((o: any) => o.name === 'Draw')
    const draw = drawOutcome?.price

    const start = new Date(g.commence_time)
    const now = new Date()
    const diffMs = start.getTime() - now.getTime()
    const isLive = diffMs < 0 && diffMs > -7200000 // started within last 2h

    return {
      id: g.id,
      sport: SPORT_LABEL[sportKey] || 'Sport',
      league: LEAGUE_LABEL[sportKey] || sportKey,
      homeTeam: g.home_team,
      awayTeam: g.away_team,
      startTime: start.toLocaleString('en-KE', { dateStyle: 'short', timeStyle: 'short' }),
      status: isLive ? 'live' : 'upcoming',
      odds: { home, draw, away },
    } as NormalizedMatch
  })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sport = searchParams.get('sport') // optional filter

  const now = Date.now()

  // Return cache if fresh
  if (cache.data && now - cache.ts < CACHE_TTL) {
    const filtered = sport && sport !== 'All'
      ? cache.data.filter(m => m.sport === sport)
      : cache.data
    return NextResponse.json({ matches: filtered, cached: true })
  }

  try {
    const results = await Promise.all(SPORT_KEYS.map(fetchFromApi))
    const all = results.flat().filter(m => m.odds.home > 0 && m.odds.away > 0)

    cache.data = all
    cache.ts = now

    const filtered = sport && sport !== 'All'
      ? all.filter(m => m.sport === sport)
      : all

    return NextResponse.json({ matches: filtered, cached: false })
  } catch (err) {
    // If API fails, return cached data if available, else empty
    const fallback = cache.data ?? []
    return NextResponse.json({ matches: fallback, cached: true, error: 'API fetch failed' })
  }
}
