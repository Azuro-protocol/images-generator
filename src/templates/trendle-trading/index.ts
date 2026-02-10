import path from 'path'

import { type Template, getFile, getBase64Image, downloadImage } from '../../utils'


const cardTypes = {
  'profit': {
    rightImg: 'images/profit.png',
    bgColor: '#72FF4B',
  },
  'loss': {
    rightImg: 'images/loss.png',
    bgColor: '#FF604B',
  }
}

type Person = 'obama' | 'drake' | 'crash' | 'sydney' | 'tramp' | 'elon' | 'lewis' | 'mark' | 'powell' | 'macron' | 'arnold' | 'person-1' | 'tramp-2' | 'elon-2' | 'person-2' | 'taylor'
export type Props = {
  type: Person
  trend: {
    image: string
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
    const { type, trend, pnl, position } = props

    const isProfit = pnl > 0
    const { rightImg, bgColor } = isProfit ? cardTypes.profit : cardTypes.loss
    const { leverage, isLong, openLevel, exitLevel } = position

    const html = getFile(path.join(__dirname, 'index.html'))

    const logo = getBase64Image(path.resolve(__dirname, 'images/logo.png'))
    const bgImage = getBase64Image(path.resolve(__dirname, 'images/bg.png'))
    const rightImage = getBase64Image(path.resolve(__dirname, rightImg))
    const personImage = getBase64Image(path.resolve(__dirname, `images/${type}.png`))
    const arrowImage = getBase64Image(path.resolve(__dirname, isLong ? 'images/arrow-up.png' : 'images/arrow-down.png'))

    const trendImage = await downloadImage(trend.image)

    const positionInfo = `${isLong ? ' Up' : ' Down'}, Boost x${leverage}`

    return html
      .replace('{logo}', logo)
      .replace('--card-bg-color', bgColor)
      .replace('{bgImg}', bgImage)
      .replace('{rightImg}', rightImage)
      .replace('{personImg}', personImage)
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
