import path from 'path'

import { type Template, getFile, getBase64Image } from '../../utils'


type OnlyOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>>
  & {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys]

export type Props = {
  title: string
  data: {
    totalOdds: string | number
    asset: string
  } & OnlyOne<{
    possiblePayout: string | number
    payout: string | number
  }>
}

const template: Template<Props> = {
  width: 600,
  height: 315,
  type: 'jpeg',
  scaleFactor: 2,
  html: async (props) => {
    const { title, data } = props
    const { totalOdds, possiblePayout, payout, asset } = data

    const html = getFile(path.resolve(__dirname, 'index.html'))

    const bgImage = getBase64Image(path.resolve(__dirname, 'images/bg.jpg'))
    const logoImage = getBase64Image(path.resolve(__dirname, 'images/logo.png'))

    return html
      .replace('{bgImage}', bgImage)
      .replace('{logoImage}', logoImage)
      .replace('{title}', title)
      .replace('{totalOdds}', String(totalOdds))
      .replace('{payoutValue}', String(payout || possiblePayout))
      .replace('{payoutLabel}', payout ? 'Winning' : 'Possible win')
      .replace('{asset}', asset)
      .replace('{assetIcon}', asset.toUpperCase())
  }
}

export default template
