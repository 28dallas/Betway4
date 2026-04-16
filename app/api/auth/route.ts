import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'

const JWT_SECRET = process.env.JWT_SECRET || 'changeme-set-in-env'

export async function POST(request: NextRequest) {
  try {
    const { action, email, password, fullName, phone, country, currency } = await request.json()

    if (action === 'signup') {
      const existing = await db.user.findUnique({ where: { email } })
      if (existing) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
      }

      const hashed = await bcrypt.hash(password, 10)
      const user = await db.user.create({
        data: {
          email,
          password: hashed,
          name: fullName,
          balance: 0,
        },
      })

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          fullName: user.name,
          phone: phone || '',
          country: country || '',
          currency: currency || 'KES',
          balance: user.balance,
          createdAt: user.createdAt.toISOString(),
        },
        token,
      })
    }

    if (action === 'login') {
      const user = await db.user.findUnique({ where: { email } })
      if (!user) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
      }

      const valid = await bcrypt.compare(password, user.password)
      if (!valid) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          fullName: user.name,
          phone: '',
          country: '',
          currency: 'KES',
          balance: user.balance,
          createdAt: user.createdAt.toISOString(),
        },
        token,
      })
    }

    if (action === 'me') {
      const authHeader = request.headers.get('authorization')
      const token = authHeader?.replace('Bearer ', '')
      if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

      const payload = jwt.verify(token, JWT_SECRET) as { userId: string }
      const user = await db.user.findUnique({ where: { id: payload.userId } })
      if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          fullName: user.name,
          phone: '',
          country: '',
          currency: 'KES',
          balance: user.balance,
          createdAt: user.createdAt.toISOString(),
        },
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
