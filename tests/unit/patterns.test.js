import { describe, it } from 'node:test';
import assert from 'node:assert';
import { patterns, patternMetadata, invalidPatterns } from '../fixtures/patterns.js';

describe('Pattern Examples', () => {
  it('should have basic patterns', () => {
    assert.ok(patterns.basic);
    assert.ok(patterns.basic.simpleBeat);
    assert.ok(patterns.basic.kickOnly);
    assert.ok(patterns.basic.hiHatPattern);
  });

  it('should have genre-specific patterns', () => {
    assert.ok(patterns.techno);
    assert.ok(patterns.house);
    assert.ok(patterns.dnb);
    assert.ok(patterns.ambient);
  });

  it('should have patterns with effects', () => {
    assert.ok(patterns.effects);
    assert.ok(patterns.effects.reverbChain);
    assert.ok(patterns.effects.delayPattern);
    assert.ok(patterns.effects.cutoffSweep);
  });

  it('should have educational examples', () => {
    assert.ok(patterns.educational);
    assert.ok(patterns.educational.euclidean);
    assert.ok(patterns.educational.polyrhythm);
    assert.ok(patterns.educational.scales);
  });

  it('should have pattern metadata', () => {
    assert.ok(patternMetadata.simpleBeat);
    assert.equal(patternMetadata.simpleBeat.bpm, 120);
    assert.ok(Array.isArray(patternMetadata.simpleBeat.tags));
  });

  it('should have invalid patterns for error testing', () => {
    assert.ok(invalidPatterns);
    assert.ok(invalidPatterns.syntaxError);
    assert.ok(invalidPatterns.undefinedFunction);
  });

  it('should validate pattern structure', () => {
    // All patterns should be non-empty strings
    const allPatterns = [
      ...Object.values(patterns.basic),
      ...Object.values(patterns.effects),
      ...Object.values(patterns.educational),
    ];

    for (const pattern of allPatterns) {
      assert.equal(typeof pattern, 'string');
      assert.ok(pattern.length > 0);
    }
  });

  it('should have diverse BPM ranges', () => {
    const bpms = Object.values(patternMetadata).map(m => m.bpm);
    const minBPM = Math.min(...bpms);
    const maxBPM = Math.max(...bpms);
    
    assert.ok(minBPM >= 60, 'Minimum BPM should be realistic');
    assert.ok(maxBPM <= 200, 'Maximum BPM should be realistic');
    assert.ok(maxBPM - minBPM > 50, 'Should have diverse BPM range');
  });
});
