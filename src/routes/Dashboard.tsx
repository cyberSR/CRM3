import React from 'react'
import { getModules, getModuleContext } from '@core/moduleRegistry'

export default function Dashboard() {
  const ctx = getModuleContext()
  const widgets = getModules().flatMap(m => m.getWidgets?.(ctx) ?? [])
    .sort((a,b)=> (a.order ?? 999) - (b.order ?? 999))

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      {widgets.length === 0 && (
        <div className="text-sm text-gray-500">Нет виджетов. Модули могут добавить свои.</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.map(w => (
          <div key={w.id} className="bg-white rounded-2xl border p-4">
            <div className="font-medium mb-2">{w.title}</div>
            <div>{w.element}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
