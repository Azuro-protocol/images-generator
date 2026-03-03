# @azuro-org/images-generator

Puppeteer-based image generator: render HTML templates to PNG/JPEG. Uses a shared browser instance; relaunches automatically if the browser disconnects.

## Installation

```bash
npm install @azuro-org/images-generator
```

## Usage

Create a `Generator` instance, call `run()` to start the browser, then use `generate()` for each image. Call `shutdown()` when done to close the browser.

```typescript
import { Generator } from '@azuro-org/images-generator';
import template from '@azuro-org/images-generator/lib/templates/bet-nft';

const generator = new Generator();

await generator.run();

// Single image – returns Uint8Array
const buffer = await generator.generate({
  template,
  props: { /* ... */ },
});

// Save to file
await generator.generate({
  template,
  props: { /* ... */ },
  output: './dist',
  filename: 'my-image',
});

await generator.shutdown();
```

### Batch generation with shutdown

Run multiple generations in parallel and close the browser when finished:

```typescript
await generator.run();

await Promise.all([
  generator.generate({ template, props: props1, output: './dist', filename: 'image-1' }),
  generator.generate({ template, props: props2, output: './dist', filename: 'image-2' }),
]).finally(() => {
  generator.shutdown();
});
```

### Auto-recovery

If the browser process exits or crashes, the next `generate()` call will launch a new browser automatically. You can also call `run()` again after a disconnect.

## API

### `Generator`

**Constructor**

```typescript
const generator = new Generator(options?: GeneratorOptions);

interface GeneratorOptions {
  headless?: boolean;  // default: true
  timeout?: number;    // default: 30000 (ms)
  args?: string[];     // extra Chromium args
}
```

**Methods**

- **`run(): Promise<void>`** — Launches the browser. Idempotent if already running.
- **`generate<P>(props: GenerateProps<P>): Promise<Uint8Array>`** — Renders the template with the given props. Ensures the browser is running (calls `run()` if needed).
- **`shutdown(): Promise<void>`** — Closes the browser and cleans up.

### `generate()` options

```typescript
interface GenerateProps<P> {
  template: Template<P>;
  props: P;
  output?: string;   // folder path for the output file
  filename?: string; // file name without extension (used with output)
  options?: GenerateOptions;
}

interface GenerateOptions {
  quality?: number;           // JPEG quality, default 85
  fullPage?: boolean;        // default false
  waitForFonts?: boolean;    // default true
  waitTimeout?: number;      // ms, default 2000
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2'; // default 'domcontentloaded'
  skipAnimations?: boolean;  // default true
}
```

## Templates

Templates are in `lib/templates/<name>` (or `dist/templates/<name>` for ESM). Each template exports a default `Template` and a `Props` type.

| Template           | Import path                                              |
|--------------------|----------------------------------------------------------|
| Bet NFT            | `@azuro-org/images-generator/lib/templates/bet-nft`      |
| Bet OG             | `@azuro-org/images-generator/lib/templates/bet-og`      |
| Combo Bet OG       | `@azuro-org/images-generator/lib/templates/combo-bet-og` |
| Freebet            | `@azuro-org/images-generator/lib/templates/freebet`     |
| Trendle Leaderboard| `@azuro-org/images-generator/lib/templates/trendle-leaderboard` |
| Trendle Social     | `@azuro-org/images-generator/lib/templates/trendle-social`   |
| Trendle Trading    | `@azuro-org/images-generator/lib/templates/trendle-trading`   |

---

## Examples

<details>
<summary><b>Bet Opengraph</b></summary>
<p>

```typescript
import { Generator } from '@azuro-org/images-generator';
import template from '@azuro-org/images-generator/lib/templates/bet-og';

const generator = new Generator();
await generator.run();

await generator.generate({
  template,
  output: './dist',
  filename: 'bet-og',
  props: {
    title: 'Decentralized betting is awesome!',
    game: {
      country: 'International Tournaments',
      league: 'ESL Challenger League North America',
      participants: [
        { name: 'WINDINGO', image: 'https://content.bookmaker.xyz/avatars/provider-3/4757.png' },
        { name: 'Los Grandes Academy', image: 'https://content.bookmaker.xyz/avatars/provider-3/4739.png' },
      ],
      startsAt: Date.now(),
    },
  },
});

await generator.shutdown();
```

### Result

<img src="https://github.com/Azuro-protocol/images-generator/raw/main/src/templates/bet-og/example.jpeg" width="600" />
</p>
</details>

<details>
<summary><b>Combo Bet Opengraph</b></summary>
<p>

```typescript
import { Generator } from '@azuro-org/images-generator';
import template from '@azuro-org/images-generator/lib/templates/combo-bet-og';

const generator = new Generator();
await generator.run();

await generator.generate({
  template,
  output: './dist',
  filename: 'combo-bet-og',
  props: {
    title: 'Decentralized betting is awesome!',
    data: {
      totalOdds: 1.57,
      possiblePayout: 1017.17,
      asset: 'USDT',
    },
  },
});

await generator.shutdown();
```

### Result

<img src="https://github.com/Azuro-protocol/images-generator/raw/main/src/templates/combo-bet-og/example.jpeg" width="600" />
</p>
</details>

<details>
<summary><b>Bet NFT</b></summary>
<p>

```typescript
import { Generator } from '@azuro-org/images-generator';
import template from '@azuro-org/images-generator/lib/templates/bet-nft';

const generator = new Generator();
await generator.run();

await generator.generate({
  template,
  output: './dist',
  filename: 'bet-nft',
  props: {
    type: 'match',
    sport: 'Football',
    league: 'International Tournaments · FIFA - World Cup',
    team1: { img: 'https://content.bookmaker.xyz/avatars/provider-3/4757.png', name: 'Ecuador' },
    team2: { img: 'https://content.bookmaker.xyz/avatars/provider-3/4739.png', name: 'Senegal' },
    date: 'Dec 24, 2020',
    betAmount: '100 xDAI',
    outcome: 'Senegal',
    betOdds: '1.7',
    currentOdds: '1.2',
  },
});

await generator.shutdown();
```

### Result

<img src="https://github.com/Azuro-protocol/images-generator/raw/main/src/templates/bet-nft/example.png" width="255" />
</p>
</details>

<details>
<summary><b>Freebet</b></summary>
<p>

```typescript
import { Generator } from '@azuro-org/images-generator';
import template from '@azuro-org/images-generator/lib/templates/freebet';

const generator = new Generator();
await generator.run();

await generator.generate({
  template,
  output: './dist',
  filename: 'freebet',
  props: {
    amount: '5 xDAI',
    date: '12.01.2022',
  },
});

await generator.shutdown();
```

### Result

<img src="https://github.com/Azuro-protocol/images-generator/raw/main/src/templates/freebet/example.png" width="416" />
</p>
</details>

---

## Contributing

### Add a new template

1. Copy `src/templates/_template` to `src/templates/{your_template_name}`.
2. Put layout and styles in `index.html`.
3. Add a `images` folder for static assets if needed.

### Template definition

Use `Template<Props>`, `getBase64Image`, and `downloadImage` from `../../utils`:

```typescript
import { type Template, downloadImage } from '../../utils';
import html from './index.html';

export type Props = {
  team1ImageSrc: string;
  team2ImageSrc: string;
  date: string;
};

const template: Template<Props> = {
  width: 800,
  height: 400,
  type: 'jpeg',
  html: async (props: Props) => {
    const { team1ImageSrc, team2ImageSrc, date } = props;
    const team1Img = await downloadImage(team1ImageSrc);
    const team2Img = await downloadImage(team2ImageSrc);
    return html
      .replace('{image1}', team1Img)
      .replace('{image2}', team2Img)
      .replace('{date}', date);
  },
};

export default template;
```

**Template shape**

```typescript
type Template<Props> = {
  width: number;
  height: number;
  type: 'png' | 'jpeg';
  html: (props: Props) => string | Promise<string>;
  headless?: boolean;
  scaleFactor?: 1 | 2;
};
```

### Publish

Publish with `npm publish`. For access to the `@azuro-org` scope, contact the maintainers.
