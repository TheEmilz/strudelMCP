// Mozart Piano Sonata K.331 in A major - Theme (with variations)
// A simplified Strudel interpretation of the famous opening theme
// Tempo: Andante grazioso (around 120 BPM in 6/8, feels like 40 BPM)
//
// Structure: Theme and variations form (this is the theme)
// One of Mozart's most beloved piano sonatas, ending with "Rondo alla Turca"
//
// Harmonic features:
// - Key: A major with classical period harmonic clarity
// - Elegant, balanced phrases (4+4 bar periods)
// - Clear tonic-dominant relationships
// - Graceful melodic contours with conjunct motion
// - Simple but refined harmonic progressions
// - Classical period transparency and balance
//
// Performance notes:
// - Graceful, elegant character (grazioso)
// - Light, singing tone quality
// - Clear articulation without heaviness
// - Ornaments played tastefully
// - Balanced phrasing with natural breathing points
// - Classical restraint and poise
// - Each note perfectly placed

setcpm(40)

stack(
  // Right hand: Graceful melody
  // Elegant, balanced melodic line characteristic of Mozart
  note("<[e5 cs5] [e5 a5] [gs5 b5] [a5 cs6]>")
    .s("sine")
    .lpf(1800)
    .gain(0.45)
    .attack(0.08)
    .release(0.9)
    .room(0.4)
    .slow(2),
  
  // Right hand: Ornamental figures (grace notes, turns)
  // Mozartean embellishments
  note("<cs5 [d5 cs5 b4] a4 gs4>")
    .s("triangle")
    .lpf(2000)
    .gain(0.35)
    .attack(0.03)
    .release(0.5)
    .room(0.38)
    .fast(2),
  
  // Left hand: Alberti bass accompaniment
  // Classic Mozart-style broken chord patterns
  note("<[a2 cs3 e3] [e2 a2 cs3] [e2 gs2 b2] [a2 cs3 e3]>")
    .s("sine")
    .lpf(700)
    .gain(0.42)
    .attack(0.05)
    .release(0.6)
    .room(0.3)
    .fast(2),
  
  // Left hand: Bass notes on strong beats
  // Provides harmonic foundation
  note("<a1 e1 e1 a1>")
    .s("sine")
    .lpf(400)
    .gain(0.5)
    .attack(0.03)
    .release(0.8)
    .room(0.28)
    .slow(2),
  
  // Middle voice: Harmonic filling
  // Creates fuller texture while maintaining clarity
  note("<cs3 a2 b2 cs3>")
    .s("square")
    .lpf(1000)
    .gain(0.28)
    .attack(0.1)
    .release(0.7)
    .room(0.35)
    .slow(2)
)
