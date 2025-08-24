import type { AppModule } from '@core/types'

function Page() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold">Заявки</h1>
      <div className="text-sm text-gray-500">Пустой модуль. Здесь появится функционал.</div>
    </div>
  )
}

const RequestsModule: AppModule = {
  id: 'requests',
  title: 'Заявки',
  routeBase: '/requests',

  getRoutes() {
    return [{ path: '', element: <Page /> }]
  },

  getMenu() {
    return [{ id: 'menu.requests', label: 'Заявки', to: '/requests', icon: 'requests', order: 10 }]
  }
}

export default RequestsModule
