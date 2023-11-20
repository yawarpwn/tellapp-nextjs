import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAutorized = !!user
  const isHome = req.nextUrl.pathname === '/'
  const isLoginPath = req.nextUrl.pathname === '/login'

  console.log('Middleware --->', { isAutorized, isHome })
  if (isLoginPath && !isAutorized) {
    return res
  }

  if (isLoginPath && isAutorized) {
    return NextResponse.redirect(new URL('/quotations', req.url))
  }

  if (!isAutorized) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
