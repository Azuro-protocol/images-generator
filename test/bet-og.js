const { generateImage } = require('../lib')
const template = require('../lib/templates/bet-og')

generateImage({
  template,
  output: './test/images',
  filename: 'bet-og',
  props: {
    title: 'Decentralized betting is awesome!',
    game: {
      country: 'International Tournaments',
      league: 'ESL Challenger League North America',
      participants: [
        {
          name: 'WINDINGO',
          image: 'https://content.bookmaker.xyz/avatars/provider-3/4757.png',
        },
        {
          name: 'Los Grandes Academy',
          image: 'https://content.bookmaker.xyz/avatars/provider-3/4739.png',
        },
      ],
      startsAt: Date.now(),
    }
  },
})
