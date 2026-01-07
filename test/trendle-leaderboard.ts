import { generateImage } from '../lib';
import template from '../lib/templates/trendle-leaderboard';

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-leaderboard-black',
  props: {
    avatarUrl: 'https://pbs.twimg.com/profile_images/1961470943978487808/NmRlg5z7_normal.png',
    username: '@x_nickname',
    type: 'black',
    leaderboardType: 'pnl',
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-leaderboard-gold',
  props: {
    avatarUrl: 'https://pbs.twimg.com/profile_images/1961470943978487808/NmRlg5z7_normal.png',
    username: '@x_nickname',
    type: 'gold',
    leaderboardType: 'pnl',
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-leaderboard-silver',
  props: {
    avatarUrl: 'https://pbs.twimg.com/profile_images/1961470943978487808/NmRlg5z7_normal.png',
    username: '@x_nickname',
    type: 'silver',
    leaderboardType: 'pnl',
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-leaderboard-bronze',
  props: {
    avatarUrl: 'https://pbs.twimg.com/profile_images/1961470943978487808/NmRlg5z7_normal.png',
    username: '@x_nickname',
    type: 'bronze',
    leaderboardType: 'pnl',
  }
})
