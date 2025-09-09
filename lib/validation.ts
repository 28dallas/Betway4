export const validateBet = (stake: number, userBalance: number) => {
  const errors: string[] = []
  
  if (stake <= 0) {
    errors.push('Stake must be greater than 0')
  }
  
  if (stake < 1) {
    errors.push('Minimum stake is $1')
  }
  
  if (stake > 10000) {
    errors.push('Maximum stake is $10,000')
  }
  
  if (stake > userBalance) {
    errors.push('Insufficient balance')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateAge = (birthDate: string) => {
  const today = new Date()
  const birth = new Date(birthDate)
  const age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= 18
  }
  
  return age >= 18
}

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string) => {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}