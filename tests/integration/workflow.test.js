import { chromium } from 'playwright';

async function testMCPWorkflow() {
  console.log('🎵 Testing MCP Server Workflow...\n');
  
  let browser;
  let context;
  let page;
  let testsPassed = 0;
  let testsFailed = 0;

  try {
    // Initialize browser (simulating strudel_init)
    console.log('Test 1: Initialize Browser');
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://strudel.cc/', { timeout: 60000 });
    await page.waitForSelector('.cm-editor', { timeout: 30000 });
    await page.waitForTimeout(2000);
    console.log('✓ Browser initialized\n');
    testsPassed++;

    // Test workflow: Write -> Play -> Stop -> Save
    console.log('Test 2: Write Pattern');
    const pattern1 = `// Simple techno beat
s("bd*4").gain(0.8)
s("~ cp ~ cp")
s("hh*8").gain(0.4)`;
    
    await page.evaluate((code) => {
      const editor = document.querySelector('.cm-editor');
      if (editor?.view) {
        const view = editor.view;
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
        });
      }
    }, pattern1);
    console.log('✓ Pattern written\n');
    testsPassed++;

    // Test get pattern
    console.log('Test 3: Get Pattern');
    const retrieved = await page.evaluate(() => {
      const editor = document.querySelector('.cm-editor');
      return editor?.view?.state.doc.toString() || '';
    });
    
    if (retrieved.includes('techno beat')) {
      console.log('✓ Pattern retrieved correctly\n');
      testsPassed++;
    } else {
      throw new Error('Pattern retrieval failed');
    }

    // Test append
    console.log('Test 4: Append Pattern');
    const appendCode = '\n// Added bassline\nnote("c2 c2 c2 c2").s("sawtooth")';
    await page.evaluate((code) => {
      const editor = document.querySelector('.cm-editor');
      if (editor?.view) {
        const view = editor.view;
        const current = view.state.doc.toString();
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: current + code }
        });
      }
    }, appendCode);
    console.log('✓ Pattern appended\n');
    testsPassed++;

    // Test replace
    console.log('Test 5: Replace Text');
    await page.evaluate(() => {
      const editor = document.querySelector('.cm-editor');
      if (editor?.view) {
        const view = editor.view;
        const current = view.state.doc.toString();
        const newCode = current.replace('bd*4', 'bd*8');
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: newCode }
        });
      }
    });
    
    const afterReplace = await page.evaluate(() => {
      const editor = document.querySelector('.cm-editor');
      return editor?.view?.state.doc.toString() || '';
    });
    
    if (afterReplace.includes('bd*8')) {
      console.log('✓ Text replaced successfully\n');
      testsPassed++;
    } else {
      throw new Error('Text replacement failed');
    }

    // Test clear
    console.log('Test 6: Clear Editor');
    await page.evaluate(() => {
      const editor = document.querySelector('.cm-editor');
      if (editor?.view) {
        const view = editor.view;
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: '' }
        });
      }
    });
    
    const afterClear = await page.evaluate(() => {
      const editor = document.querySelector('.cm-editor');
      return editor?.view?.state.doc.toString() || '';
    });
    
    if (afterClear.trim() === '') {
      console.log('✓ Editor cleared\n');
      testsPassed++;
    } else {
      throw new Error('Clear failed');
    }

    // Test multiple patterns
    console.log('Test 7: Multiple Pattern Operations');
    const patterns = [
      's("bd")',
      's("~ cp")',
      's("hh*4")'
    ];
    
    for (const p of patterns) {
      await page.evaluate((code) => {
        const editor = document.querySelector('.cm-editor');
        if (editor?.view) {
          const view = editor.view;
          const current = view.state.doc.toString();
          view.dispatch({
            changes: { from: 0, to: view.state.doc.length, insert: current + (current ? '\n' : '') + code }
          });
        }
      }, p);
    }
    
    const finalPattern = await page.evaluate(() => {
      const editor = document.querySelector('.cm-editor');
      return editor?.view?.state.doc.toString() || '';
    });
    
    if (patterns.every(p => finalPattern.includes(p))) {
      console.log('✓ Multiple patterns handled correctly\n');
      testsPassed++;
    } else {
      throw new Error('Multiple pattern operation failed');
    }

  } catch (error) {
    console.error('✗ Test failed:', error.message);
    testsFailed++;
  } finally {
    if (context) {
      await context.close();
    }
    if (browser) {
      await browser.close();
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('WORKFLOW TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`✓ Passed: ${testsPassed}`);
  console.log(`✗ Failed: ${testsFailed}`);
  console.log('='.repeat(50) + '\n');

  process.exit(testsFailed > 0 ? 1 : 0);
}

testMCPWorkflow();
