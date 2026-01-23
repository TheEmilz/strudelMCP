// Brahms Intermezzo Op.117 No.1 in Eb major
// A simplified Strudel interpretation - "Lullaby of my sorrows"
// Tempo: Andante moderato (around 80 BPM)
//
// Structure: Ternary form (A-B-A) with a Scottish lullaby as inspiration
// Brahms wrote "Schlaf sanft mein Kind" (Sleep softly my child) on the manuscript
//
// Harmonic features:
// - Key: Eb major with modal inflections
// - Scotch snap rhythms characteristic of Scottish folk music
// - Rich chromatic inner voices
// - Gentle modal mixture (borrowing from parallel minor)
// - Warm, consoling harmonic progressions
//
// Performance notes:
// - Rocking, lullaby character throughout
// - Gentle, cradling rhythmic motion
// - Warm, mellow tone quality
// - Smooth legato with singing melody
// - Dynamics mostly soft (p to mp)
// - Tender and deeply expressive

setcpm(80)

stack(
  // Right hand: Lullaby melody with characteristic rhythm
  // Tender melodic line with scotch snap rhythms
  note("<[bb4 eb5] [g4 bb4] [ab4 c5] [bb4 eb5]>")
    .s("sine")
    .lpf(1500)
    .gain(0.48)
    .attack(0.25)
    .release(1.4)
    .room(0.6)
    .slow(2),
  
  // Right hand: Inner voice harmonization
  // Creates the rich harmonic texture
  note("<g4 f4 eb4 d4>")
    .s("triangle")
    .lpf(1100)
    .gain(0.35)
    .attack(0.2)
    .release(1.2)
    .room(0.55)
    .slow(2),
  
  // Left hand: Gentle arpeggiated accompaniment
  // Rocking motion like a cradle
  note("<[eb2 bb2 eb3] [ab1 eb2 ab2] [bb1 f2 bb2] [eb2 bb2 eb3]>")
    .s("sine")
    .lpf(700)
    .gain(0.45)
    .attack(0.1)
    .release(0.9)
    .room(0.45)
    .fast(1.5),
  
  // Left hand: Bass foundation
  // Deep bass notes anchoring the harmony
  note("<eb1 ab1 bb1 eb1>")
    .s("sine")
    .lpf(350)
    .gain(0.5)
    .attack(0.05)
    .release(1.5)
    .room(0.4)
    .slow(2),
  
  // Middle voice: Chromatic inner line
  // Characteristic Brahmsian voice leading
  note("<g3 f3 eb3 d3>")
    .s("square")
    .lpf(900)
    .gain(0.28)
    .attack(0.3)
    .release(1.1)
    .room(0.5)
    .slow(2)
)
