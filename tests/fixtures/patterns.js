// Example Strudel patterns for testing and demonstration

export const patterns = {
  // Basic patterns
  basic: {
    simpleBeat: 's("bd hh sd hh")',
    kickOnly: 's("bd*4")',
    hiHatPattern: 's("hh*8").gain(0.4)',
  },

  // Genre-specific patterns
  techno: {
    hardTechno: `// Hard techno pattern
setcpm(140)
stack(
  s("bd*4").gain(0.9),
  s("~ cp ~ cp"),
  s("hh*8").gain(0.4),
  note("c2 c2 c2 c2").s("sawtooth").cutoff(800)
)`,
    
    minimalTechno: `// Minimal techno
setcpm(128)
stack(
  s("bd ~ ~ ~, ~ ~ cp ~"),
  s("hh ~ hh ~").gain(0.3),
  note("~ c2 ~ c2").s("sine").gain(0.5)
)`,
  },

  house: {
    deepHouse: `// Deep house groove
setcpm(122)
stack(
  s("bd ~ ~ bd ~ ~ bd ~"),
  s("~ cp ~ cp"),
  s("hh*8").gain(0.3),
  note("c3 eb3 g3").s("piano").room(0.5)
)`,
  },

  dnb: {
    liquidDnB: `// Liquid drum & bass
setcpm(174)
stack(
  s("bd ~ ~ [bd bd] ~ ~ bd ~, ~ ~ cp ~ ~ cp ~ ~").fast(2),
  note("c2 ~ c2 ~ c1 ~ c2 ~").s("sine"),
  note("c4 eb4 g4 bb4").s("triangle").room(0.7).gain(0.4)
)`,
  },

  ambient: {
    darkAmbient: `// Dark ambient soundscape
setcpm(60)
stack(
  note("c1").s("sine").attack(4).release(8).gain(0.5),
  note("c3 eb3 g3").s("sawtooth").attack(2).release(6).room(0.9).gain(0.3),
  s("bd ~ ~ ~").room(0.9).gain(0.2)
)`,
  },

  // Advanced patterns with effects
  effects: {
    reverbChain: 's("bd hh sd hh").room(0.8).size(3)',
    delayPattern: 's("cp").delay(0.5).delaytime(0.25).delayfeedback(0.6)',
    cutoffSweep: 'note("c2 c2 c2 c2").s("sawtooth").cutoff("200 400 800 1600")',
  },

  // Educational examples
  educational: {
    euclidean: 's("bd").euclid(5, 8)',
    polyrhythm: 'stack(s("bd").euclid(4, 16), s("cp").euclid(7, 16), s("hh").euclid(3, 16))',
    scales: 'note("c d e f g a b c").scale("C:major").s("piano")',
  },
};

// Pattern metadata for testing
export const patternMetadata = {
  simpleBeat: {
    name: 'Simple Beat',
    bpm: 120,
    genre: 'basic',
    difficulty: 'beginner',
    tags: ['drums', 'basic', 'beginner'],
  },
  hardTechno: {
    name: 'Hard Techno',
    bpm: 140,
    genre: 'techno',
    difficulty: 'intermediate',
    tags: ['techno', 'hard', 'kick', 'bass'],
  },
  liquidDnB: {
    name: 'Liquid DnB',
    bpm: 174,
    genre: 'drum-and-bass',
    difficulty: 'advanced',
    tags: ['dnb', 'liquid', 'complex'],
  },
};

// Validation patterns for testing error handling
export const invalidPatterns = {
  syntaxError: 's("bd hh"',  // Missing closing parenthesis
  undefinedFunction: 'undefined("bd")',
  invalidSample: 's("nonexistent-sample")',
};

export default patterns;
