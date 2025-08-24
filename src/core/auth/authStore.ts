import { create } from 'zustand'
import type { AuthUser } from '@core/types'

type AuthState = {
  user: AuthUser | null
  token: string | null
  setAuth: (u: AuthUser, t: string) => void
  clear: () => void
  has: (perm: string) => boolean
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  setAuth: (user, token) => set({ user, token }),
  clear: () => set({ user: null, token: null }),
  has: (perm: string) => {
    const u = get().user
    if (!u) return false
    if (u.permissions.includes('*')) return true
    return u.permissions.includes(perm)
  }
}))

const saved = localStorage.getItem('auth')
if (saved) {
  try {
    const { user, token } = JSON.parse(saved)
    if (token && user) { useAuth.setState({ user, token }) }
  } catch {}
}
