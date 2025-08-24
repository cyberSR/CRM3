import type { AppModule, ModuleContext } from '@core/types'
import { bus } from '@core/bus'
import { useAuth } from '@core/auth/authStore'
import { httpGet, httpPost } from '@core/http'
import { config } from '@core/config'
import { flags } from '@core/flags'

const registry: AppModule[] = []

export function getModules() { return registry }

export function getModuleContext(): ModuleContext {
  return {
    bus,
    auth: {
      user: () => useAuth.getState().user,
      has: (perm: string) => useAuth.getState().has(perm)
    },
    api: { get: httpGet, post: httpPost },
    config, flags
  }
}

export async function loadAllModules() {
  const modules = import.meta.glob('/src/modules/**/index.tsx', { eager: true }) as Record<string, any>
  for (const path in modules) {
    const mod = modules[path]?.default as AppModule | undefined
    if (mod && mod.id && mod.getRoutes) {
      registry.push(mod)
      if (typeof mod.init === 'function') { await mod.init(getModuleContext()) }
      if (typeof mod.subscribe === 'function') { mod.subscribe(bus as any, getModuleContext()) }
    } else {
      console.warn('[moduleRegistry] Не валидный модуль:', path)
    }
  }
}
