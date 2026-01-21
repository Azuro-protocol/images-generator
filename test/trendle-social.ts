import { generateImage } from '../lib';
import template from '../lib/templates/trendle-social';

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-social-monad-1',
  props: {
    type: 'monad-1',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1961470943978487808/NmRlg5z7_normal.png',
    username: '@j0hnwang',
    isWide: false,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-social-monad-1-wide',
  props: {
    type: 'monad-1',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1961470943978487808/NmRlg5z7_normal.png',
    username: '@j0hnwang',
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-social-monad-2',
  props: {
    type: 'monad-2',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1961470943978487808/NmRlg5z7_normal.png',
    username: '@j0hnwang',
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-social-monad-3',
  props: {
    type: 'monad-3',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1961470943978487808/NmRlg5z7_normal.png',
    username: '@j0hnwang',
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-social-monad-4',
  props: {
    type: 'monad-4',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1961470943978487808/NmRlg5z7_normal.png',
    username: '@j0hnwang',
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-social-business-narrow',
  props: {
    type: 'business',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1961470943978487808/NmRlg5z7_normal.png',
    username: '@j0hnwang',
    isWide: false,
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-social-culture',
  props: {
    type: 'culture',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1961470943978487808/NmRlg5z7_normal.png',
    username: '@j0hnwang'
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-social-crypto',
  props: {
    type: 'crypto',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1961470943978487808/NmRlg5z7_normal.png',
    username: '@j0hnwang'
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-social-politics',
  props: {
    type: 'politics',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1961470943978487808/NmRlg5z7_normal.png',
    username: '@j0hnwang'
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-social-fomo',
  props: {
    type: 'fomo',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1961470943978487808/NmRlg5z7_normal.png',
    username: '@j0hnwang'
  }
})
