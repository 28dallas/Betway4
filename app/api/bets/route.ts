import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'

const JWT_SECRET = process.env.JWT_SECRET || 'changeme-set-in-env'

function getUserIdFromRequest(request: NextRequest): string | null {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return null
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string }
    return payload.userId
  } catch {
    return null
  }
}

// Place a bet
export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request)
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { eventId, selection, odds, stake, potentialWin, match, sport } = await request.json()

    if (!stake || stake < 1) {
      return NextResponse.json({ error: 'Minimum stake is KES 1' }, { status: 400 })
    }

    const user = await db.user.findUnique({ where: { id: userId } })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    if (user.balance < stake) return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 })

    // Deduct balance and record bet in a transaction
    const [bet] = await db.$transaction([
      db.bet.create({
        data: {
          userId,
          eventId: eventId || 'manual',
          oddsId: `${eventId}-${selection}`,
          amount: stake,
          status: 'pending',
        },
      }),
      db.user.update({
        where: { id: userId },
        data: { balance: { decrement: stake } },
      }),
      db.transaction.create({
        data: {
          userId,
          type: 'bet',
          amount: stake,
          status: 'completed',
        },
      }),
    ])

    return NextResponse.json({
      bet: {
        id: bet.id,
        userId,
        eventId,
        selection,
        odds,
        stake,
        potentialWin,
        match,
        sport,
        status: 'pending',
        placedAt: bet.createdAt.toISOString(),
      },
    })
  } catch (error) {
    console.error('Place bet error:', error)
    return NextResponse.json({ error: 'Failed to place bet' }, { status: 500 })
  }
}

// Get user bets
export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request)
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const bets = await db.bet.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ bets })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bets' }, { status: 500 })
  }
}
