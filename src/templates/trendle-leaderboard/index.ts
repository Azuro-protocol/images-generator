import path from 'path'

import { type Template, getFile, getBase64Image, downloadImage } from '../../utils'

const textByType = {
  pnlPercent: 'PnL%',
  pnl: 'PnL$',
  consistencyScore: 'consistency score'
} as const

type LeaderboardType = keyof typeof textByType

const cardTypes = {
  'black': {
    bgImg: 'images/black.png',
    wideImg: 'images/black-wide.png',
    title: '0.1%',
    subtitle: 'Top of Trendle traders <br> by ',
    color: 'black',
    additionalClassName: 'black'
  },
  'gold': {
    bgImg: 'images/gold.png',
    wideImg: 'images/gold-wide.png',
    title: 'Top 1%',
    subtitle: 'of Trendle traders <br> by ',
    color: '#00000099',
    additionalClassName: 'gold'
  },
  'silver': {
    bgImg: 'images/silver.png',
    wideImg: 'images/silver-wide.png',
    title: 'Top 3%',
    subtitle: 'of Trendle traders <br> by ',
    color: '#00000099',
    additionalClassName: 'silver'
  },
  'bronze': {
    bgImg: 'images/bronze.png',
    wideImg: 'images/bronze-wide.png',
    title: 'Top 10%',
    subtitle: 'of Trendle traders <br> by ',
    color: '#00000099',
    additionalClassName: 'bronze'
  },
} as const

export type Props = {
  type: keyof typeof cardTypes
  leaderboardType: LeaderboardType
  avatarUrl: string | 'mock'
  username: string
  isWide?: boolean
}

// 2020

const template: Template<Props> = {
  width: 850,
  height: 1060,
  type: 'jpeg',
  html: async (props) => {
    const { type, leaderboardType, avatarUrl, username, isWide = true } = props
    const { bgImg, wideImg, title, subtitle, color, additionalClassName } = cardTypes[type]

    const html = getFile(path.join(__dirname, 'index.html'))
    const bgImage = getBase64Image(path.resolve(__dirname, bgImg))
    const wideImage = getBase64Image(path.resolve(__dirname, wideImg))

    let avatarImage = ''

    if (avatarUrl === 'mock') {
      avatarImage = getBase64Image(path.resolve(__dirname, 'images/avatar.png'))
    }
    else {
      avatarImage = await downloadImage(avatarUrl)
    }

    return html
      .replace('--wrapper-width', `${isWide ? 2020 : 850}px`)
      .replace('{wrapperImg}', wideImage)
      .replace('--color', color)
      .replace('{additionalClassName}', additionalClassName)
      .replace('{bgImg}', bgImage)
      .replace('{avatar}', avatarImage)
      .replace('{username}', username)
      .replace('{title}', title)
      .replace('{subtitle}', subtitle + textByType[leaderboardType])
  }
}

export default template
