import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const POST = async (_req: NextRequest) => {
  try {
    //
    // const blob = await res.blob()
    //
    // const headers = new Headers()
    //
    // headers.set('Content-Type', 'image/*')
    //
    // // or just use new Response ❗️
    // return new NextResponse(blob, { status: 200, statusText: 'OK', headers })
    return new NextResponse(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
        statusText: 'Ok',
        headers: {
          quefuemano: 'richavo',
        },
      },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false })
  }
}
