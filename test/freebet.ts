import { generateImage } from '../lib';
import template from '../lib/templates/freebet';

generateImage({
  template,
  output: './test/images',
  filename: 'freebet',
  props: {
    amount: '5 xDAI',
    date: '12.01.2022',
  },
})
