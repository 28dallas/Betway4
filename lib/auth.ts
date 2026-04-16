export interface User {
  id: string
  email: string
  fullName: string
  phone: string
  country: string
  currency: string
  balance: number
  createdAt: string
}

const isBrowser = () => typeof window !== 'undefined'

const getToken = (): string | null => {
  if (!isBrowser()) return null
  return localStorage.getItem('authToken')
}

const saveSession = (user: User, token: string) => {
  localStorage.setItem('authToken', token)
  localStorage.setItem('currentUser', JSON.stringify(user))
}

const clearSession = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('currentUser')
}

export const authService = {
  signup: async (userData: Omit<User, 'id' | 'balance' | 'createdAt'> & { password?: string }) => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'signup',
        email: userData.email,
        password: userData.password || 'Password1',
        fullName: userData.fullName,
        phone: userData.phone,
        country: userData.country,
        currency: userData.currency,
      }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Signup failed')

    saveSession(data.user, data.token)
    return data.user as User
  },

  login: async (email: string, password: string) => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email, password }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Login failed')

    saveSession(data.user, data.token)
    return data.user as User
  },

  logout: () => {
    clearSession()
  },

  getCurrentUser: (): User | null => {
    if (!isBrowser()) return null
    const raw = localStorage.getItem('currentUser')
    return raw ? JSON.parse(raw) : null
  },

  // Refresh balance from DB (call after deposit/bet)
  refreshUser: async (): Promise<User | null> => {
    const token = getToken()
    if (!token) return null

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: 'me' }),
      })

      if (!res.ok) return null
      const data = await res.json()
      localStorage.setItem('currentUser', JSON.stringify(data.user))
      return data.user as User
    } catch {
      return null
    }
  },

  getToken,

  isAuthenticated: () => !!getToken(),
}
