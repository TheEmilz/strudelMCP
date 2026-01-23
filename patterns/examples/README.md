# Example Patterns

This directory contains example Strudel patterns for testing and demonstration.

## Pattern Categories

### Basic Patterns
Simple patterns for beginners to understand Strudel syntax:
- `simpleBeat` - Basic four-on-the-floor beat
- `kickOnly` - Isolated kick drum pattern
- `hiHatPattern` - Hi-hat pattern with gain control

### Techno
- `hardTechno` - 140 BPM hard techno with bassline
- `minimalTechno` - 128 BPM minimal techno groove

### House
- `deepHouse` - 122 BPM deep house pattern with piano chords

### Drum & Bass
- `liquidDnB` - 174 BPM liquid drum & bass with atmospheric pads

### Ambient
- `darkAmbient` - 60 BPM dark ambient soundscape with long releases

### Effects Examples
- `reverbChain` - Pattern with reverb effect
- `delayPattern` - Pattern with delay effect
- `cutoffSweep` - Cutoff filter sweep example

### Educational
- `euclidean` - Euclidean rhythm example
- `polyrhythm` - Multiple euclidean rhythms layered
- `scales` - Scale and melody example

## Usage in Tests

These patterns are used in:
- Unit tests for pattern validation
- Integration tests for browser automation
- Documentation examples

## Pattern Structure

Each pattern includes:
- Strudel code
- Metadata (BPM, genre, difficulty, tags)
- Comments explaining the pattern

## Adding New Patterns

To add a new pattern:

1. Add to `tests/fixtures/patterns.js`:
```javascript
export const patterns = {
  myCategory: {
    myPattern: `// Description
    setcpm(120)
    s("bd hh sd hh")`,
  },
};
```

2. Add metadata:
```javascript
export const patternMetadata = {
  myPattern: {
    name: 'My Pattern',
    bpm: 120,
    genre: 'category',
    difficulty: 'beginner',
    tags: ['tag1', 'tag2'],
  },
};
```

3. Test the pattern in `tests/unit/patterns.test.js`
