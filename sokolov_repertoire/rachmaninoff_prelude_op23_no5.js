// Rachmaninoff Prelude Op.23 No.5 in G minor
// A simplified Strudel interpretation of this march-like masterpiece
// Tempo: Alla marcia (around 108 BPM)
//
// Structure: A-B-A form with powerful, march-like character
// Features driving rhythms and rich Romantic harmonies
//
// Harmonic features:
// - Key: G minor with rich chromatic alterations
// - Bold, march-like rhythmic patterns
// - Dense chordal textures in both hands
// - Wide-ranging harmonic progressions
// - Russian Romantic harmonic palette
// - Powerful bass line driving the march
//
// Performance notes:
// - Strong, decisive character throughout
// - Heavy chordal accents marking the march rhythm
// - Wide dynamic contrasts (ff to p)
// - Bold, confident touch
// - Rich pedal for orchestral sonority
// - Driving forward momentum

setcpm(108)

stack(
  // Right hand: March-like melody with chords
  // Bold, rhythmic melody with strong accents
  note("<[g4 bb4 d5] [a4 c5 eb5] [bb4 d5 f5] [c5 eb5 g5]>")
    .s("sawtooth")
    .lpf(1700)
    .gain(0.6)
    .attack(0.05)
    .release(0.7)
    .room(0.5)
    .slow(2),
  
  // Right hand: Upper melody notes (forte)
  // Declamatory melodic line
  note("<d5 eb5 f5 g5>")
    .s("square")
    .lpf(2000)
    .gain(0.55)
    .attack(0.03)
    .release(0.6)
    .room(0.48)
    .slow(2),
  
  // Left hand: Powerful bass chords (march rhythm)
  // Strong, driving bass creating march character
  note("<[g2 d3] [f2 c3] [eb2 bb2] [d2 a2]>")
    .s("sine")
    .lpf(600)
    .gain(0.65)
    .attack(0.02)
    .release(0.6)
    .room(0.4)
    .slow(2),
  
  // Left hand: Deep bass notes (foundation)
  // Solid bass foundation
  note("<g1 ~ f1 ~>")
    .s("sine")
    .lpf(350)
    .gain(0.7)
    .attack(0.02)
    .release(0.9)
    .room(0.38)
    .slow(2),
  
  // Additional orchestral depth
  // Creates the rich, orchestral sonority
  note("<[bb2 d3 g3] [c3 eb3 a3]>")
    .s("triangle")
    .lpf(1100)
    .gain(0.45)
    .attack(0.08)
    .release(0.8)
    .room(0.52)
    .slow(4)
)
