export interface Claims {
  target: string
}

export interface Users {
  name: string
  email: string
  admin: boolean
}

export interface SearchHistory {
  type: 'barcode' | 'plaintext'
  value: string
  where?: any
  user: string
}

export interface Place {}
