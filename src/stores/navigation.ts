import { create } from "zustand"
import type { NavigationItem } from "@/types/navigation"

type NavState = {
  items: NavigationItem[]
  load: () => Promise<void>
}

export const useNavigation = create<NavState>((set) => ({
  items: [],
  load: async () => {
    const res = await fetch("/api/navigation")
    const { items } = await res.json()
    set({ items })
  },
}))
