export type Template<Props> = {
  headless?: boolean
  width: number
  height: number
  type: 'png' | 'jpeg'
  scaleFactor?: 1 | 2
  html: (props: Props) => string | Promise<string>
}
