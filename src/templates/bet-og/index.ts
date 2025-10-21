import path from 'path'
import dayjs from 'dayjs'

import { type Template, getFile, getBase64Image } from '../../utils'


export type Props = {
  title: string
  game: {
    country: string
    league: string
    participants: {
      name: string
      image: string
    }[]
    startsAt: number
  }
}

const template: Template<Props> = {
  width: 600,
  height: 315,
  type: 'jpeg',
  scaleFactor: 2,
  html: async (props) => {
    const { title, game } = props
    const { country, league, participants, startsAt } = game

    const html = getFile(path.resolve(__dirname, 'index.html'))

    const bgImage = getBase64Image(path.resolve(__dirname, 'images/bg.jpg'))
    const logoImage = getBase64Image(path.resolve(__dirname, 'images/logo.png'))

    const team1Image = participants[0].image
    const team1Name = participants[0].name
    const team2Image = participants[1].image
    const team2Name = participants[1].name

    const dateTime = dayjs(startsAt)
    const date = dateTime.format('DD MMM')
    const time = dateTime.format('HH:mm')

    return html
      .replace('{bgImage}', bgImage)
      .replace('{logoImage}', logoImage)
      .replace('{title}', title)
      .replace('{country}', country)
      .replace('{league}', league)
      .replace('{team1Image}', team1Image)
      .replace('{team1Name}', team1Name)
      .replace('{team2Image}', team2Image)
      .replace('{team2Name}', team2Name)
      .replace('{date}', date)
      .replace('{time}', time)
  }
}

export default template
