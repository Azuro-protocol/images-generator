import { generateImage } from '../lib';
import template from '../lib/templates/trendle-trading';

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-loss-obama',
  props: {
    type: 'obama',
    trend: {
      image: 'https://content.azuro.org/a2527335-e967-4d23-857a-3de267feb4b1.png',
      title: 'Elon Musk',
    },
    position: {
      leverage: 2,
      isLong: true,
    },
    pnl: -48.5,
    referralUrl: 'app.trendle.fi/i/abc831'
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-loss-drake',
  props: {
    type: 'drake',
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

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-loss-crash',
  props: {
    type: 'crash',
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

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit-tramp',
  props: {
    type: 'tramp',
    trend: {
      image: 'https://content.azuro.org/a2527335-e967-4d23-857a-3de267feb4b1.png',
      title: 'Elon Musk',
    },
    position: {
      leverage: 5,
      isLong: false,
    },
    pnl: 13.1,
    referralUrl: 'app.trendle.fi/i/abc831'
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit-elon',
  props: {
    type: 'elon',
    trend: {
      image: 'https://content.azuro.org/a2527335-e967-4d23-857a-3de267feb4b1.png',
      title: 'Elon Musk',
    },
    position: {
      leverage: 5,
      isLong: false,
    },
    pnl: 13.1,
    referralUrl: 'app.trendle.fi/i/abc831'
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit-lewis',
  props: {
    type: 'lewis',
    trend: {
      image: 'https://content.azuro.org/a2527335-e967-4d23-857a-3de267feb4b1.png',
      title: 'Elon Musk',
    },
    position: {
      leverage: 5,
      isLong: false,
    },
    pnl: 13.1,
    referralUrl: 'app.trendle.fi/i/abc831'
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit-mark',
  props: {
    type: 'mark',
    trend: {
      image: 'https://content.azuro.org/a2527335-e967-4d23-857a-3de267feb4b1.png',
      title: 'Elon Musk',
    },
    position: {
      leverage: 5,
      isLong: false,
    },
    pnl: 13.1,
    referralUrl: 'app.trendle.fi/i/abc831'
  }
})
