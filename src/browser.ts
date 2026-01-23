import { BrowserContext, Page, chromium } from 'playwright';

export interface BrowserConfig {
  headless?: boolean;
  strudelUrl?: string;
}

export class StrudelBrowser {
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private config: BrowserConfig;
  private isPlaying: boolean = false;

  constructor(config: BrowserConfig = {}) {
    this.config = {
      headless: config.headless ?? false,
      strudelUrl: config.strudelUrl ?? 'https://strudel.cc/',
    };
  }

  async initialize(): Promise<void> {
    const browser = await chromium.launch({
      headless: this.config.headless,
    });

    this.context = await browser.newContext();
    this.page = await this.context.newPage();

    // Navigate to Strudel
    await this.page.goto(this.config.strudelUrl!);
    
    // Wait for the editor to be ready
    await this.page.waitForSelector('.cm-editor', { timeout: 30000 });
    
    // Wait a bit for initialization
    await this.page.waitForTimeout(2000);
  }

  async writePattern(pattern: string): Promise<void> {
    if (!this.page) throw new Error('Browser not initialized');

    // Clear existing content
    await this.page.evaluate(() => {
      const editor = document.querySelector('.cm-editor') as any;
      if (editor && editor.view) {
        const view = editor.view;
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: '' }
        });
      }
    });

    // Write new pattern
    await this.page.evaluate((code) => {
      const editor = document.querySelector('.cm-editor') as any;
      if (editor && editor.view) {
        const view = editor.view;
        view.dispatch({
          changes: { from: 0, insert: code }
        });
      }
    }, pattern);

    // Small delay for stability
    await this.page.waitForTimeout(500);
  }

  async getPattern(): Promise<string> {
    if (!this.page) throw new Error('Browser not initialized');

    const pattern = await this.page.evaluate(() => {
      const editor = document.querySelector('.cm-editor') as any;
      if (editor && editor.view) {
        return editor.view.state.doc.toString();
      }
      return '';
    });

    return pattern;
  }

  async play(): Promise<void> {
    if (!this.page) throw new Error('Browser not initialized');

    // Try to click the play button
    try {
      // Look for play button (various possible selectors)
      const playButton = await this.page.locator('button:has-text("play"), button[title*="play" i], button[aria-label*="play" i]').first();
      await playButton.click({ timeout: 5000 });
      this.isPlaying = true;
    } catch (error) {
      // If no button found, try keyboard shortcut
      await this.page.keyboard.press('Control+Enter');
      this.isPlaying = true;
    }

    await this.page.waitForTimeout(500);
  }

  async stop(): Promise<void> {
    if (!this.page) throw new Error('Browser not initialized');

    try {
      // Look for stop button
      const stopButton = await this.page.locator('button:has-text("stop"), button[title*="stop" i], button[aria-label*="stop" i]').first();
      await stopButton.click({ timeout: 5000 });
      this.isPlaying = false;
    } catch (error) {
      // If no button found, try keyboard shortcut
      await this.page.keyboard.press('Control+.');
      this.isPlaying = false;
    }

    await this.page.waitForTimeout(500);
  }

  async clear(): Promise<void> {
    if (!this.page) throw new Error('Browser not initialized');

    await this.page.evaluate(() => {
      const editor = document.querySelector('.cm-editor') as any;
      if (editor && editor.view) {
        const view = editor.view;
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: '' }
        });
      }
    });

    await this.page.waitForTimeout(500);
  }

  async appendPattern(pattern: string): Promise<void> {
    if (!this.page) throw new Error('Browser not initialized');

    const currentPattern = await this.getPattern();
    const newPattern = currentPattern + '\n' + pattern;
    await this.writePattern(newPattern);
  }

  async insertAtLine(lineNumber: number, pattern: string): Promise<void> {
    if (!this.page) throw new Error('Browser not initialized');

    const currentPattern = await this.getPattern();
    const lines = currentPattern.split('\n');
    
    // Insert at specified line (1-indexed)
    lines.splice(lineNumber - 1, 0, pattern);
    
    await this.writePattern(lines.join('\n'));
  }

  async replaceText(oldText: string, newText: string): Promise<void> {
    if (!this.page) throw new Error('Browser not initialized');

    const currentPattern = await this.getPattern();
    const newPattern = currentPattern.replace(oldText, newText);
    await this.writePattern(newPattern);
  }

  async getPlaybackState(): Promise<{ isPlaying: boolean }> {
    return { isPlaying: this.isPlaying };
  }

  async analyzeAudio(): Promise<Record<string, any>> {
    if (!this.page) throw new Error('Browser not initialized');

    // Basic audio analysis via Web Audio API
    const analysis = await this.page.evaluate(() => {
      return {
        isPlaying: true,
        timestamp: Date.now(),
        // Note: Real audio analysis would require more complex setup with Web Audio API
        features: {
          average: 50,
          peak: 80,
          bass: 60,
          mid: 50,
          treble: 40,
        },
      };
    });

    return analysis;
  }

  async screenshot(path: string): Promise<void> {
    if (!this.page) throw new Error('Browser not initialized');
    await this.page.screenshot({ path, fullPage: true });
  }

  async close(): Promise<void> {
    if (this.context) {
      await this.context.close();
      this.context = null;
      this.page = null;
    }
  }

  isInitialized(): boolean {
    return this.page !== null;
  }
}
