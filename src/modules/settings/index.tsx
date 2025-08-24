import type { AppModule } from '@core/types'
import Health from './screens/Health'

function Page() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold">Настройки</h1>
      <div className="text-sm text-gray-500">Конфигурация приложения, пользователи, интеграции…</div>
    </div>
  )
}

const SettingsModule: AppModule = {
  id: 'settings',
  title: 'Настройки',
  routeBase: '/settings',

  getRoutes() {
    return [
      { path: '', element: <Page /> },
      { path: 'health', element: <Health /> }
    ]
  },

  getMenu() {
    return [
      { id: 'menu.settings', label: 'Настройки', to: '/settings', icon: 'settings', order: 90 },
    ]
  }
}

export default SettingsModule
