import { NextRequest, NextResponse } from 'next/server'

import { LabelTemplate } from '@/components/label-template'
import { chromium } from 'playwright'

export const CHROMIUM_EXECUTABLE_PATH =
  'https://github.com/Sparticuz/chromium/releases/download/v119.0.0/chromium-v119.0.0-pack.tar'

export const TAILWIND_CDN =
  'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'

export async function POST(request: NextRequest) {
  try {
    const ReactDOMServer = (await import('react-dom/server')).default

    let browser

    if (process.env.NODE_ENV === 'development') {
      browser = await chromium.launch()
    } else if (process.env.NODE_ENV === 'production') {
      const executablePath = chromium.executablePath()
      browser = await chromium.launch({
        executablePath,
      })
    }

    if (!browser) {
      throw new Error('No browser')
    }

    const page = await browser.newPage()

    const label = await request.json()

    const { LabelTemplate } = await import('@/components/label-template')
    const htmlTemplate = ReactDOMServer.renderToStaticMarkup(
      LabelTemplate({ label }),
    )

    await page.setContent(htmlTemplate)

    // Generate Pdf
    const pdfBuffer = await page.pdf({
      format: 'a4',
    })

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
      },
    })
  } catch (error) {
    return NextResponse.json({ ok: false })
  }
}
