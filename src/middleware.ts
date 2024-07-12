// import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware'

export async function middleware(req: NextRequest) {
  // Create a Supabase client configured to use cookies
  // const { supabase, response } = createMiddlewareClient(req)
  const { supabase, response } = createMiddlewareClient(req)

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()

  return response
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * Feel free to modify this pattern to include more paths.
   */
  matcher: ['/((?!api|_next/static|api/send-mail|_next/image|favicon.ico).*)'],
}
