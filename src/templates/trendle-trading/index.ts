import path from 'path'

import { type Template, getFile, getBase64Image, downloadImage } from '../../utils'


const cardTypes = {
  'profit': {
    bgColor: '#72FF4B',
  },
  'loss': {
    bgColor: '#FF604B',
  }
}

export type Props = {
  trend: {
    image: string | undefined
    title: string
  }
  position: {
    leverage: number
    isLong: boolean
    openLevel: number
    exitLevel: number | undefined
  }
  pnl: number
}

const template: Template<Props> = {
  width: 1200,
  height: 630,
  type: 'jpeg',
  html: async (props) => {
    const { trend, pnl, position } = props

    const isProfit = pnl > 0
    const { bgColor } = isProfit ? cardTypes.profit : cardTypes.loss
    const { leverage, isLong, openLevel, exitLevel } = position

    const html = getFile(path.join(__dirname, 'index.html'))

    const logo = getBase64Image(path.resolve(__dirname, 'images/logo.png'))
    const arrowImage = getBase64Image(path.resolve(__dirname, isLong ? 'images/arrow-up.png' : 'images/arrow-down.png'))

    const trendImage = trend.image ? await downloadImage(trend.image) : getBase64Image(path.resolve(__dirname, 'images/default.png'))

    const positionInfo = `${isLong ? ' Up' : ' Down'}, Boost x${leverage}`

    return html
      .replace('{logo}', logo)
      .replace('--card-bg-color', bgColor)
      .replace('{personImg}', trendImage)
      .replace('{trendImage}', trendImage)
      .replace('{trendTitle}', trend.title)
      .replace('{positionInfo}', positionInfo)
      .replace('{arrowImage}', arrowImage)
      .replace('{pnl}', pnl > 0 ? `+${pnl}` : `${pnl}`)
      .replace('{openLevel}', String(openLevel))
      .replace('{exitLevel}', String(exitLevel || ''))
      .replace('{exitLevelClass}', exitLevel ? '' : 'none')
  }
}

export default template
