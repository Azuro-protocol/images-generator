import { type Template, getFile, getBase64Image, downloadImage } from '../../utils'


export type Props = {

}

const template: Template = {
  width: 1000,
  height: 1000,
  type: 'png',
  html: (props: Props) => {
    const {  } = props

    let html = getFile('./index.html')
    let css = getFile('./index.css')

    return html.replace('.style{}', css)
  }
}

export default template
