const generateImage = require('../lib').default

generateImage({
  output: './',
  filename: 'test-image',
  props: {
    type: 'match',
    sport: 'Football',
    league: 'International Tournaments · FIFA - World Cup',
    team1: {
      img: 'https://content.bookmaker.xyz/avatars/provider-3/4757.png',
      name: 'Ecuador',
    },
    team2: {
      img: 'https://content.bookmaker.xyz/avatars/provider-3/4739.png',
      name: 'Senegal',
    },
    date: 'Dec 24, 2020',
    betAmount: '100 xDAI',
    outcome: 'Senegal',
    betOdds: '1.7',
    currentOdds: '1.2',
  },
})
