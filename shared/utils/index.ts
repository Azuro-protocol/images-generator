import fs from 'fs'
import path from 'path'
import axios from 'axios'


export const getPath = (filePath: string) => {
  return path.join(__dirname, filePath)
}

export const getFile = (filePath: string) => {
  return fs.readFileSync(getPath(filePath), 'utf8')
}

export const getBase64Image = (filePath: string) => {
  return `data:image/png;base64,${fs.readFileSync(getPath(filePath)).toString('base64')}`
}

export const downloadImage = async (url: string) => {
  const response = await axios.get(url,  { responseType: 'arraybuffer' })
  const buffer = Buffer.from(response.data, 'utf-8')
  return `data:image/png;base64,${buffer.toString('base64')}`
}

export { createGenerator } from './createGenerator'
