import puppeteer, { Browser, ScreenshotOptions } from 'puppeteer';
import fs from 'fs';
import { type Template } from './utils';

type PuppeteerOptions = Parameters<typeof puppeteer.launch>[0];

function isProtocolTimeoutError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return (
    error.name === 'ProtocolError' ||
    /protocol.*timeout|timed out/i.test(error.message)
  );
}

interface GeneratorOptions {
  headless?: boolean;
  timeout?: number;
  protocolTimeout?: number;
  args?: string[];
}

/**
 * Options for a single image generation.
 */
interface GenerateOptions {
  /** JPEG quality 1–100 (ignored for PNG). Default 85. */
  quality?: number;
  /** Screenshot the full scrollable page instead of just the viewport. Default false. */
  fullPage?: boolean;
  /** Wait for document.fonts.ready before taking the screenshot so webfonts are applied. Default true. */
  waitForFonts?: boolean;
  /** Max ms to wait for content/font loading. Default 2000. */
  waitTimeout?: number;
  /**
   * When to consider the page content "loaded" before screenshot.
   * - `domcontentloaded` – DOM ready, resources (images, fonts) may still load. Fastest. Default.
   * - `load` – load event fired (images, stylesheets, etc. loaded).
   * - `networkidle0` – no network requests for 500ms.
   * - `networkidle2` – at most 2 network requests for 500ms.
   */
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';
  /** If true, do not add an extra delay for CSS animations. Default true. */
  skipAnimations?: boolean;
}

type GenerateProps<P> = {
  template: Template<P>
  props: P
  output?: string // output filepath
  filename?: string
  options?: GenerateOptions,
}

class Generator {
  private browser: Browser | null = null;
  private readonly options: GeneratorOptions;

  constructor(options: GeneratorOptions = {}) {
    this.options = {
      headless: true,
      timeout: 30000,
      protocolTimeout: 60000,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-accelerated-video-decode',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-plugins',
        '--disable-extensions',
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-component-extensions-with-background-pages',
        '--disable-features=TranslateUI',
        '--disable-ipc-flooding-protection',
        '--disable-hang-monitor',
        '--disable-prompt-on-repost',
        '--disable-sync',
        '--metrics-recording-only',
        '--no-first-run',
        '--safebrowsing-disable-auto-update',
        '--enable-automation',
        '--password-store=basic',
        '--use-mock-keychain',
      ],
      ...options,
    };
  }

  async run(): Promise<void> {
    if (this.browser) {
      return;
    }

    try {
      const launchOptions: PuppeteerOptions = {
        headless: this.options.headless ?? true,
        devtools: false,
        args: this.options.args,
        timeout: this.options.timeout,
        protocolTimeout: this.options.protocolTimeout ?? 60000,
      };

      this.browser = await puppeteer.launch(launchOptions);

      this.browser.on('disconnected', () => {
        this.browser = null;
      });
    }
    catch (error) {
      await this.cleanup();
      throw new Error(
        `Failed to initialize generator: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async generate<P>(props: GenerateProps<P>): Promise<Uint8Array> {
    const maxAttempts = 2;
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        if (!this.browser) {
          await this.run();
        }

        const {
          template,
          props: templateProps,
          output,
          filename,
          options = {},
        } = props;

        // Validate template
        if (!template.width || !template.height || !template.html) {
          throw new Error('Invalid template: missing required properties');
        }

        const {
          width,
          height,
          type,
          html: getHtml,
        } = template;

        const {
          quality = type === 'jpeg' ? 85 : undefined,
          fullPage = false,
          waitForFonts = true,
          waitTimeout = 2000,
          waitUntil = 'load',
          skipAnimations = true,
        } = options;

        const page = await this.browser!.newPage();

        // Set reasonable timeout instead of infinite
        page.setDefaultNavigationTimeout(this.options.timeout ?? 30000);
        page.setDefaultTimeout(this.options.timeout ?? 30000);

        // Optimize page performance
        await page.setCacheEnabled(false);
        await page.setJavaScriptEnabled(true);

        // Block unnecessary network requests for faster rendering
        await page.setRequestInterception(true);
        page.on('request', (req) => {
          const resourceType = req.resourceType();
          if (['media', 'websocket', 'manifest', 'texttrack'].includes(resourceType)) {
            req.abort();
          } else {
            req.continue();
          }
        });

        try {
          // Set viewport for this generation
          await page.setViewport({
            width,
            height,
            deviceScaleFactor: 1,
          });

          // Generate HTML content
          const htmlContent = await getHtml(templateProps);

          if (!htmlContent || typeof htmlContent !== 'string') {
            throw new Error('Template html function must return a non-empty string');
          }

          // Load content with faster wait strategy
          await Promise.race([
            page.setContent(htmlContent, { waitUntil }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Content loading timeout')), waitTimeout),
            ),
          ]);

          // Wait for fonts to load if requested
          if (waitForFonts) {
            await Promise.race([
              page.evaluate(() => document.fonts.ready),
              new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Font loading timeout')), waitTimeout),
              ),
            ]).catch(() => {});
          }

          if (!skipAnimations) {
            await new Promise((resolve) => setTimeout(resolve, 100));
          }

          const content = fullPage ? page : await page.$('body');

          if (!content) {
            throw new Error('Failed to find content element');
          }

          const screenshotOptions: ScreenshotOptions = {
            omitBackground: true,
            type,
            ...(type === 'jpeg' && quality ? { quality } : {}),
          };

          if (output && filename) {
            if (!fs.existsSync(output)) {
              fs.mkdirSync(output);
            }
            screenshotOptions.path = `${output.replace(/\/$/, '')}/${filename.replace(/\..+$/, '')}.${type}`;
          }

          const imageBuffer = await content.screenshot(screenshotOptions);
          await page.close();
          
          return imageBuffer;
        } catch (innerError) {
          await page.close().catch(() => {});
          throw innerError;
        }
      } catch (error) {
        lastError = error;
        if (attempt < maxAttempts && isProtocolTimeoutError(error)) {
          await this.cleanup();
          continue;
        }
        break;
      }
    }

    const errorMessage =
      lastError instanceof Error ? lastError.message : 'Unknown error occurred';
    throw new Error(`Failed to generate image: ${errorMessage}`);
  }

  async shutdown(): Promise<void> {
    await this.cleanup();
  }

  private async cleanup(): Promise<void> {
    try {
      if (this.browser) {
        await this.browser.close().catch(() => {
          // Ignore errors during cleanup
        });
        this.browser = null;
      }
    }
    catch {
      // Ignore errors during cleanup
    }
  }
}

export default Generator
