import { generateImage } from '../lib';
import template from '../lib/templates/trendle-social';

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-social-business',
  props: {
    type: 'business',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhLrq4s4xwmnVwnLBDcBPH7CZY4SSto1DoDA&s',
    username: '@j0hnwang'
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-social-culture',
  props: {
    type: 'culture',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhLrq4s4xwmnVwnLBDcBPH7CZY4SSto1DoDA&s',
    username: '@j0hnwang'
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-social-crypto',
  props: {
    type: 'crypto',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhLrq4s4xwmnVwnLBDcBPH7CZY4SSto1DoDA&s',
    username: '@j0hnwang'
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-social-politics',
  props: {
    type: 'politics',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhLrq4s4xwmnVwnLBDcBPH7CZY4SSto1DoDA&s',
    username: '@j0hnwang'
  }
})

generateImage({
  template,
  output: './test/images',
  filename: 'trendle-social-fomo',
  props: {
    type: 'fomo',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhLrq4s4xwmnVwnLBDcBPH7CZY4SSto1DoDA&s',
    username: '@j0hnwang'
  }
})
