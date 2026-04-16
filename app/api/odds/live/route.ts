import { NextResponse } from 'next/server'

// Re-use the same cache from the parent route by importing the fetcher
// We just filter to live matches only
export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/odds`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    return NextResponse.json({ matches: [] })
  }

  const data = await res.json()
  const live = (data.matches as any[]).filter((m: any) => m.status === 'live')

  return NextResponse.json({ matches: live })
}
