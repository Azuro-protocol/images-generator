import fs from 'fs'
import axios from 'axios'


export const getFile = (filePath: string) => {
  return fs.readFileSync(filePath, 'utf8')
}

export const getBase64Image = (filePath: string) => {
  return `data:image/png;base64,${fs.readFileSync(filePath).toString('base64')}`
}

export const downloadImage = async (url: string) => {
  // empty pixel
  let base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

  try {
    const response = await axios.get(url,  { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data, 'utf-8')

    base64 = buffer.toString('base64')
  }
  catch (err) {
    console.error(err)
    // empty pixel

  }

  return `data:image/png;base64,${base64}`
}

export { type Template } from './types'
