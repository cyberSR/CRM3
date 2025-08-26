"use client"

import * as React from "react"
import type { ComponentType, SVGProps } from "react"
import { Circle } from "lucide-react"
import dynamicIconImports from "lucide-react/dynamicIconImports"

type IconLike = string | ComponentType<any> | undefined

type Props = Omit<SVGProps<SVGSVGElement>, "ref"> & {
  icon?: IconLike
  className?: string
}

/**
 * Универсальная иконка: принимает строку из БД ("HomeIcon", "Settings2") или готовый компонент.
 */
export function Icon({ icon, className, ...rest }: Props) {
  if (!icon) return null

  // Если передан компонент напрямую
  if (typeof icon === "function") {
    const Cmp = icon
    return <Cmp className={className ?? "h-4 w-4"} {...rest} />
  }

  // Если строка — загружаем динамически из lucide-react
  const importFn =
    (dynamicIconImports as any)[icon] ||
    (dynamicIconImports as any)[icon + "Icon"]

  if (!importFn) {
    return <Circle className={className ?? "h-4 w-4"} {...rest} />
  }

  const LucideIcon = React.lazy(importFn)
  return (
    <React.Suspense fallback={<Circle className={className ?? "h-4 w-4"} />}>
      <LucideIcon className={className ?? "h-4 w-4"} {...rest} />
    </React.Suspense>
  )
}
