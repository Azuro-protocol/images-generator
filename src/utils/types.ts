export type Template = {
  headless?: boolean
  width: number
  height: number
  type: 'png' | 'jpeg'
  scaleFactor?: 1 | 2
  html: (props: any) => string | Promise<string>
}
