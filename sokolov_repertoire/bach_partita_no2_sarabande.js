// Bach Partita No.2 in C minor BWV 826 - Sarabande
// A simplified Strudel interpretation capturing the Baroque dance character
// Tempo: Slow, stately (around 60 BPM in 3/4 time)
//
// Structure: Binary form (A-A-B-B) typical of Baroque dance movements
// Sarabande: Spanish dance in slow triple meter with emphasis on beat 2
//
// Harmonic features:
// - Key: C minor with Baroque harmonic progressions
// - Strong bass line with figured bass implications
// - Contrapuntal texture with independent voices
// - Harmonic rhythm emphasizes beat 2 (characteristic of Sarabande)
// - Circle-of-fifths progressions typical of Bach
// - Suspension chains and voice-leading
//
// Performance notes:
// - Dignified, stately character
// - Emphasis on second beat of each measure
// - Rich ornamentation (trills, mordents) on sustained notes
// - Clear articulation of individual voices
// - Moderate use of pedal to connect harmonies
// - Noble, serious affect

setcpm(60)

stack(
  // Right hand: Ornamented melody (soprano voice)
  // Baroque melodic line with characteristic ornamentation
  note("<[c5 eb5] [d5 f5] [eb5 g5] [d5 f5]>")
    .s("sine")
    .lpf(1600)
    .gain(0.48)
    .attack(0.1)
    .release(1.2)
    .room(0.4)
    .slow(2),
  
  // Right hand: Alto voice (inner part)
  // Independent contrapuntal line
  note("<g4 ab4 g4 ab4>")
    .s("triangle")
    .lpf(1200)
    .gain(0.38)
    .attack(0.08)
    .release(1.0)
    .room(0.35)
    .slow(2),
  
  // Left hand: Tenor voice (inner part)
  // Creates the rich harmonic texture
  note("<eb3 f3 g3 ab3>")
    .s("square")
    .lpf(900)
    .gain(0.4)
    .attack(0.08)
    .release(0.9)
    .room(0.35)
    .slow(2),
  
  // Left hand: Bass line (basso continuo foundation)
  // Strong, stepwise bass typical of Baroque style
  note("<c2 [bb1 ab1] [g1 f1] [eb1 d1]>")
    .s("sine")
    .lpf(500)
    .gain(0.55)
    .attack(0.05)
    .release(1.0)
    .room(0.3)
    .slow(2),
  
  // Emphasis on beat 2 (characteristic Sarabande accent)
  // Harmonic emphasis on the second beat
  note("<~ [d4 f4 ab4] ~>")
    .s("sawtooth")
    .lpf(1100)
    .gain(0.35)
    .attack(0.05)
    .release(0.8)
    .room(0.38)
    .slow(2)
)
