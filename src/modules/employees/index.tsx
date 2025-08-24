import type { AppModule } from '@core/types'

function Page() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold">Сотрудники</h1>
      <div className="text-sm text-gray-500">Список сотрудников, роли, привязки…</div>
    </div>
  )
}

const EmployeesModule: AppModule = {
  id: 'employees',
  title: 'Сотрудники',
  routeBase: '/employees',

  getRoutes() { return [{ path: '', element: <Page /> }] },
  getMenu() { return [{ id: 'menu.employees', label: 'Сотрудники', to: '/employees', icon: 'employees', order: 40 }] }
}

export default EmployeesModule
