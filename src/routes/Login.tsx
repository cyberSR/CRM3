import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { loginWithPassword } from '@core/auth/authClient'
import { useAuth } from '@core/auth/authStore'
import { Button } from '@/components/ui/button'

export default function Login() {
  const [email, setEmail] = useState('admin@local')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation() as any
  const setAuth = useAuth(s => s.setAuth)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      const res = await loginWithPassword(email, password)
      setAuth(res.user, res.token)
      localStorage.setItem('auth', JSON.stringify(res))
      const to = location.state?.from?.pathname ?? '/'
      navigate(to, { replace: true })
    } catch (e: any) {
      setError(e.message || 'Ошибка входа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-6 rounded-2xl border shadow-sm space-y-4">
        <div className="text-xl font-semibold">Вход</div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="admin@local" />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Пароль</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="admin123" />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <Button disabled={loading} className="w-full" type="submit" variant="default">
          {loading ? 'Входим...' : 'Войти'}
        </Button>
      </form>
    </div>
  )
}
