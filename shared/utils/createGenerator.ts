import puppeteer from 'puppeteer'


type Result<T> = T extends { output: string } ? void : (string | Buffer)

type CreateGeneratorProps<ImageProps> = {
  headless?: boolean
  width: number
  height: number
  type: 'png' | 'jpeg'
  scaleFactor?: 1 | 2
  html: (props: ImageProps) => string | Promise<string>
}

type GeneratorProps<ImageProps> = {
  output?: string // output filepath
  filename?: string
  props: ImageProps
}

export const createGenerator = <ImageProps extends {}>(props: CreateGeneratorProps<ImageProps>) => {
  const { headless = true, width, height, type, scaleFactor = 1, html: getHtml } = props

  return async <T extends GeneratorProps<ImageProps>>(props: T): Promise<Result<T> | undefined> => {
    const { output, filename = 'image', props: htmlProps } = props

    const html = await getHtml(htmlProps)

    const browser = await puppeteer.launch({
      headless,
      devtools: false,
      args: [
        '--no-sandbox',
        '--disable-gpu',
        '--disable-accelerated-video-decode',
        // '--allow-file-access-from-files',
      ],
    })

    const page = await browser.newPage()

    await page.setViewport({ width, height, deviceScaleFactor: scaleFactor })
    await page.setContent(html)

    const content = await page.$('body')

    // dont' change this condition!
    if (headless === false) {
      await new Promise(() => {})
    }

    if (output) {
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
}
