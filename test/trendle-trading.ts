import { Generator } from '../lib';
import template from '../lib/templates/trendle-trading';

const generator = new Generator()
generator.run().then(() => {
  return Promise.all([
    generator.generate({
      template,
      output: './test/images',
      filename: 'trendle-trading-loss-obama',
      props: {
        accountAddress: '0xd5d8F89ab472d0cF0218549194af5Fe0c9A63cD5',
        trend: {
          image: "https://content.trendle.fi/f86cfe79-e991-4046-bdfd-01eed76a22c2.png",
          title: 'Artificial intelligence',
        },
        position: {
          leverage: 2,
          isLong: true,
          openLevel: '38.09',
          exitLevel: '40.00',
        },
        pnl: 48.5,
      }
    }),
    generator.generate({
      template,
      output: './test/images',
      filename: 'trendle-trading-loss-obama-2',
      props: {
        accountAddress: '0xd5d8F89ab472d0cF0218549194af5Fe0c9A63cD5',
        trend: {
          image: undefined,
          title: 'Artificial intelligence',
        },
        position: {
          leverage: 2,
          isLong: true,
          openLevel: '38.09',
          exitLevel: '40.00',
        },
        pnl: -48.5,
      }
    }),
  ]).finally(() => {
    generator.shutdown()
  })
})
