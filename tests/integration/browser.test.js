import { chromium } from 'playwright';
import * as path from 'path';
import * as url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

async function runBrowserIntegrationTest() {
  console.log('🚀 Starting browser integration tests...\n');
  
  let browser;
  let context;
  let page;
  let passed = 0;
  let failed = 0;

  try {
    // Launch browser
    console.log('1. Launching browser...');
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    console.log('✓ Browser launched\n');
    passed++;

    // Test 1: Load Strudel.cc
    console.log('2. Loading Strudel.cc...');
    await page.goto('https://strudel.cc/', { timeout: 60000 });
    await page.waitForSelector('.cm-editor', { timeout: 30000 });
    console.log('✓ Strudel.cc loaded successfully\n');
    passed++;

    // Test 2: Write pattern to editor
    console.log('3. Writing pattern to editor...');
    const testPattern = 's("bd hh sd hh")';
    await page.evaluate((code) => {
      const editor = document.querySelector('.cm-editor');
      if (editor && editor.view) {
        const view = editor.view;
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: '' }
        });
        view.dispatch({
          changes: { from: 0, insert: code }
        });
      }
    }, testPattern);
    console.log('✓ Pattern written\n');
    passed++;

    // Test 3: Read pattern back
    console.log('4. Reading pattern back...');
    const readPattern = await page.evaluate(() => {
      const editor = document.querySelector('.cm-editor');
      if (editor && editor.view) {
        return editor.view.state.doc.toString();
      }
      return '';
    });
    
    if (readPattern.includes('bd hh sd hh')) {
      console.log('✓ Pattern read successfully:', readPattern.trim());
      console.log();
      passed++;
    } else {
      throw new Error(`Pattern mismatch. Got: ${readPattern}`);
    }

    // Test 4: Clear editor
    console.log('5. Clearing editor...');
    await page.evaluate(() => {
      const editor = document.querySelector('.cm-editor');
      if (editor && editor.view) {
        const view = editor.view;
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: '' }
        });
      }
    });
    const clearedPattern = await page.evaluate(() => {
      const editor = document.querySelector('.cm-editor');
      return editor?.view?.state.doc.toString() || '';
    });
    
    if (clearedPattern.trim() === '') {
      console.log('✓ Editor cleared successfully\n');
      passed++;
    } else {
      throw new Error('Editor not cleared properly');
    }

    // Test 5: Test embedded HTML
    console.log('6. Testing embedded HTML fixture...');
    const embedPath = path.join(__dirname, '../fixtures/strudel-embed.html');
    await page.goto(`file://${embedPath}`);
    await page.waitForTimeout(3000); // Wait for embed to load
    console.log('✓ Embedded HTML loaded\n');
    passed++;

    // Test 6: Screenshot
    console.log('7. Taking screenshot...');
    await page.goto('https://strudel.cc/');
    await page.waitForSelector('.cm-editor', { timeout: 30000 });
    const screenshotPath = path.join(__dirname, '../tmp/browser-test-screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`✓ Screenshot saved to ${screenshotPath}\n`);
    passed++;

  } catch (error) {
    console.error('✗ Test failed:', error.message);
    failed++;
  } finally {
    if (context) {
      await context.close();
    }
    if (browser) {
      await browser.close();
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`✓ Passed: ${passed}`);
  console.log(`✗ Failed: ${failed}`);
  console.log(`Total: ${passed + failed}`);
  console.log('='.repeat(50) + '\n');

  process.exit(failed > 0 ? 1 : 0);
}

runBrowserIntegrationTest();
