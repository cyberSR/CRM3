"use client"

import * as React from "react"
import { ChevronRight, Circle } from "lucide-react"
import dynamicIconImports from "lucide-react/dynamicIconImports"
import type { NavigationItem } from "@/types/navigation"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

function renderIcon(icon?: string) {
  if (!icon) return null
  const importFn =
    (dynamicIconImports as any)[icon] ||
    (dynamicIconImports as any)[icon + "Icon"]
  if (!importFn) return <Circle className="h-4 w-4" />

  const Lazy = React.lazy(importFn)
  return (
    <React.Suspense fallback={<Circle className="h-4 w-4" />}>
      <Lazy className="h-4 w-4" />
    </React.Suspense>
  )
}

export function NavMain({ items }: { items: NavigationItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.id ?? item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {renderIcon(item.icon)}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((sub) => (
                    <SidebarMenuSubItem key={sub.id ?? sub.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={sub.href ?? "#"}>
                          <span>{sub.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
