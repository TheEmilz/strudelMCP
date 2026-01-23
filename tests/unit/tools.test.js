import { describe, it, before } from 'node:test';
import assert from 'node:assert';
import { StrudelBrowser } from '../../dist/browser.js';
import { PatternStorage } from '../../dist/storage.js';
import { StrudelTools } from '../../dist/tools.js';

describe('StrudelTools', () => {
  let browser;
  let storage;
  let tools;

  before(() => {
    browser = new StrudelBrowser({ headless: true });
    storage = new PatternStorage('./tests/tmp/tool-patterns');
    tools = new StrudelTools(browser, storage);
  });

  it('should have all expected tools', () => {
    const toolList = tools.getTools();
    assert.ok(toolList.length > 0);
    
    const toolNames = toolList.map(t => t.name);
    
    // Core control tools
    assert.ok(toolNames.includes('strudel_init'));
    assert.ok(toolNames.includes('strudel_write'));
    assert.ok(toolNames.includes('strudel_get_pattern'));
    assert.ok(toolNames.includes('strudel_play'));
    assert.ok(toolNames.includes('strudel_stop'));
    assert.ok(toolNames.includes('strudel_clear'));
    
    // Pattern manipulation
    assert.ok(toolNames.includes('strudel_append'));
    assert.ok(toolNames.includes('strudel_insert'));
    assert.ok(toolNames.includes('strudel_replace'));
    
    // Session management
    assert.ok(toolNames.includes('strudel_save'));
    assert.ok(toolNames.includes('strudel_load'));
    assert.ok(toolNames.includes('strudel_list'));
    
    // Analysis
    assert.ok(toolNames.includes('strudel_analyze'));
    assert.ok(toolNames.includes('strudel_status'));
    
    // History
    assert.ok(toolNames.includes('strudel_undo'));
    assert.ok(toolNames.includes('strudel_redo'));
  });

  it('should have valid tool definitions', () => {
    const toolList = tools.getTools();
    
    for (const tool of toolList) {
      assert.ok(tool.name, 'Tool should have a name');
      assert.ok(tool.description, 'Tool should have a description');
      assert.ok(tool.inputSchema, 'Tool should have an input schema');
      assert.ok(typeof tool.handler === 'function', 'Tool should have a handler function');
    }
  });

  it('should validate tool input schemas', () => {
    const toolList = tools.getTools();
    const writeTool = toolList.find(t => t.name === 'strudel_write');
    
    assert.ok(writeTool);
    
    // Valid input should parse
    const validInput = { pattern: 's("bd hh")' };
    const parsed = writeTool.inputSchema.parse(validInput);
    assert.deepEqual(parsed, validInput);
    
    // Invalid input should throw
    assert.throws(() => {
      writeTool.inputSchema.parse({ invalidKey: 'value' });
    });
  });

  it('should have proper tool categorization', () => {
    const toolList = tools.getTools();
    
    // Count tools by prefix
    const coreTools = toolList.filter(t => 
      ['init', 'write', 'get_pattern', 'play', 'stop', 'clear'].some(n => t.name.includes(n))
    );
    const manipTools = toolList.filter(t => 
      ['append', 'insert', 'replace'].some(n => t.name.includes(n))
    );
    const sessionTools = toolList.filter(t => 
      ['save', 'load', 'list'].some(n => t.name.includes(n))
    );
    
    assert.ok(coreTools.length >= 6, 'Should have at least 6 core tools');
    assert.ok(manipTools.length >= 3, 'Should have at least 3 manipulation tools');
    assert.ok(sessionTools.length >= 3, 'Should have at least 3 session tools');
  });
});
