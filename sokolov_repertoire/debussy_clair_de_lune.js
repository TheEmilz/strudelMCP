// Debussy Clair de Lune from Suite Bergamasque
// A simplified Strudel interpretation of this iconic impressionist piece
// Tempo: Andante très expressif (around 60 BPM)
// "Very expressively"
//
// Structure: Loose ternary form with flowing, atmospheric character
// One of the most famous piano pieces ever written
//
// Harmonic features:
// - Key: Db major with impressionist ambiguity
// - Whole-tone and pentatonic scale influences
// - Parallel chord motion (planing)
// - Ambiguous tonal centers (floating harmonies)
// - Rich ninth and eleventh chords
// - Hazy, dreamlike harmonic progressions
//
// Performance notes:
// - Extremely atmospheric and evocative
// - Delicate touch with subtle dynamic shading
// - Flowing, flexible tempo with rubato
// - Rich pedal creating impressionist wash
// - Moonlit, nocturnal atmosphere
// - Each phrase shaped organically
// - Dreamlike, floating quality throughout

setcpm(60)

stack(
  // Right hand: Flowing melody (moonlight theme)
  // Gentle, singing melody with impressionist colors
  note("<[f4 ab4 db5] [gb4 bb4 eb5] [ab4 c5 f5] [gb4 bb4 eb5]>")
    .s("sine")
    .lpf(1500)
    .gain(0.42)
    .attack(0.3)
    .release(1.8)
    .room(0.75)
    .slow(2),
  
  // Right hand: Arpeggiated figures
  // Harp-like broken chords
  note("<db5 eb5 f5 gb5>")
    .s("triangle")
    .lpf(2000)
    .gain(0.35)
    .attack(0.1)
    .release(1.2)
    .room(0.7)
    .fast(2),
  
  // Left hand: Flowing accompaniment pattern
  // Gentle, wave-like arpeggios
  note("<[db2 ab2 db3] [bb1 f2 bb2] [ab1 eb2 ab2] [gb1 db2 gb2]>")
    .s("sine")
    .lpf(650)
    .gain(0.38)
    .attack(0.12)
    .release(1.0)
    .room(0.55)
    .fast(1.5),
  
  // Left hand: Bass foundation
  // Subtle bass support
  note("<db1 bb1 ab1 gb1>")
    .s("sine")
    .lpf(300)
    .gain(0.45)
    .attack(0.15)
    .release(2.0)
    .room(0.6)
    .slow(2),
  
  // Atmospheric wash: Sustained harmonies
  // Creates the impressionist haze
  note("<[f3 ab3 db4] [eb3 gb3 bb3]>")
    .s("sawtooth")
    .lpf(900)
    .gain(0.22)
    .attack(0.8)
    .release(2.5)
    .room(0.85)
    .slow(4)
)
