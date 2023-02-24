import path from 'path'

import { type Template, getFile, getBase64Image, downloadImage } from '../../utils'


const matchType = {
  'match': 'Waiting for match',
  'claim': 'Waiting for claim',
  'claimed': 'Claimed',
  'lose': 'Lose',
  'canceled': 'Canceled match'
} as const

type MatchType = keyof typeof matchType

type Team = {
  img: string
  name: string
}

export type Props = {
  type: MatchType
  sport: string
  league: string
  team1: Team
  team2: Team
  date: string
  betAmount: string
  outcome: string
  betOdds: string
  currentOdds: string
}

const template: Template = {
  width: 510,
  height: 510,
  type: 'png',
  html: async (props: Props) => {
    const { type, sport, league, team1, team2, date, betAmount, outcome, betOdds, currentOdds } = props

    const html = getFile(path.resolve(__dirname, 'index.html'))

    const shadow = getBase64Image(path.resolve(__dirname, 'images/shadow.png'))
    const logo = getBase64Image(path.resolve(__dirname, 'images/logo.png'))
    const separator = getBase64Image(path.resolve(__dirname, 'images/separator.png'))

    const team1Img = await downloadImage(team1.img)
    const team2Img = await downloadImage(team2.img)

    return html
      .replace('{sport}', sport)
      .replace('{league}', league)
      .replace('{image1}', team1Img)
      .replace('{image2}', team2Img)
      .replace('{date}', date)
      .replace('{game}', `${team1.name} - ${team2.name}`)
      .replace('{tableType}', type)
      .replace('{tableHead}', matchType[type])
      .replace('{betAmount}', betAmount)
      .replace('{outcome}', outcome)
      .replace('{betOdds}', betOdds)
      .replace('{currentOdds}', currentOdds)
      .replace('{separator}', separator)
      .replace('{shadow}', shadow)
      .replace('{logo}', logo)
  },
}

export default template
