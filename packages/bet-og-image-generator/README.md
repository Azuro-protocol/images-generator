### Types Declaration

```typescript
type Props = {
  title: string
  game: {
    country: string
    league: string
    participants: {
      name: string
      image: string
    }[]
    startsAt: number
  }
}
```

### Usage

```typescript
import generateImage, { type Props } from '@azuro-protocol/bet-og-image-generator'

const props: Props = {
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
  },
}

// to get image buffer
const buffer = await generateImage({
  props,
})

// to output file
generateImage({
  props,
  output: './folder',
  filename: 'image',
})
```
