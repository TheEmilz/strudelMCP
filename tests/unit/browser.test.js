import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { StrudelBrowser } from '../../dist/browser.js';

describe('StrudelBrowser', () => {
  let browser;

  before(async () => {
    browser = new StrudelBrowser({ headless: true });
  });

  after(async () => {
    if (browser) {
      await browser.close();
    }
  });

  it('should create a browser instance', () => {
    assert.ok(browser);
    assert.equal(browser.isInitialized(), false);
  });

  it('should initialize successfully', async function() {
    this.timeout(60000); // Increase timeout for browser initialization
    await browser.initialize();
    assert.equal(browser.isInitialized(), true);
  });

  it('should write and read patterns', async function() {
    this.timeout(10000);
    const testPattern = 's("bd hh sd hh")';
    await browser.writePattern(testPattern);
    const readPattern = await browser.getPattern();
    assert.equal(readPattern.trim(), testPattern.trim());
  });

  it('should clear the editor', async function() {
    this.timeout(10000);
    await browser.writePattern('s("bd sd")');
    await browser.clear();
    const pattern = await browser.getPattern();
    assert.equal(pattern.trim(), '');
  });

  it('should append patterns', async function() {
    this.timeout(10000);
    await browser.writePattern('s("bd")');
    await browser.appendPattern('s("hh")');
    const pattern = await browser.getPattern();
    assert.ok(pattern.includes('bd'));
    assert.ok(pattern.includes('hh'));
  });

  it('should replace text in patterns', async function() {
    this.timeout(10000);
    await browser.writePattern('s("bd sd")');
    await browser.replaceText('bd', 'cp');
    const pattern = await browser.getPattern();
    assert.ok(pattern.includes('cp'));
    assert.ok(!pattern.includes('bd'));
  });

  it('should get playback state', async function() {
    this.timeout(5000);
    const state = await browser.getPlaybackState();
    assert.ok('isPlaying' in state);
    assert.equal(typeof state.isPlaying, 'boolean');
  });
});
