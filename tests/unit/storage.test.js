import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { PatternStorage } from '../../dist/storage.js';
import * as fs from 'fs';

describe('PatternStorage', () => {
  const testDir = './tests/tmp/patterns';
  let storage;

  before(() => {
    // Create test directory
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    storage = new PatternStorage(testDir);
  });

  after(() => {
    // Clean up test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should create storage instance', () => {
    assert.ok(storage);
  });

  it('should save a pattern', () => {
    const result = storage.save('test-pattern', 's("bd hh")', ['techno', 'test']);
    assert.ok(result.id);
    assert.equal(result.name, 'test-pattern');
    assert.equal(result.code, 's("bd hh")');
    assert.deepEqual(result.tags, ['techno', 'test']);
    assert.ok(result.timestamp);
  });

  it('should load a pattern by name', () => {
    storage.save('loadable-pattern', 's("cp")', []);
    const loaded = storage.load('loadable-pattern');
    assert.ok(loaded);
    assert.equal(loaded.name, 'loadable-pattern');
    assert.equal(loaded.code, 's("cp")');
  });

  it('should list all patterns', () => {
    storage.save('pattern1', 's("bd")', ['test']);
    storage.save('pattern2', 's("hh")', ['test']);
    const patterns = storage.list();
    assert.ok(patterns.length >= 2);
  });

  it('should list patterns by tag', () => {
    storage.save('techno1', 's("bd bd")', ['techno']);
    storage.save('house1', 's("hh hh")', ['house']);
    const technoPatterns = storage.list('techno');
    assert.ok(technoPatterns.length >= 1);
    assert.ok(technoPatterns.every(p => p.tags.includes('techno')));
  });

  it('should delete a pattern', () => {
    const saved = storage.save('deletable', 's("test")', []);
    const deleted = storage.delete(saved.id);
    assert.equal(deleted, true);
    const loaded = storage.load(saved.id);
    assert.equal(loaded, null);
  });

  it('should return null for non-existent pattern', () => {
    const loaded = storage.load('non-existent-pattern');
    assert.equal(loaded, null);
  });
});
