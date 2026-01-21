import path from 'path'

import { type Template, getFile, getBase64Image, downloadImage } from '../../utils'


const cardTypes = {
  'business': {
    bottomImg: 'images/business.png',
    bgImg: 'images/bg-business.png',
    stampImg: 'images/stamp.png',
    additionalClassName: ''
  },
  'culture': {
    bottomImg: 'images/culture.png',
    bgImg: 'images/bg-culture.png',
    stampImg: 'images/stamp.png',
    additionalClassName: ''
  },
  'crypto': {
    bottomImg: 'images/crypto.png',
    bgImg: 'images/bg-crypto.png',
    stampImg: 'images/stamp.png',
    additionalClassName: ''
  },
  'politics': {
    bottomImg: 'images/politics.png',
    bgImg: 'images/bg-politics.png',
    stampImg: 'images/stamp.png',
    additionalClassName: ''
  },
  'fomo': {
    bottomImg: 'images/fomo.png',
    bgImg: 'images/bg-fomo.png',
    stampImg: 'images/stamp.png',
    additionalClassName: ''
  },
  'monad-1': {
    bottomImg: 'images/monad-1.png',
    bgImg: 'images/bg-monad-1.png',
    stampImg: 'images/stamp-monad.png',
    additionalClassName: 'monad'
  },
  'monad-2': {
    bottomImg: 'images/monad-2.png',
    bgImg: 'images/bg-monad-2.png',
    stampImg: 'images/stamp-monad.png',
    additionalClassName: 'monad'
  },
  'monad-3': {
    bottomImg: 'images/monad-3.png',
    bgImg: 'images/bg-monad-3.png',
    stampImg: 'images/stamp-monad.png',
    additionalClassName: 'monad'
  },
  'monad-4': {
    bottomImg: null,
    bgImg: 'images/bg-monad-1.png',
    stampImg: 'images/stamp-monad.png',
    additionalClassName: 'monad'
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
    const { bottomImg, bgImg, stampImg, additionalClassName } = cardTypes[type]

    const html = getFile(path.join(__dirname, 'index.html'))

    let bottomImage = ''
    const stampImage = getBase64Image(path.resolve(__dirname, stampImg))
    const bgImage = getBase64Image(path.resolve(__dirname, bgImg))

    if (bottomImg) {
      bottomImage = getBase64Image(path.resolve(__dirname, bottomImg))
    }

    const avatarImage = await downloadImage(avatarUrl)

    return html
      .replace('--wrapper-width', `${isWide ? 2020 : 850}px`)
      .replace('{additionalClassName}', additionalClassName)
      .replace('{bgImg}', bgImage)
      .replace('{wrapperImg}', bottomImage)
      .replace('{bottomImg}', bottomImage)
      .replace('{stampImg}', stampImage)
      .replace('{avatar}', avatarImage)
      .replace('{username}', username)
  }
}

export default template
