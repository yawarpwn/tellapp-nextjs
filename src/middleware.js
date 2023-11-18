import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAutorized = user?.email === 'neyda.mili11@gmail.com'

  // if user is signed in and the current path is / redirect the user to /account
  if (isAutorized && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/quotations', req.url))
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!isAutorized && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/',
    '/quotations',
    '/products',
    '/customers',
    '/labels',
    '/agencies',
  ],
}
