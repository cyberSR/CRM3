import type { AppModule } from '@core/types'

function Page() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold">Каталоги</h1>
      <div className="text-sm text-gray-500">Здесь будут товары/услуги…</div>
    </div>
  )
}

const CatalogsModule: AppModule = {
  id: 'catalogs',
  title: 'Каталоги',
  routeBase: '/catalogs',

  getRoutes() { return [{ path: '', element: <Page /> }] },
  getMenu() { return [{ id: 'menu.catalogs', label: 'Каталоги', to: '/catalogs', icon: 'catalogs', order: 30 }] }
}

export default CatalogsModule
