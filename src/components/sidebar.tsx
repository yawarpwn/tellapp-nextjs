'use client'

import SignOutButton from '@/components/sign-out-button'
import { Button } from '@/components/ui/button'
import { NAVIGATION } from '@/constants'
import { cn } from '@/lib/utils'
import { XIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './logo'
interface Props {
  isOpen?: boolean
  onClose?: () => void
  onOpen?: () => void
}

export function Sidebar(props: Props) {
  const { isOpen = false, onClose } = props
  const pathname = usePathname()

  return (
    <aside
      style={{ scrollbarWidth: 'thin' }}
      className={cn(
        `
z-20 flex h-dvh w-full flex-col overflow-y-auto 
border-r border-r-[rgb(47_48_55)] bg-background text-sm md:w-[16.875rem]`,
      )}
    >
      <header className="mt-4 flex justify-between px-4 md:hidden">
        <Logo />
        <Button size="icon" onClick={onClose} className="size-9">
          <XIcon />
        </Button>
      </header>

      <div className="mt-4 hidden pl-5 md:block">
        <Logo />
      </div>
      <ul className="mb-1 flex flex-col pt-2 ">
        {NAVIGATION.map(({ href, title, icon: Icon }) => {
          const isAtive = pathname.startsWith(href)
          return (
            <li key={title}>
              <Link href={href} legacyBehavior>
                <a onClick={onClose} className="group my-2 flex">
                  <div
                    role="group"
                    className={cn(
                      'group flex w-full items-center gap-4 rounded-md py-3 pl-5 hover:bg-[rgb(27,28,32)] hover:text-white',
                      isAtive && 'bg-[rgb(27,28,32)] text-white',
                    )}
                  >
                    <Icon size={22} hasGradient={isAtive} />
                    <span>{title}</span>
                  </div>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
      <div className="separator"></div>
      <SignOutButton />
    </aside>
  )
}
