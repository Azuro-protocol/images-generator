import { generateImage } from '../lib';
import template from '../lib/templates/trendle-trading';

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-loss-obama',
  props: {
    type: 'obama',
    trend: {
      image: "https://content.azuro.org/cc08578c-0334-4598-9d9d-15f8dc408e02.png",
      title: 'Artificial intelligence',
    },
    position: {
      leverage: 2,
      isLong: true,
    },
    pnl: -48.5,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-loss-drake',
  props: {
    type: 'drake',
    trend: {
      image: "https://content.azuro.org/cc08578c-0334-4598-9d9d-15f8dc408e02.png",
      title: 'Artificial intelligence',
    },
    position: {
      leverage: 5,
      isLong: false,
    },
    pnl: -23.1,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-loss-crash',
  props: {
    type: 'crash',
    trend: {
      image: "https://content.azuro.org/cc08578c-0334-4598-9d9d-15f8dc408e02.png",
      title: 'Artificial intelligence',
    },
    position: {
      leverage: 5,
      isLong: false,
    },
    pnl: -23.1,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-loss-sydney',
  props: {
    type: 'sydney',
    trend: {
      image: "https://content.azuro.org/cc08578c-0334-4598-9d9d-15f8dc408e02.png",
      title: 'Artificial intelligence',
    },
    position: {
      leverage: 5,
      isLong: false,
    },
    pnl: -23.1,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit-tramp',
  props: {
    type: 'tramp',
    trend: {
      image: "https://content.azuro.org/cc08578c-0334-4598-9d9d-15f8dc408e02.png",
      title: 'Artificial intelligence',
    },
    position: {
      leverage: 5,
      isLong: false,
    },
    pnl: 13.1,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit-elon',
  props: {
    type: 'elon',
    trend: {
      image: "https://content.azuro.org/cc08578c-0334-4598-9d9d-15f8dc408e02.png",
      title: 'Artificial intelligence',
    },
    position: {
      leverage: 5,
      isLong: false,
    },
    pnl: 13.1,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit-lewis',
  props: {
    type: 'lewis',
    trend: {
      image: "https://content.azuro.org/cc08578c-0334-4598-9d9d-15f8dc408e02.png",
      title: 'Artificial intelligence',
    },
    position: {
      leverage: 5,
      isLong: false,
    },
    pnl: 13.1,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit-mark',
  props: {
    type: 'mark',
    trend: {
      image: "https://content.azuro.org/cc08578c-0334-4598-9d9d-15f8dc408e02.png",
      title: 'Artificial intelligence',
    },
    position: {
      leverage: 5,
      isLong: false,
    },
    pnl: 13.1,
  }
})
