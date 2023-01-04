> This readme is for Developers only.

## Current packages

[@azuro-protocol/nft-image-generator](https://www.npmjs.com/package/@azuro-protocol/nft-image-generator)
[@azuro-protocol/bet-og-image-generator](https://www.npmjs.com/package/@azuro-protocol/bet-og-image-generator)


## Add new package

1. Copy `packages/_template` to `packages/` and rename it to your package name.
2. Change package `"name"` and `"homepage"` fields in `package.json` file.
3. Use `index.css` for CSS.
4. Use `index.html` for HTML.
5. Create `src/images` folder for images if required.


## Setup generator

Edit `src/index.ts` file:

```typescript
import { getFile, downloadImage, createGenerator } from '../../../shared/utils'

export type Props = {
  team1ImageSrc: string
  team2ImageSrc: string
  date: string
}

export default createGenerator<Props>({
  width: 800,
  height: 400,
  type: 'jpeg',
  html: async (props) => {
    const { team1ImageSrc, team2ImageSrc, date } = props

    let html = getFile('./index.html')
    let css = getFile('./index.css')

    const team1Img = await downloadImage(team1ImageSrc)
    const team2Img = await downloadImage(team2ImageSrc)

    return html
      .replace('.style{}', css)
      .replace('{image1}', team1Img)
      .replace('{image2}', team2Img)
      .replace('{date}', date)
  },
})
```


## `createGenerator` options

`type: 'png' | 'jpeg'`<br /><br />
`headless: Boolean` - use true to see compiled html in browser<br /><br />
`scaleFactor: 1 | 2` - use 2 if you need to generate x2 sized image


## Write tests

Edit `test/index.js` file.


## Dev, build and test

There are `dev`, `build` and `test` scripts in package folder.


## Publish

Publish npm package with `npm run publish`. For access to `@azuro-protocol` scope ask Pavel Ivanov or Stas Onatskiy.
