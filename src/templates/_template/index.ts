import path from 'path'

import { type Template, getFile, getBase64Image, downloadImage } from '../../utils'


export type Props = {
  /* your props here */
}

const template: Template<Props> = {
  width: 800,
  height: 400,
  type: 'png',
  html: async (props) => {
    const { /* your props here */ } = props

    // all file paths should be joined with using __dirname!
    const html = getFile(path.join(__dirname, 'index.html'))

    return html
      .replace('{SOME_PROP}', 'SOME_VALUE')
  }
}

export default template
