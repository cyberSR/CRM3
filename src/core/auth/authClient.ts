type LoginResult = { token: string, user: { id: string, email: string, name: string, roles: string[], permissions: string[] } }
export async function loginWithPassword(email: string, password: string): Promise<LoginResult> {
  await new Promise(r => setTimeout(r, 300))
  if (email === 'admin@local' && password === 'admin123') {
    return {
      token: 'demo-token',
      user: { id: 'u_admin', email, name: 'Admin', roles: ['admin'], permissions: ['*'] }
    }
  }
  throw new Error('Неверный логин или пароль')
}
