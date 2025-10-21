import { generateImage } from '../lib';
import template from '../lib/templates/trendle-trading';

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit',
  props: {
    trend: {
      image: 'https://content.azuro.org/a2527335-e967-4d23-857a-3de267feb4b1.png',
      title: 'Elon Musk',
    },
    position: {
      leverage: 2,
      isLong: true,
    },
    pnl: 48.5,
    referralUrl: 'app.trendle.fi/i/abc831'
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-loss',
  props: {
    trend: {
      image: 'https://content.azuro.org/a2527335-e967-4d23-857a-3de267feb4b1.png',
      title: 'Elon Musk',
    },
    position: {
      leverage: 5,
      isLong: false,
    },
    pnl: -23.1,
    referralUrl: 'app.trendle.fi/i/abc831'
  }
})
