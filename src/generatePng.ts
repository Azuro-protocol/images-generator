import fs, {readFileSync} from 'fs';
import puppeteer from 'puppeteer';
const locateChrome = require('locate-chrome');
import axios from 'axios';

const downloadImg = async (url: string) => {
  const response = await axios.get(url,  { responseType: 'arraybuffer' })
  const buffer = Buffer.from(response.data, "utf-8")  
  return `data:image/png;base64,${buffer.toString('base64')}`
}

const getImg = (path: string) => {
  return `data:image/png;base64,${
    readFileSync(__dirname + path).toString('base64')
  }`
}

type Team = {
  img: string
  name: string
}

type GeneratePng = {
  type: 'match' | 'claim' | 'claimed'
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

const matchType = {
  'match': 'Waiting for match',
  'claim': 'Waiting for claim',
  'claimed': 'Claimed',
} as const

const generatePng = async ({type, sport, league, team1, team2, date, betAmount, outcome, betOdds, currentOdds}: GeneratePng) => {
  try {
    let html = fs.readFileSync(__dirname + '/src/templates/card.html', 'utf8');
    let css = fs.readFileSync(__dirname + '/src/css/index.css', 'utf8');
    const shadow = getImg('/src/images/shadow.png')
    const logo = getImg('/src/images/logo.png')
    const separator = getImg('/src/images/separator.png')
    
    const team1Img = await downloadImg(team1.img);
    const team2Img = await downloadImg(team2.img);

    html = html
    .replace('.style{}', css)
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

    const executablePath: any = await new Promise(resolve => locateChrome((arg: any) => resolve(arg)));
    const browser = await puppeteer.launch({executablePath});
    const page = await browser.newPage();
    page.setViewport({
      width: 510,
      height: 510
    })

    await page.setContent(html);

    const content = await page.$("body");
    const imageBuffer = await content!.screenshot({ omitBackground: true, type: 'png' });

    await page.close();
    await browser.close();

    return imageBuffer
  } catch (error: any) {
    throw new Error(error)
  }
}

export type {GeneratePng};
export default generatePng;