import { create } from 'zustand'
import type { NavItem, NavResponse } from '@/types/navigation'
import { z } from 'zod'

const NavItemSchema: z.ZodType<NavItem> = z.lazy(() =>
  z.object({
    id: z.string(),
    title: z.string(),
    url: z.string().optional(),
    isActive: z.boolean(),
    icon: z.string().optional(),
    items: z.array(z.any()).optional()
  }).transform(o => ({ ...o, items: (o.items as any[] | undefined)?.map(i => NavItemSchema.parse(i)) }))
)

const NavResponseSchema = z.object({ items: z.array(NavItemSchema) })

type State = {
  items: NavItem[]
  loading: boolean
  error: string | null
  load: () => Promise<void>
}

export const useNavigation = create<State>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  load: async () => {
    if (get().loading || get().items.length) return
    set({ loading: true, error: null })
    try {
      const res = await fetch('/api/navigation', { credentials: 'include' })
      const json = await res.json()
      const data = NavResponseSchema.parse(json) as NavResponse
      set({ items: data.items, loading: false })
    } catch (e: any) {
      set({ error: e?.message || 'Не удалось загрузить меню', loading: false })
    }
  }
}))
