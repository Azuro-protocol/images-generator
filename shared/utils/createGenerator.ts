import puppeteer from 'puppeteer'


type Result<T> = T extends { output: string } ? void : (string | Buffer)

type CreateGeneratorProps<ImageProps> = {
  width: number
  height: number
  type: 'png' | 'jpeg'
  html: (props: ImageProps) => string | Promise<string>
  output?: string // output folder
}

type GeneratorProps<ImageProps> = {
  output?: string // output filepath
  filename?: string
  props: ImageProps
}

export const createGenerator = <ImageProps extends {}>(props: CreateGeneratorProps<ImageProps>) => {
  const { width, height, type, html: getHtml } = props

  return async <T extends GeneratorProps<ImageProps>>(props: T): Promise<Result<T> | undefined> => {
    const { output, filename = 'image', props: htmlProps } = props

    const html = await getHtml(htmlProps)

    const browser = await puppeteer.launch({
      headless: true,
      devtools: false,
      args: [
        '--no-sandbox',
        '--disable-gpu',
        '--disable-accelerated-video-decode',
      ],
    })

    const page = await browser.newPage()

    await page.setViewport({ width, height })
    await page.setContent(html)

    const content = await page.$('body')

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
