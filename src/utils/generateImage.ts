import fs from 'fs'
import puppeteer from 'puppeteer'

import { type Template } from './types'


type PuppeteerOptions = Parameters<typeof puppeteer.launch>[0]

type PuppeteerInitialOptions = {
  headless: boolean
  devtools: boolean
  args: string[]
}

type GenerateImageProps<P> = {
  template: Template<P>
  output?: string // output filepath
  filename?: string
  props: P
  modifyPuppeteerOptions?(options: PuppeteerInitialOptions): PuppeteerOptions
}

export default async function generateImage<P>(props: GenerateImageProps<P>): Promise<Uint8Array | undefined> {
  const {
    output,
    filename = 'image',
    template,
    props: htmlProps,
    modifyPuppeteerOptions,
  } = props

  const {
    headless = true,
    width,
    height,
    type,
    scaleFactor = 1,
    html: getHtml,
  } = template

  const html = await getHtml(htmlProps)

  let launchOptions: PuppeteerOptions = {
    headless,
    devtools: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-accelerated-video-decode',
      '--disable-dev-shm-usage',
      '--disable-web-security',
      '--disable-plugins',
      '--disable-extensions',
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
      '--disable-backgrounding-occluded-windows',
      '--disable-breakpad',
      '--disable-component-extensions-with-background-pages',
      '--disable-features=TranslateUI',
      '--disable-ipc-flooding-protection',
      '--disable-hang-monitor',
      '--disable-prompt-on-repost',
      '--disable-sync',
      '--metrics-recording-only',
      '--no-first-run',
      '--safebrowsing-disable-auto-update',
      '--enable-automation',
      '--password-store=basic',
      '--use-mock-keychain',
    ],
  }

  if (typeof modifyPuppeteerOptions === 'function') {
    launchOptions = modifyPuppeteerOptions(launchOptions as PuppeteerInitialOptions)
  }

  const browser = await puppeteer.launch(launchOptions)
  const page = await browser.newPage()

  page.setDefaultNavigationTimeout(0)

  await page.setCacheEnabled(false);
  await page.setJavaScriptEnabled(true);

  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const resourceType = req.resourceType();
    
    // Block only truly unnecessary resources that don't affect rendering
    // Allow images, stylesheets, scripts, and data URLs
    if (['font', 'media', 'websocket', 'manifest', 'texttrack'].includes(resourceType)) {
      req.abort();
    }
    else {
      req.continue();
    }
  });

  await page.setViewport({
    width,
    height,
    deviceScaleFactor: scaleFactor,
  })

  await page.setContent(html, { waitUntil: 'domcontentloaded' })
  
  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready)

  const content = await page.$('body')

  // dont' change this condition!
  if (headless === false) {
    await new Promise(() => {})
  }

  if (output) {
    if (!fs.existsSync(output)) {
      fs.mkdirSync(output)
    }

    const filePath = `${output.replace(/\/$/, '')}/${filename.replace(/\..+$/, '')}.${type}`

    await content!.screenshot({ path: filePath, type, ...(type === 'jpeg' ? { quality: 85 } : {})})
    await page.close()
    await browser.close()
  }
  else {
    const imageBuffer = await content!.screenshot({ omitBackground: true, type, ...(type === 'jpeg' ? { quality: 85 } : {})})

    await page.close()
    await browser.close()

    return imageBuffer
  }
}
