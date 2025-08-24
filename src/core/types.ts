import type { Emitter } from 'mitt'

export type Unsubscribe = () => void

export interface MenuItem {
  id: string
  label: string
  to: string
  icon?: string
  order?: number
  isVisible?: () => boolean
}

export interface SecondaryNavItem {
  id: string
  label: string
  to: string
  order?: number
}

export interface TopbarAction {
  id: string
  label: string
  onClick: () => void
  hint?: string
}

export interface DashboardWidget {
  id: string
  title: string
  element: React.ReactNode
  order?: number
}

export interface Shortcut {
  combo: string
  description: string
  handler: () => void
}

export interface AuthUser {
  id: string
  email: string
  name: string
  roles: string[]
  permissions: string[]
}

export interface ModuleContext {
  bus: Emitter<any>
  auth: {
    user: () => AuthUser | null
    has: (perm: string) => boolean
  }
  api: {
    get: <T=any>(url: string) => Promise<T>
    post: <T=any>(url: string, body?: any) => Promise<T>
  }
  config: Record<string, any>
  flags: Record<string, boolean>
}

export interface RouteDef {
  path: string
  element: React.ReactNode
}

export interface AppModule {
  id: string
  title: string
  routeBase: string
  version?: string
  capabilities?: string[]

  getRoutes(): RouteDef[]
  getLayout?(): React.ComponentType<{ children: React.ReactNode }>
  getMenu?(ctx: ModuleContext): MenuItem[]
  getTopbar?(ctx: ModuleContext): TopbarAction[]
  getWidgets?(ctx: ModuleContext): DashboardWidget[]
  getShortcuts?(ctx: ModuleContext): Shortcut[]
  getSecondaryNav?(ctx: ModuleContext): SecondaryNavItem[]

  init?(ctx: ModuleContext): void | Promise<void>
  mount?(host: HTMLElement | null, ctx: ModuleContext): void
  unmount?(): void
  dispose?(): void

  subscribe?(bus: Emitter<any>, ctx: ModuleContext): Unsubscribe | void
}
