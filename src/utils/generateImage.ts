import fs from 'fs'
import puppeteer from 'puppeteer'

import { type Template } from './types'


type PuppeteerOptions = Parameters<typeof puppeteer.launch>[0]

type PuppeteerInitialOptions = {
  headless: boolean
  devtools: boolean
  args: string[]
}

type GenerateImageResult<T> = T extends { output: string } ? void : (string | Buffer)

type GenerateImageProps = {
  template: Template
  output?: string // output filepath
  filename?: string
  props: any
  modifyPuppeteerOptions?(options: PuppeteerInitialOptions): PuppeteerOptions
}

export default async function generateImage<T extends GenerateImageProps>(props: T): Promise<GenerateImageResult<T> | undefined> {
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
      '--disable-gpu',
      '--disable-accelerated-video-decode',
      // '--allow-file-access-from-files',
    ],
  }

  if (typeof modifyPuppeteerOptions === 'function') {
    launchOptions = modifyPuppeteerOptions(launchOptions as PuppeteerInitialOptions)
  }

  const browser = await puppeteer.launch(launchOptions)
  const page = await browser.newPage()

  await page.setViewport({
    width,
    height,
    deviceScaleFactor: scaleFactor,
  })

  await page.goto(`data:text/html;charset=UTF-8,${encodeURIComponent(html)}`, {
    waitUntil: 'networkidle0',
  })

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

    await content!.screenshot({ path: filePath })
    await page.close()
    await browser.close()
  }
  else {
    const imageBuffer = await content!.screenshot({ omitBackground: true, type })

    await page.close()
    await browser.close()

    // @ts-ignore
    return imageBuffer
  }
}
