import puppeteer, { Browser, ScreenshotOptions } from 'puppeteer';
import fs from 'fs';
import { type Template } from './utils';

type PuppeteerOptions = Parameters<typeof puppeteer.launch>[0];

interface GeneratorOptions {
  headless?: boolean;
  timeout?: number;
  args?: string[];
}

interface GenerateOptions {
  quality?: number;
  fullPage?: boolean;
  waitForFonts?: boolean;
  waitTimeout?: number;
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';
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
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-accelerated-video-decode',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-plugins',
        '--disable-extensions',
        '--disable-background-networking',
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
    if (!this.browser) {
      await this.run();
    }

    const {
      template,
      props: templateProps,
      output,
      filename,
      options = {},
    } = props

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
      
      // Block only truly unnecessary resources that don't affect rendering
      // Allow images, stylesheets, scripts, and data URLs
      if (['font', 'media', 'websocket', 'manifest', 'texttrack'].includes(resourceType)) {
        req.abort();
      }
      else {
        req.continue();
      }
    });

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
      quality = type === 'jpeg' ? 85 : undefined, // Lower default quality for speed
      fullPage = false,
      waitForFonts = true, // Disable by default for speed
      waitTimeout = 2000, // Reduced timeout
      waitUntil = 'domcontentloaded', // Faster than networkidle0
      skipAnimations = true, // Skip animation wait by default
    } = options;

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

      // Wait for fonts to load if requested (usually not needed for base64 images)
      if (waitForFonts) {
        await Promise.race([
          page.evaluate(() => document.fonts.ready),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Font loading timeout')), waitTimeout),
          ),
        ]).catch(() => {
          // Font loading timeout is not critical, continue anyway
        });
      }

      // Skip animation wait if not needed (most templates don't need it)
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
          fs.mkdirSync(output)
        }

        screenshotOptions.path = `${output.replace(/\/$/, '')}/${filename.replace(/\..+$/, '')}.${type}`
      }

      const imageBuffer = await content.screenshot(screenshotOptions);

      await page.close();

      return imageBuffer;
    }
    catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to generate image: ${errorMessage}`);
    }
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
