import {
  Home, ClipboardList, ShoppingCart, Package, Users, Settings,
  Circle, FileText, Calendar, MessageSquare, Boxes, CreditCard
} from "lucide-react"

export type NavItem = {
  title: string
  href?: string
  icon?: keyof typeof iconMap
  items?: NavItem[]
  badge?: string
  disabled?: boolean
}

export const iconMap = {
  home: Home,
  requests: ClipboardList,
  orders: ShoppingCart,
  catalogs: Package,
  employees: Users,
  settings: Settings,
  file: FileText,
  calendar: Calendar,
  message: MessageSquare,
  boxes: Boxes,
  payments: CreditCard,
  default: Circle,
} as const

// Главное меню (вместо Playground — Заявки с подпунктами)
export const primaryNav: NavItem[] = [
  { title: "Главная", href: "/", icon: "home" },

  {
    title: "Заявки",
    icon: "requests",
    items: [
      { title: "Все заявки", href: "/requests" },
      { title: "Новые",      href: "/requests/new" },
      { title: "В работе",   href: "/requests/in-progress" },
      { title: "Закрытые",   href: "/requests/closed" },
    ],
  },

  {
    title: "Заказы",
    icon: "orders",
    items: [
      { title: "Все",       href: "/orders" },
      { title: "Создать",   href: "/orders/new" },
      { title: "Черновики", href: "/orders/drafts" },
    ],
  },

  { title: "Каталоги",   href: "/catalogs",   icon: "catalogs" },
  { title: "Сотрудники", href: "/employees",  icon: "employees" },
  { title: "Настройки",  href: "/settings",   icon: "settings" },
]
