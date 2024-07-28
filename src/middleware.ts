import { NextRequest, NextResponse } from 'next/server'
export async function middleware(req: NextRequest) {
  const authToken = req.cookies.get('auth-token')
  const { pathname } = req.nextUrl

  if (!authToken && pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (authToken && pathname === '/') {
    return NextResponse.redirect(new URL('/new-quos', req.url))
  }
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * Feel free to modify this pattern to include more paths.
   */
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|collage-johneyder.avif).*)',
  ],
}
