import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webmcpPath = path.resolve(__dirname, '..', '..', 'webmcp', 'index.html');

describe('WebMCP Client Page', () => {
  const html = fs.readFileSync(webmcpPath, 'utf-8');

  it('should exist as webmcp/index.html', () => {
    assert.ok(fs.existsSync(webmcpPath), 'webmcp/index.html should exist');
  });

  it('should use navigator.modelContext API', () => {
    assert.ok(html.includes('navigator.modelContext'), 'Should reference navigator.modelContext');
  });

  it('should register tools via provideContext', () => {
    assert.ok(html.includes('provideContext'), 'Should use provideContext for batch registration');
  });

  it('should embed the Strudel REPL', () => {
    assert.ok(html.includes('strudel-repl'), 'Should include strudel-repl element');
    assert.ok(html.includes('@strudel/embed'), 'Should load @strudel/embed script');
  });

  it('should register expected WebMCP tools', () => {
    const expectedTools = [
      'write_pattern',
      'get_pattern',
      'play_pattern',
      'stop_pattern',
      'clear_editor',
      'append_pattern',
      'replace_text',
      'get_status',
    ];
    for (const toolName of expectedTools) {
      assert.ok(
        html.includes(`name: '${toolName}'`),
        `Should register tool: ${toolName}`
      );
    }
  });

  it('should have JSON Schema inputSchema for each tool', () => {
    // Count inputSchema occurrences (one per tool)
    const matches = html.match(/inputSchema:/g);
    assert.ok(matches && matches.length >= 8, `Should have at least 8 inputSchema definitions, found ${matches?.length}`);
  });

  it('should have execute functions for each tool', () => {
    const matches = html.match(/execute:\s*async/g);
    assert.ok(matches && matches.length >= 8, `Should have at least 8 execute functions, found ${matches?.length}`);
  });

  it('should provide descriptive error messages', () => {
    assert.ok(html.includes('not found in the current pattern'), 'replace_text should return descriptive error');
    assert.ok(html.includes('editor not ready'), 'write_pattern should handle editor-not-ready');
  });

  it('should include Chrome setup instructions for unavailable API', () => {
    assert.ok(html.includes('chrome://flags/#enable-webmcp-testing'), 'Should reference the Chrome flag');
    assert.ok(html.includes('Chrome 146'), 'Should mention Chrome version requirement');
  });
});
