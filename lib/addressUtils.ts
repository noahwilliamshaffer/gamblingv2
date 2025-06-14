// Mock address generation utilities
export const generateBTCAddress = (userId: string): string => {
  // Generate a mock Bitcoin address based on user ID
  const hash = simpleHash(userId + 'btc')
  return `bc1q${hash.substring(0, 39)}`
}

export const generateETHAddress = (userId: string): string => {
  // Generate a mock Ethereum address based on user ID
  const hash = simpleHash(userId + 'eth')
  return `0x${hash}`
}

// Simple hash function for generating deterministic addresses
const simpleHash = (str: string): string => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  // Convert to positive number and then to hex
  const positiveHash = Math.abs(hash)
  const hexString = positiveHash.toString(16)
  return '0'.repeat(Math.max(0, 40 - hexString.length)) + hexString
}

export const validateBTCAddress = (address: string): boolean => {
  // Basic BTC address validation (mock)
  return /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/.test(address)
}

export const validateETHAddress = (address: string): boolean => {
  // Basic ETH address validation
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export const formatCurrency = (amount: number, currency: string): string => {
  if (currency === 'BTC') {
    return `${amount.toFixed(8)} BTC`
  } else if (currency === 'ETH') {
    return `${amount.toFixed(6)} ETH`
  }
  return `${amount} ${currency}`
}

export const getCurrencyIcon = (currency: string): string => {
  switch (currency) {
    case 'BTC':
      return '₿'
    case 'ETH':
      return 'Ξ'
    default:
      return '$'
  }
} 