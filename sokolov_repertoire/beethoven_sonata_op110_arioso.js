// Beethoven Piano Sonata Op.110 - Arioso dolente Theme
// A simplified Strudel interpretation of the profoundly moving Arioso
// Tempo: Adagio ma non troppo (around 56 BPM)
// "Klagender Gesang" - "Lamenting song" / "Arioso dolente" - "Sorrowful song"
//
// Structure: Part of the third movement, featuring recitative-like passages
// Alternates with fugue sections in one of Beethoven's late masterpieces
//
// Harmonic features:
// - Key: Ab minor (relative to the sonata's Ab major)
// - Deeply expressive chromatic harmony
// - Voice-leading emphasizes the vocal, song-like quality
// - Rich suspensions and resolutions
// - Late Beethoven's introspective harmonic language
//
// Performance notes:
// - Extremely intimate and personal expression
// - Singing, cantabile touch throughout
// - Dynamics subtle but profoundly expressive (p to pp)
// - Each note weighted with meaning
// - Sparse texture emphasizes emotional directness
// - Deep connection to text-like expression

setcpm(56)

stack(
  // Right hand: Arioso melody - deeply expressive
  // Song-like melody with speechlike contours
  note("<[ab4 cb5] [g4 bb4] [ab4 cb5] [eb4 gb4]>")
    .s("sine")
    .lpf(1400)
    .gain(0.5)
    .attack(0.3)
    .release(2.0)
    .room(0.65)
    .slow(2),
  
  // Right hand: Inner voice creating poignant dissonances
  // Suspensions and resolutions characteristic of late Beethoven
  note("<eb4 d4 eb4 bb3>")
    .s("triangle")
    .lpf(1000)
    .gain(0.35)
    .attack(0.25)
    .release(1.8)
    .room(0.6)
    .slow(2),
  
  // Left hand: Bass line with chromatic movement
  // Simple but profound harmonic foundation
  note("<ab1 [g1 bb1] ab1 eb1>")
    .s("sine")
    .lpf(450)
    .gain(0.55)
    .attack(0.1)
    .release(1.5)
    .room(0.45)
    .slow(2),
  
  // Left hand: Inner harmonic voice
  // Fills out the sparse but rich harmony
  note("<[cb2 eb2] [bb1 d2] [ab1 cb2] [gb1 bb1]>")
    .s("square")
    .lpf(700)
    .gain(0.38)
    .attack(0.2)
    .release(1.4)
    .room(0.5)
    .slow(2),
  
  // Additional depth: Sustained low tones
  // Creates the profound, meditative atmosphere
  note("<ab1 eb1>")
    .s("sine")
    .lpf(300)
    .gain(0.3)
    .attack(0.8)
    .release(3.0)
    .room(0.7)
    .slow(8)
)
