import { NextRequest, NextResponse } from 'next/server'

import { LabelTemplate } from '@/components/label-template'
import { chromium } from '@playwright/test'

export async function POST(request: NextRequest) {
  try {
    const ReactDOMServer = (await import('react-dom/server')).default
    const browser = await chromium.launch()
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
