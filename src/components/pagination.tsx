'use client'
import { buttonVariants } from '@/components/ui/button'
import { generatePagination } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page') || 1)
  const allPages = generatePagination(currentPage, totalPages)

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <PaginationArrow
        href={createPageURL(currentPage - 1)}
        direction="left"
        isDisabled={currentPage <= 1}
      />
      <div className="flex items-center gap-2">
        {allPages.map((page, index) => {
          let position

          if (index === 0) position = 'first'
          if (index === allPages.length - 1) position = 'last'
          if (allPages.length === 1) position = 'single'
          if (page === '...') position = 'middle'

          return (
            <PaginationNumber
              key={page}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={page === currentPage}
            />
          )
        })}
      </div>
      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  )
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string
  direction: 'left' | 'right'
  isDisabled: boolean
}) {
  const icon = direction === 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />

  return isDisabled ? (
    <div>{icon}</div>
  ) : (
    <Link href={href} className={cn(buttonVariants({ size: 'icon' }))}>
      {icon}
    </Link>
  )
}

function PaginationNumber({
  isActive,
  href,
  position,
  page,
}: {
  isActive: boolean
  href: string
  position?: 'first' | 'last' | 'middle' | 'single'
  page: number | string
}) {
  if (isActive) {
    return (
      <div className={cn(buttonVariants({ variant: 'primary' }), 'h-8 w-8 rounded-full px-0')}>
        {page}
      </div>
    )
  }

  if (position === 'middle') {
    return <div className={cn('inline-flex h-8 w-8 justify-center rounded-full px-0')}>{page}</div>
  }

  return (
    <Link className={cn(buttonVariants({ size: 'icon' }), 'h-8 w-8 rounded-full px-0')} href={href}>
      {page}
    </Link>
  )
}

export default Pagination
