export type NavigationItem = {
  id: string
  title: string
  href?: string
  icon?: string        // из БД строка, напр. "Home" или "Settings2"
  isActive?: boolean
  items?: NavigationItem[]
}
