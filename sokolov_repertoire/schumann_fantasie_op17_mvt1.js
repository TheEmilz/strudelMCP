// Schumann Fantasie Op.17 - First Movement Theme
// A simplified Strudel interpretation of the passionate opening
// Tempo: Durchaus phantastisch und leidenschaftlich vorzutragen (around 96 BPM)
// "To be performed throughout fantastically and passionately"
//
// Structure: Free fantasy form with multiple contrasting themes
// This captures the main opening theme's character
//
// Harmonic features:
// - Key: C major/minor with extensive chromaticism
// - Rich romantic harmonies with augmented sixth chords
// - Frequent modulations and tonal ambiguity
// - Wide-ranging harmonic palette typical of Schumann
// - Passionate, surging harmonic progressions
//
// Performance notes:
// - Highly expressive with dramatic dynamic contrasts (ff to pp)
// - Extensive use of tempo rubato
// - Wide dynamic range requiring control
// - Rich pedal usage for blending harmonies
// - Heroic, declamatory character in forte passages

setcpm(96)

stack(
  // Right hand: Passionate melodic theme
  // Surging romantic melody with wide intervals
  note("<[c4 e4 g4 c5] [d4 f4 a4 d5] [e4 g4 b4 e5] [f4 a4 c5 f5]>")
    .s("sawtooth")
    .lpf(1800)
    .gain(0.55)
    .attack(0.2)
    .release(1.2)
    .room(0.65)
    .slow(2),
  
  // Right hand: Upper melodic voice with wide leaps
  // Characteristic Schumannesque melody with dramatic contour
  note("<c5 [d5 f5] [e5 g5] [f5 a5]>")
    .s("square")
    .lpf(2200)
    .gain(0.5)
    .attack(0.15)
    .release(1.0)
    .room(0.6)
    .slow(2)
    .sometimes(x => x.gain(0.7)), // Dynamic surges
  
  // Left hand: Rich bass foundation
  // Solid bass notes supporting the dramatic character
  note("<c2 [g1 c2] f2 [e2 g2]>")
    .s("sine")
    .lpf(500)
    .gain(0.65)
    .attack(0.05)
    .release(1.0)
    .room(0.45)
    .slow(2),
  
  // Left hand: Inner chordal accompaniment
  // Rich harmonic filling in tenor register
  note("<[e3 g3] [f3 a3] [g3 b3] [a3 c4]>")
    .s("triangle")
    .lpf(1200)
    .gain(0.45)
    .attack(0.15)
    .release(0.9)
    .room(0.55)
    .slow(2),
  
  // Additional harmonic depth: Extended harmonies
  // Captures the chromatic richness of Schumann's harmony
  note("<[eb3 fs3 bb3] [e3 gs3 b3]>")
    .s("sine")
    .lpf(900)
    .gain(0.3)
    .attack(0.3)
    .release(1.3)
    .room(0.7)
    .slow(4)
)
