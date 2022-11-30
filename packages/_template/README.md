### Types Declaration

```typescript
type Props = {
  
}
```

### Usage

```typescript
import generateImage, { type Props } from '@azuro-protocol/<package_name>'

const props: Props = {
  
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
