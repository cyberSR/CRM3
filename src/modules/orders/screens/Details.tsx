import React from 'react'
import { useParams } from 'react-router-dom'
export default function Details() {
  const { id } = useParams()
  return (
    <div className="p-4">
      <div className="text-lg font-semibold">Заказ #{id}</div>
      <div className="text-sm text-gray-500">Здесь будут данные заказа…</div>
    </div>
  )
}
