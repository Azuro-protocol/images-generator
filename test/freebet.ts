import { Generator } from '../lib';
import template from '../lib/templates/freebet';

const generator = new Generator()

generator.run().then(() => {
  return Promise.all([
    generator.generate({
      template,
      output: './test/images',
      filename: 'freebet',
      props: {
        amount: '5 xDAI',
        date: '12.01.2022',
      },
    })
  ]).finally(() => {
    generator.shutdown()
  })
})
