# @azuro-org/images-generator

## Usage

```typescript
import { generateImage } from '@azuro-org/images-generator';
import template, { type Props } from '@azuro-org/images-generator/lib/templates/bet-nft';

const props: Props = {
  type: 'match',
  sport: 'soccer',
  league: 'Leinster Senior League Senior Division',
  team1: {
    img: 'https://content.bookieratings.net/images/fq/tx/fqtxnf_20181001112329_100x100.png',
    name: 'Nizhny Novgorod'
  },
  team2: {
    img: 'https://content.bookieratings.net/images/fq/tx/fqtxnf_20181001112329_100x100.png',
    name: 'Lokomotiv Moscow'
  },
  date: '21.03.2022 8:00 UTC',
  betAmount: '100 USDC',
  outcome: 'Total Under(2.5)',
  betOdds: '2.88',
  currentOdds: '1.88'
}

// get image buffer
const buffer = generateImage({
  template,
  props,
})

// create image file
generateImage({
  template,
  props,
  output: './dist',
})
```

## Options

```typescript
type PuppeteerOptions = Parameters<typeof puppeteer.launch>[0]

type PuppeteerInitialOptions = {
  headless: boolean
  devtools: boolean
  args: string[]
}

generateImage({
  output?: string // output filepath
  filename?: string // default "image"
  props: any
  modifyPuppeteerOptions?(options: PuppeteerInitialOptions): PuppeteerOptions
})
```


# Contributing

## Add new template

1. Copy `templates/_template` to `templates/{your_template_name}`.
3. Use `index.html` for HTML. Write CSS in `index.html` file.
4. Create `templates/{your_template_name}/images` folder for images if required.


## Setup generator

Edit `{your_template_name}/index.ts` file:

```typescript
import path from 'path'

import { type Template, getFile, downloadImage, createGenerator } from '../../utils'

export type Props = {
  team1ImageSrc: string
  team2ImageSrc: string
  date: string
}

const template = {
  width: 800,
  height: 400,
  type: 'jpeg',
  html: async (props: Props) => {
    const { team1ImageSrc, team2ImageSrc, date } = props

    const html = getFile(path.join(__dirname, 'index.html'))

    const team1Img = await downloadImage(team1ImageSrc)
    const team2Img = await downloadImage(team2ImageSrc)

    return html
      .replace('{image1}', team1Img)
      .replace('{image2}', team2Img)
      .replace('{date}', date)
  },
}

export default template
```

## Publish

Publish npm package with `npm run publish`. For access to `@azuro-org` scope ask Pavel Ivanov or Stas Onatskiy.
