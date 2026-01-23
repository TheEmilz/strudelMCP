// Liszt Consolation No.3 in Db major
// A simplified Strudel interpretation of this serene, contemplative piece
// Tempo: Lento placido (around 60 BPM)
// "Slowly, peacefully"
//
// Structure: Simple song form with flowing melody
// One of Liszt's most beloved lyrical pieces
//
// Harmonic features:
// - Key: Db major with lush harmonic colors
// - Flowing arpeggiated accompaniment
// - Rich, Romantic harmonic progressions
// - Smooth voice-leading creating seamless texture
// - Modal mixture and chromatic enrichment
// - Sophisticated harmonic palette despite simplicity
//
// Performance notes:
// - Extremely peaceful, contemplative character
// - Singing, cantabile melody
// - Flowing accompaniment like gentle waves
// - Subtle dynamic shading (mostly p to mf)
// - Rich pedal creating wash of sound
// - Each phrase shaped with loving care
// - Transcendent, spiritual quality

setcpm(60)

stack(
  // Right hand: Singing melody
  // Serene, lyrical melodic line
  note("<[ab4 db5] [gb4 bb4] [ab4 db5] [f4 ab4]>")
    .s("sine")
    .lpf(1600)
    .gain(0.48)
    .attack(0.25)
    .release(1.8)
    .room(0.7)
    .slow(2),
  
  // Right hand: Counter-melody
  // Secondary melodic voice
  note("<f4 eb4 db4 c4>")
    .s("triangle")
    .lpf(1300)
    .gain(0.35)
    .attack(0.2)
    .release(1.5)
    .room(0.65)
    .slow(2),
  
  // Left hand: Flowing arpeggiated accompaniment
  // Gentle, wave-like patterns
  note("<[db2 ab2 db3] [gb1 db2 gb2] [ab1 eb2 ab2] [f2 ab2 db3]>")
    .s("sine")
    .lpf(700)
    .gain(0.4)
    .attack(0.1)
    .release(0.9)
    .room(0.5)
    .fast(2),
  
  // Left hand: Bass foundation
  // Gentle bass support
  note("<db1 gb1 ab1 db1>")
    .s("sine")
    .lpf(350)
    .gain(0.5)
    .attack(0.08)
    .release(1.6)
    .room(0.48)
    .slow(2),
  
  // Middle voice: Harmonic enrichment
  // Creates the lush, Romantic texture
  note("<[f2 ab2 db3] [eb2 gb2 bb2]>")
    .s("sawtooth")
    .lpf(950)
    .gain(0.28)
    .attack(0.3)
    .release(1.4)
    .room(0.68)
    .slow(4)
)
