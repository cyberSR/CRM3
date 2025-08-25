export type NavItem = {
  id: string
  title: string
  url?: string
  icon?: string
  isActive: boolean
  items?: NavItem[]
}
export type NavResponse = { items: NavItem[] }
