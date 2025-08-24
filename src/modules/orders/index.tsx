import type { AppModule } from '@core/types'
import List from './screens/List'
import Details from './screens/Details'
import OrdersLayout from './Layout'
import { bus } from '@core/bus'

const OrdersModule: AppModule = {
  id: 'orders',
  title: 'Заказы',
  routeBase: '/orders',

  getRoutes() {
    return [
      { path: '', element: <List /> },
      { path: ':id', element: <Details /> },
      { path: 'new', element: <div className="p-4">Создание заказа (заглушка)</div> }
    ]
  },

  getLayout() { return OrdersLayout },

  getMenu() {
    return [{ id: 'menu.orders', label: 'Заказы', to: '/orders', icon: 'orders', order: 20 }]
  },

  getTopbar() {
    return [{
      id: 'orders.create',
      label: 'Новый заказ',
      onClick: () => bus.emit('nav:to', '/orders/new')
    }]
  }
}

export default OrdersModule
