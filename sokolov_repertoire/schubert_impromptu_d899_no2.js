// Schubert Impromptu D.899 No.2 in Eb major
// A simplified Strudel interpretation capturing the flowing character
// Tempo: Allegro (around 132 BPM)
//
// Structure: Three-part form with flowing triplet figurations
// The piece is famous for its continuous running passages in the right hand
// with a steady harmonic support in the left hand
//
// Harmonic features:
// - Key: Eb major with modulations to relative minor (C minor)
// - Arpeggiated harmonies creating a harp-like effect
// - Sequences and circle-of-fifths progressions
// - Rich chromatic voice leading in middle section
//
// Performance notes:
// - Right hand triplets should flow smoothly like water
// - Dynamic shaping with crescendos and diminuendos
// - Pedal used to connect harmonies while maintaining clarity
// - Middle section more introspective with deeper bass register

setcpm(132)

stack(
  // Right hand: Flowing triplet arpeggios (simplified pattern)
  // Represents the characteristic running passages
  note("<[eb4 g4 bb4] [f4 ab4 c5] [g4 bb4 eb5] [ab4 c5 eb5]>")
    .s("triangle")
    .lpf(2200)
    .gain(0.4)
    .attack(0.02)
    .release(0.3)
    .room(0.4)
    .fast(3), // Triplet feel
  
  // Additional right hand voice: Melodic top notes
  // The singing melody that emerges from the figuration
  note("<bb4 c5 d5 eb5>")
    .s("sawtooth")
    .lpf(1800)
    .gain(0.35)
    .attack(0.1)
    .release(0.8)
    .room(0.5)
    .slow(2),
  
  // Left hand: Bass and harmonic foundation
  // Alberti-bass style accompaniment
  note("<eb2 [g2 bb2] ab2 [c3 eb3]>")
    .s("sine")
    .lpf(600)
    .gain(0.5)
    .attack(0.05)
    .release(0.6)
    .room(0.3),
  
  // Left hand: Strong bass notes on beats
  note("<eb1 ~ ab1 ~, ~ bb1 ~ eb2>")
    .s("sine")
    .lpf(400)
    .gain(0.6)
    .attack(0.02)
    .release(0.8)
    .room(0.35)
    .slow(2),
  
  // Middle voice: Inner harmonic texture
  note("<g3 ab3 bb3 c4>")
    .s("square")
    .lpf(1000)
    .gain(0.25)
    .attack(0.15)
    .release(0.7)
    .room(0.45)
    .slow(2)
)
