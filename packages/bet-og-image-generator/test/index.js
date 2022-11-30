const generateImage = require('../lib').default

generateImage({
  output: './',
  filename: 'test-image',
  props: {
    title: 'Decentralized betting is awesome!',
    game: {
      country: 'International',
      league: 'FIFA World Cup',
      participants: [
        {
          name: 'Ecuador',
          image: 'https://content.bookmaker.xyz/avatars/provider-3/4757.png',
        },
        {
          name: 'Senegal',
          image: 'https://content.bookmaker.xyz/avatars/provider-3/4739.png',
        },
      ],
      startsAt: Date.now(),
    }
  },
})
