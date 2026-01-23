import { describe, it } from 'node:test';
import assert from 'node:assert';
import { z } from 'zod';

describe('MCP Tool Schema Validation', () => {
  it('should validate write tool input', () => {
    const writeSchema = z.object({
      pattern: z.string(),
    });

    const valid = { pattern: 's("bd hh")' };
    assert.doesNotThrow(() => writeSchema.parse(valid));

    const invalid = { notPattern: 'test' };
    assert.throws(() => writeSchema.parse(invalid));
  });

  it('should validate save tool input', () => {
    const saveSchema = z.object({
      name: z.string(),
      tags: z.array(z.string()).optional(),
    });

    const valid1 = { name: 'my-pattern' };
    assert.doesNotThrow(() => saveSchema.parse(valid1));

    const valid2 = { name: 'my-pattern', tags: ['techno', 'house'] };
    assert.doesNotThrow(() => saveSchema.parse(valid2));

    const invalid = { tags: ['test'] };
    assert.throws(() => saveSchema.parse(invalid));
  });

  it('should validate insert tool input', () => {
    const insertSchema = z.object({
      lineNumber: z.number(),
      pattern: z.string(),
    });

    const valid = { lineNumber: 5, pattern: 's("bd")' };
    assert.doesNotThrow(() => insertSchema.parse(valid));

    const invalid1 = { lineNumber: '5', pattern: 's("bd")' };
    assert.throws(() => insertSchema.parse(invalid1));

    const invalid2 = { lineNumber: 5 };
    assert.throws(() => insertSchema.parse(invalid2));
  });

  it('should validate replace tool input', () => {
    const replaceSchema = z.object({
      oldText: z.string(),
      newText: z.string(),
    });

    const valid = { oldText: 'bd', newText: 'cp' };
    assert.doesNotThrow(() => replaceSchema.parse(valid));

    const invalid = { oldText: 'bd' };
    assert.throws(() => replaceSchema.parse(invalid));
  });

  it('should handle optional fields correctly', () => {
    const schema = z.object({
      required: z.string(),
      optional: z.string().optional(),
    });

    const valid1 = { required: 'test' };
    assert.doesNotThrow(() => schema.parse(valid1));

    const valid2 = { required: 'test', optional: 'value' };
    assert.doesNotThrow(() => schema.parse(valid2));

    const invalid = { optional: 'value' };
    assert.throws(() => schema.parse(invalid));
  });

  it('should validate array inputs', () => {
    const schema = z.object({
      items: z.array(z.string()),
    });

    const valid = { items: ['a', 'b', 'c'] };
    assert.doesNotThrow(() => schema.parse(valid));

    const invalid1 = { items: 'not-an-array' };
    assert.throws(() => schema.parse(invalid1));

    const invalid2 = { items: [1, 2, 3] };
    assert.throws(() => schema.parse(invalid2));
  });
});
