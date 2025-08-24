import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import AppShell from './AppShell'
import { loadAllModules } from '@core/moduleRegistry'

async function bootstrap() {
  await loadAllModules()
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </React.StrictMode>
  )
}
bootstrap()
