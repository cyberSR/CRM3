import React from 'react'
import { getModules } from '@core/moduleRegistry'

export default function Health() {
  const mods = getModules()
  return (
    <div className="p-4">
      <div className="text-lg font-semibold mb-4">Состояние модулей</div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="py-1">ID</th>
            <th className="py-1">Title</th>
            <th className="py-1">Route</th>
            <th className="py-1">Version</th>
          </tr>
        </thead>
        <tbody>
          {mods.map(m => (
            <tr key={m.id} className="border-t">
              <td className="py-1">{m.id}</td>
              <td className="py-1">{m.title}</td>
              <td className="py-1">{m.routeBase}</td>
              <td className="py-1">{m.version ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
