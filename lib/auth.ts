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

const readStorage = <T>(key: string, fallback: T): T => {
  if (!isBrowser()) {
    return fallback
  }

  const value = window.localStorage.getItem(key)
  return value ? JSON.parse(value) : fallback
}

const writeStorage = (key: string, value: unknown) => {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
}

export const authService = {
  signup: (userData: Omit<User, 'id' | 'balance' | 'createdAt'>) => {
    const users = readStorage<User[]>('users', [])
    
    if (users.find((u: User) => u.email === userData.email)) {
      throw new Error('Email already exists')
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      balance: 0,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    writeStorage('users', users)
    writeStorage('currentUser', newUser)
    
    return newUser
  },

  login: (email: string, password: string) => {
    const users = readStorage<User[]>('users', [])
    const user = users.find((u: User) => u.email === email)
    
    if (!user) {
      throw new Error('User not found')
    }

    writeStorage('currentUser', user)
    return user
  },

  logout: () => {
    if (isBrowser()) {
      window.localStorage.removeItem('currentUser')
    }
  },

  getCurrentUser: (): User | null => {
    return readStorage<User | null>('currentUser', null)
  },

  isAuthenticated: () => {
    return !!readStorage<User | null>('currentUser', null)
  }
}
