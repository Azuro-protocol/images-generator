import path from 'path'

import { type Template, getFile, getBase64Image, downloadImage } from '../../utils'


const cardTypes = {
  'profit': {
    bg: 'images/profit.png',
    arrow: 'images/arrow-up.png',
    bgColor: '#72FF4B',
  },
  'loss': {
    bg: 'images/loss.png',
    arrow: 'images/arrow-down.png',
    bgColor: '#FF604B',
  }
}

export type Props = {
  trend: {
    image: string
    title: string
  }
  position: {
    leverage: number
    isLong: boolean
  }
  pnl: number
  referralUrl: string
}

const template: Template<Props> = {
  width: 670,
  height: 445,
  type: 'jpeg',
  html: async (props) => {
    const { trend, pnl, position, referralUrl } = props

    const isProfit = pnl > 0
    const { bg, arrow, bgColor } = isProfit ? cardTypes.profit : cardTypes.loss
    const { leverage, isLong } = position

    const html = getFile(path.join(__dirname, 'index.html'))

    const logo = getBase64Image(path.resolve(__dirname, 'images/logo.png'))
    const bgImage = getBase64Image(path.resolve(__dirname, bg))
    const arrowImage = getBase64Image(path.resolve(__dirname, arrow))

    const trendImage = await downloadImage(trend.image)

    const positionInfo = `${isLong ? ' Up' : ' Down'}, Boost x${leverage}`

    return html
      .replace('{logo}', logo)
      .replace('--card-bg-color', bgColor)
      .replace('{bgImage}', bgImage)
      .replace('{trendImage}', trendImage)
      .replace('{trendTitle}', trend.title)
      .replace('{positionInfo}', positionInfo)
      .replace('{arrowImage}', arrowImage)
      .replace('{refferalLink}', referralUrl)
      .replace('{pnl}', pnl > 0 ? `+${pnl}` : `${pnl}`)
  }
}

export default template
