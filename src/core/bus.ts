import mitt from 'mitt'
export const bus = mitt()
export const navigateTo = (path: string) => bus.emit('nav:to', path)
