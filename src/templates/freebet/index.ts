import path from 'path'

import { type Template, getFile, getBase64Image } from '../../utils'


export type Props = {
  amount: number | string
  date: string
}

const template: Template = {
  width: 416,
  height: 250,
  type: 'png',
  scaleFactor: 2,
  html: async (props: Props) => {
    const { amount, date } = props

    const html = getFile(path.resolve(__dirname, 'index.html'))
    const bgImage = getBase64Image(path.resolve(__dirname, 'images/bg.png'))

    return html
      .replace('{bgImage}', bgImage)
      .replace('{amount}', String(amount))
      .replace('{date}', date)
  }
}

export default template
