import { Logo } from '@/components/logo'
import { MobileMenu } from '@/components/mobile-menu'
import { Sidebar } from '@/components/sidebar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

async function LayoutDashboar({ children }: { children: React.ReactNode }) {
  const authToken = cookies().get('auth-token')
  if (!authToken) redirect('/')
  return (
    <>
      {/* Root */}
      <div className="grid grid-cols-1 md:grid-cols-[16.875rem,auto]">
        {/* Sidebar */}
        <div className="">
          <div className="top-0 h-16 [position:unset] md:sticky ">
            <header
              id="sidebar-mobile"
              className="bg-base-100 absolute z-10 flex  h-auto w-full justify-between px-6 py-4 md:hidden "
            >
              <Logo />
              <MobileMenu />
            </header>
            <div className="hidden md:block">
              <Sidebar />
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="mt-4 min-w-full max-w-[100vw]">
          <main className="px-4 xl:px-28">{children}</main>
          <footer className="h-4"></footer>
        </div>
        {/* Main Content */}
      </div>
    </>
  )
}

export default LayoutDashboar
