import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { bus } from '@core/bus'
import AppRoutes from './AppRoutes'

import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { getModules, getModuleContext } from '@core/moduleRegistry'
import { Button } from '@/components/ui/button'

export default function AppShell() {
  const navigate = useNavigate()
  useEffect(() => {
    const onNav = (path: string) => navigate(path)
    bus.on('nav:to', onNav)
    return () => { bus.off('nav:to', onNav) }
  }, [navigate])

  const ctx = getModuleContext()
  const actions = getModules().flatMap(m => m.getTopbar?.(ctx) ?? [])

  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="flex-1 min-w-0 flex flex-col bg-muted/50">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b bg-background">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Главная</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-2">
              {actions.map(a => (
                <Button key={a.id} onClick={a.onClick} variant="outline">{a.label}</Button>
              ))}
            </div>
          </div>
        </header>

        <main className="flex-1 min-w-0">
          <AppRoutes />
        </main>
      </div>
    </SidebarProvider>
  )
}
