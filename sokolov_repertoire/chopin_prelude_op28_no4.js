// Chopin Prelude Op.28 No.4 in E minor
// A simplified Strudel interpretation capturing the melancholic character
// Original tempo: Largo (around 60-72 BPM)
// 
// Structure: The piece features a descending chromatic bass line
// with sustained chords in the right hand creating a funeral march atmosphere
// 
// Harmonic features:
// - Key: E minor with chromaticism
// - The bass descends chromatically creating tension
// - Upper voices sustain creating a chorale-like texture
// - Modal mixture and chromatic voice leading
//
// Performance notes:
// - Very expressive, with subtle tempo rubato
// - Dynamics range from p to pp with occasional crescendos
// - Pedal is crucial for sustaining harmonies

setcpm(68)

stack(
  // Left hand: Descending chromatic bass line (simplified)
  // The bass creates the harmonic foundation moving chromatically downward
  note("<e2 [d2 db2] c2 b1>, <a1 ab1 g1 fs1>, <f1 e1 eb1 d1>")
    .s("sine")
    .lpf(400)
    .gain(0.6)
    .room(0.4)
    .release(0.8)
    .slow(4),
  
  // Right hand: Sustained chord progression (melody and harmony)
  // Upper voices create the expressive melodic line with harmonic support
  note("<[e4 g4 b4] [e4 fs4 a4 c5] [d4 fs4 a4] [d4 g4 b4]>")
    .s("sawtooth")
    .lpf(1200)
    .gain(0.4)
    .attack(0.3)
    .release(1.5)
    .room(0.6)
    .slow(4),
  
  // Middle voice: Additional harmonic texture
  note("<g3 a3 fs3 g3>")
    .s("triangle")
    .lpf(800)
    .gain(0.25)
    .attack(0.2)
    .release(1.2)
    .room(0.5)
    .slow(4)
)
