import path from 'path'

import { type Template, getFile, getBase64Image, downloadImage } from '../../utils'


const cardTypes = {
  'business': {
    bottomImg: 'images/business.png',
    bgImg: 'images/bg-business.png',
  },
  'culture': {
    bottomImg: 'images/culture.png',
    bgImg: 'images/bg-culture.png',
  },
  'crypto': {
    bottomImg: 'images/crypto.png',
    bgImg: 'images/bg-crypto.png',
  },
  'politics': {
    bottomImg: 'images/politics.png',
    bgImg: 'images/bg-politics.png',
  },
  'fomo': {
    bottomImg: 'images/fomo.png',
    bgImg: 'images/bg-fomo.png',
  },
} as const

export type Props = {
  type: keyof typeof cardTypes
  avatarUrl: string
  username: string
  isWide?: boolean
}

// 2020

const template: Template<Props> = {
  width: 850,
  height: 1060,
  type: 'jpeg',
  html: async (props) => {
    const { type, avatarUrl, username, isWide = true } = props
    const { bottomImg, bgImg } = cardTypes[type]

    const html = getFile(path.join(__dirname, 'index.html'))

    const stampImage = getBase64Image(path.resolve(__dirname, 'images/stamp.png'))
    const bottomImage = getBase64Image(path.resolve(__dirname, bottomImg))
    const bgImage = getBase64Image(path.resolve(__dirname, bgImg))

    const avatarImage = await downloadImage(avatarUrl)

    return html
      .replace('--wrapper-width', `${isWide ? 2020 : 850}px`)
      .replace('{bgImg}', bgImage)
      .replace('{wrapperImg}', bottomImage)
      .replace('{bottomImg}', bottomImage)
      .replace('{stampImg}', stampImage)
      .replace('{avatar}', avatarImage)
      .replace('{username}', username)
  }
}

export default template
