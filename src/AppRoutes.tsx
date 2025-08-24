import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import Login from './routes/Login'
import Dashboard from './routes/Dashboard'
import { getModules } from '@core/moduleRegistry'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />

        {getModules().map(m => {
          const Layout = m.getLayout?.() ?? React.Fragment
          const base = m.routeBase.replace(/^\//, '')
          return (
            <Route
              key={m.id}
              path={base}
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              {m.getRoutes().map((r, i) => (
                <Route key={i} path={r.path} element={r.element} />
              ))}
            </Route>
          )
        })}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
