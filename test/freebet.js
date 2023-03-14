const { generateImage } = require('../lib')
const template = require('../lib/templates/freebet')

generateImage({
  template,
  output: './test/images',
  filename: 'freebet',
  props: {
    amount: '5 xDAI',
    date: '12.01.2022',
  },
})
