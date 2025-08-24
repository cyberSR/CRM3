"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "admin",
    email: "cyberS7@mail.ru",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Romart",
      logo: GalleryVerticalEnd,
      plan: "ИП Romart",
    },
    {
      name: "Mebel Alex",
      logo: AudioWaveform,
      plan: "ИП Демьяненко",
    },
    {
      name: "Mebem VvV",
      logo: Command,
      plan: "ИП Трефилов",
    },
  ],
  navMain: [
    {
      title: "Заяки",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Все заявки",
          url: "#",
        },
        {
          title: "Отклоненные",
          url: "#",
        },
      ],
    },
    {
      title: "Заказы",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "В работе",
          url: "#",
        },
        {
          title: "Завершенные",
          url: "#",
        },
        {
          title: "На просрочке",
          url: "#",
        },
      ],
    },
    {
      title: "Каталоги",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Каталог ЛДСП",
          url: "#",
        },
        {
          title: "Каталог МДФ",
          url: "#",
        },
        {
          title: "Фурнитура",
          url: "#",
        },
        {
          title: "Профили",
          url: "#",
        },
        {
          title: "Стекло и зеркала",
          url: "#",
        },
        {
          title: "Электрика",
          url: "#",
        },
        {
          title: "Вентиляция",
          url: "#",
        },
        {
          title: "Столешницы",
          url: "#",
        },
      ],
    },
    {
      title: "Настройки",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Romart",
      url: "#",
      icon: Frame,
    },
    {
      name: "Mebel Alex",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Mebel VVV",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
