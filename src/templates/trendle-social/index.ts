import path from 'path'

import { type Template, getFile, getBase64Image, downloadImage } from '../../utils'


const cardTypes = {
  'business': {
    title: 'Long chaos,</br> short compliance',
    bottomImg: 'images/business.png',
    bgColor: '#DEFF4B'
  },
  'culture': {
    title: 'Trendlines?</br> I trade punchlines',
    bottomImg: 'images/culture.png',
    bgColor: '#4BFF51'
  },
  'crypto': {
    title: 'The Market</br> Whisperer',
    bottomImg: 'images/crypto.png',
    bgColor: '#FF5188'
  },
  'politics': {
    title: 'The Geopolitical</br> Degen',
    bottomImg: 'images/politics.png',
    bgColor: '#51C2FF'
  },
  'fomo': {
    title: 'FOMO Forward',
    bottomImg: 'images/fomo.png',
    bgColor: '#D951FF'
  },
} as const

export type Props = {
  type: keyof typeof cardTypes
  avatarUrl: string
  username: string
}

const template: Template<Props> = {
  width: 850,
  height: 1060,
  type: 'jpeg',
  html: async (props) => {
    const { type, avatarUrl, username } = props
    const { bottomImg, title, bgColor } = cardTypes[type]

    const html = getFile(path.join(__dirname, 'index.html'))

    const logo = getBase64Image(path.resolve(__dirname, 'images/logo.png'))
    const bgImage = getBase64Image(path.resolve(__dirname, 'images/bg.png'))
    const bottomImage = getBase64Image(path.resolve(__dirname, bottomImg))

    const avatarImage = await downloadImage(avatarUrl)

    return html
      .replace('{title}', title)
      .replace('{logo}', logo)
      .replace('{bgImg}', bgImage)
      .replace('{bottomImg}', bottomImage)
      .replace('{avatar}', avatarImage)
      .replace('{username}', username)
      .replace('--card-bg-color', bgColor)
  }
}

export default template
