const { generateImage } = require('../lib')
const template = require('../lib/templates/combo-bet-og')

generateImage({
  template,
  output: './test/images',
  filename: 'combo-bet-og',
  props: {
    title: 'Decentralized betting is awesome!',
    data: {
      totalOdds: 1.57,
      payout: 500,
      possiblePayout: 1017.17,
      asset: 'USDT',
    }
  },
})
