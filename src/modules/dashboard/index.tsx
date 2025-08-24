import type { AppModule } from '@core/types'

const DashboardModule: AppModule = {
  id: 'dashboard',
  title: 'Главная',
  routeBase: '/',

  getRoutes() { return [] },

  getMenu() {
    return [{
      id: 'menu.dashboard',
      label: 'Главная',
      to: '/',
      icon: 'home',
      order: 0
    }]
  },

  getTopbar() {
    return [{
      id: 'tb.refresh',
      label: 'Обновить',
      onClick: () => location.reload()
    }]
  }
}

export default DashboardModule
