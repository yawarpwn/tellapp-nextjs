import { NextRequest, NextResponse } from 'next/server'

import chromium from '@sparticuz/chromium'

export const CHROMIUM_EXECUTABLE_PATH =
  'https://github.com/Sparticuz/chromium/releases/download/v119.0.0/chromium-v119.0.0-pack.tar'

export const TAILWIND_CDN =
  'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'

export async function POST(request: NextRequest) {
  try {
    const label = await request.json()

    const ReactDOMServer = (await import('react-dom/server')).default
    const { LabelTemplate } = await import('@/components/label-template')
    const htmlTemplate = ReactDOMServer.renderToStaticMarkup(
      LabelTemplate({ label }),
    )

    let browser
    if (process.env.NODE_ENV === 'production') {
      const puppeteer = await import('puppeteer')
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(CHROMIUM_EXECUTABLE_PATH),
        headless: chromium.headless === 'shell' ? false : true,
      })
    } else if (process.env.NODE_ENV === 'development') {
      const puppeteer = await import('puppeteer')
      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: 'shell',
      })
    }

    if (!browser) throw new Error('No browser')

    console.log('browser version', await browser.version())

    const page = await browser.newPage()

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
