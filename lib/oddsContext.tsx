'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type OddsFormat = 'decimal' | 'fractional' | 'american'

interface OddsContextType {
  format: OddsFormat
  setFormat: (f: OddsFormat) => void
  convert: (decimal: number) => string
}

const OddsContext = createContext<OddsContextType>({
  format: 'decimal',
  setFormat: () => {},
  convert: (d) => d.toFixed(2),
})

export function OddsProvider({ children }: { children: ReactNode }) {
  const [format, setFormat] = useState<OddsFormat>('decimal')

  const convert = (decimal: number): string => {
    if (format === 'decimal') return decimal.toFixed(2)
    if (format === 'fractional') {
      const num = decimal - 1
      // find a simple fraction approximation
      const denom = 100
      const numer = Math.round(num * denom)
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
      const g = gcd(numer, denom)
      return `${numer / g}/${denom / g}`
    }
    // american
    if (decimal >= 2) return `+${Math.round((decimal - 1) * 100)}`
    return `${Math.round(-100 / (decimal - 1))}`
  }

  return (
    <OddsContext.Provider value={{ format, setFormat, convert }}>
      {children}
    </OddsContext.Provider>
  )
}

export const useOdds = () => useContext(OddsContext)
