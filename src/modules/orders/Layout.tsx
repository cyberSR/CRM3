import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function OrdersLayout() {
  return (
    <div className="flex h-full">
      <aside className="w-52 bg-white border-r p-3 space-y-2">
        <div className="font-semibold mb-2">Заказы</div>
        <NavLink to="/orders" className={({isActive}) => (isActive ? 'text-brand' : '')}>Все заказы</NavLink><br/>
        <NavLink to="/orders/new" className={({isActive}) => (isActive ? 'text-brand' : '')}>Создать</NavLink>
      </aside>
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  )
}
