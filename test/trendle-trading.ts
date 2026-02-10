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
      openLevel: 38.09,
      exitLevel: 40.00,
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
      openLevel: 38.09,
      exitLevel: undefined,
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
      openLevel: 38.09,
      exitLevel: undefined,
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
      openLevel: 38.09,
      exitLevel: undefined,
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
      openLevel: 38.09,
      exitLevel: undefined,
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
      openLevel: 38.09,
      exitLevel: undefined,
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
      openLevel: 38.09,
      exitLevel: undefined,
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
      openLevel: 38.09,
      exitLevel: undefined,
    },
    pnl: 13.1,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit-arnold',
  props: {
    type: 'arnold',
    trend: {
      image: "https://content.azuro.org/cc08578c-0334-4598-9d9d-15f8dc408e02.png",
      title: 'Artificial intelligence',
    },
    position: {
      leverage: 5,
      isLong: false,
      openLevel: 38.09,
      exitLevel: undefined,
    },
    pnl: 13.1,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit-elon-2',
  props: {
    type: 'elon-2',
    trend: {
      image: "https://content.azuro.org/cc08578c-0334-4598-9d9d-15f8dc408e02.png",
      title: 'Artificial intelligence',
    },
    position: {
      leverage: 5,
      isLong: false,
      openLevel: 38.09,
      exitLevel: undefined,
    },
    pnl: 13.1,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit-macron',
  props: {
    type: 'macron',
    trend: {
      image: "https://content.azuro.org/cc08578c-0334-4598-9d9d-15f8dc408e02.png",
      title: 'Artificial intelligence',
    },
    position: {
      leverage: 5,
      isLong: false,
      openLevel: 38.09,
      exitLevel: undefined,
    },
    pnl: 13.1,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit-person-1',
  props: {
    type: 'person-1',
    trend: {
      image: "https://content.azuro.org/cc08578c-0334-4598-9d9d-15f8dc408e02.png",
      title: 'Artificial intelligence',
    },
    position: {
      leverage: 5,
      isLong: false,
      openLevel: 38.09,
      exitLevel: undefined,
    },
    pnl: 13.1,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit-person-2',
  props: {
    type: 'person-2',
    trend: {
      image: "https://content.azuro.org/cc08578c-0334-4598-9d9d-15f8dc408e02.png",
      title: 'Artificial intelligence',
    },
    position: {
      leverage: 5,
      isLong: false,
      openLevel: 38.09,
      exitLevel: undefined,
    },
    pnl: 13.1,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit-powell',
  props: {
    type: 'powell',
    trend: {
      image: "https://content.azuro.org/cc08578c-0334-4598-9d9d-15f8dc408e02.png",
      title: 'Artificial intelligence',
    },
    position: {
      leverage: 5,
      isLong: false,
      openLevel: 38.09,
      exitLevel: undefined,
    },
    pnl: 13.1,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit-taylor',
  props: {
    type: 'taylor',
    trend: {
      image: "https://content.azuro.org/cc08578c-0334-4598-9d9d-15f8dc408e02.png",
      title: 'Artificial intelligence',
    },
    position: {
      leverage: 5,
      isLong: false,
      openLevel: 38.09,
      exitLevel: undefined,
    },
    pnl: 13.1,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-trading-profit-tramp-2',
  props: {
    type: 'tramp-2',
    trend: {
      image: "https://content.azuro.org/cc08578c-0334-4598-9d9d-15f8dc408e02.png",
      title: 'Artificial intelligence',
    },
    position: {
      leverage: 5,
      isLong: false,
      openLevel: 38.09,
      exitLevel: undefined,
    },
    pnl: 13.1,
  }
})
