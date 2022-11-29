import { getFile, getBase64Image, downloadImage, createGenerator } from '../../../shared/utils'


export type Props = {

}

export default createGenerator<Props>({
  width: 1000,
  height: 1000,
  type: 'png',
  html: (props: Props) => {
    const {  } = props

    let html = getFile('./index.html')
    let css = getFile('./index.css')

    return html.replace('.style{}', css)
  }
})
