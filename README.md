## How to add a new package

1. Copy `packages/_template` to `packages/` and rename it to your package name.
2. Change package "name" field in `package.json` file.
3. Use `index.css` for CSS.
4. Use `index.html` for HTML.
5. Create `src/images` folder for images if required.
6. Write test in `src/test/index.js` and run `npm run test` to check that generator doing what it should.
7. Publish npm package `npm run publish`. For access to `@azuro-protocol` scope ask Pavel Ivanov or Stas Onatskiy.

## Usage

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

## Test

Update `/test/index.js` file:

```
const generateImage = require('../lib').default

generateImage({
  output: './',
  filename: 'test-image',
  props: {

  },
})
```
