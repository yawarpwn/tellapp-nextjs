import React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import Link from 'next/link'

type Props = {
  breadcrumbs: {
    label: string
    href?: string
    active?: boolean
  }[]
}
export function Breadcrumbs({ breadcrumbs }: Props) {
  return (
    <Breadcrumb className="breadcrumbs  text-sm">
      <BreadcrumbList>
        {breadcrumbs.map(({ label, href, active }, index) =>
          href ? (
            <BreadcrumbItem key={href} aria-current={active}>
              <span>{label}</span>
            </BreadcrumbItem>
          ) : (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbPage>{label}</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
