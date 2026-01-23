import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { StrudelBrowser } from '../../dist/browser.js';
import { PatternStorage } from '../../dist/storage.js';
import { StrudelTools } from '../../dist/tools.js';

describe('History Management', () => {
  let browser;
  let storage;
  let tools;

  before(() => {
    browser = new StrudelBrowser({ headless: true });
    storage = new PatternStorage('./tests/tmp/history-patterns');
    tools = new StrudelTools(browser, storage);
  });

  after(async () => {
    if (browser) {
      await browser.close();
    }
  });

  it('should have undo and redo tools', () => {
    const toolList = tools.getTools();
    const toolNames = toolList.map(t => t.name);
    
    assert.ok(toolNames.includes('strudel_undo'));
    assert.ok(toolNames.includes('strudel_redo'));
  });

  it('should validate undo tool has no required parameters', () => {
    const toolList = tools.getTools();
    const undoTool = toolList.find(t => t.name === 'strudel_undo');
    
    assert.ok(undoTool);
    const result = undoTool.inputSchema.parse({});
    assert.deepEqual(result, {});
  });

  it('should validate redo tool has no required parameters', () => {
    const toolList = tools.getTools();
    const redoTool = toolList.find(t => t.name === 'strudel_redo');
    
    assert.ok(redoTool);
    const result = redoTool.inputSchema.parse({});
    assert.deepEqual(result, {});
  });
});

describe('Session Management Integration', () => {
  let storage;

  before(() => {
    storage = new PatternStorage('./tests/tmp/session-patterns');
  });

  it('should save and load patterns within a session', () => {
    // Save multiple patterns
    const pattern1 = storage.save('session-1', 's("bd hh")', ['test']);
    const pattern2 = storage.save('session-2', 's("cp sn")', ['test']);
    
    // List them
    const patterns = storage.list('test');
    assert.ok(patterns.length >= 2);
    
    // Load them back
    const loaded1 = storage.load('session-1');
    const loaded2 = storage.load('session-2');
    
    assert.equal(loaded1.name, 'session-1');
    assert.equal(loaded2.name, 'session-2');
  });

  it('should handle pattern tags for organization', () => {
    storage.save('techno-1', 's("bd*4")', ['techno', 'hard']);
    storage.save('techno-2', 's("bd bd")', ['techno', 'minimal']);
    storage.save('house-1', 's("hh*8")', ['house']);
    
    const technoPatterns = storage.list('techno');
    const housePatterns = storage.list('house');
    
    assert.ok(technoPatterns.length >= 2);
    assert.ok(housePatterns.length >= 1);
  });

  it('should persist patterns across storage instances', () => {
    const dir = './tests/tmp/persist-test';
    
    // Create first instance and save
    const storage1 = new PatternStorage(dir);
    storage1.save('persist-test', 's("test")', ['persist']);
    
    // Create new instance and verify it loads
    const storage2 = new PatternStorage(dir);
    const loaded = storage2.load('persist-test');
    
    assert.ok(loaded);
    assert.equal(loaded.name, 'persist-test');
    assert.equal(loaded.code, 's("test")');
  });
});
