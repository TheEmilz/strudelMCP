// Schubert Piano Sonata D.960 in Bb major - First Movement Theme
// A simplified Strudel interpretation of the profound opening
// Tempo: Molto moderato (around 60 BPM)
//
// Structure: Sonata form with expansive themes
// Schubert's last and greatest piano sonata, one of the pinnacles of the literature
//
// Harmonic features:
// - Key: Bb major with characteristic Schubertian modulations
// - Distinctive low trill in the bass (signature element)
// - Expansive harmonic scope with remote modulations
// - Mixture of major and minor modes
// - Long-range harmonic planning
// - Deeply expressive chromatic moments
//
// Performance notes:
// - Broad, expansive character
// - Singing melody with profound simplicity
// - The low trill creates mysterious, shadowy effect
// - Wide dynamic range but with restraint
// - Each phrase carefully shaped
// - Contemplative, almost otherworldly atmosphere
// - Long singing lines requiring breath control

setcpm(60)

stack(
  // Right hand: Main theme - simple but profound
  // Schubert's characteristic simplicity concealing depth
  note("<bb4 [a4 bb4] c5 d5>")
    .s("sine")
    .lpf(1500)
    .gain(0.5)
    .attack(0.2)
    .release(1.8)
    .room(0.6)
    .slow(2),
  
  // Right hand: Harmonic support
  // Fills out the melodic texture
  note("<[d4 f4] [c4 eb4] [d4 f4] [f4 bb4]>")
    .s("triangle")
    .lpf(1200)
    .gain(0.38)
    .attack(0.15)
    .release(1.5)
    .room(0.55)
    .slow(2),
  
  // Left hand: The famous low trill (signature element)
  // Creates mysterious, unsettling undercurrent
  note("gb1 f1")
    .s("sine")
    .lpf(350)
    .gain(0.4)
    .attack(0.05)
    .release(0.4)
    .room(0.35)
    .fast(8), // Rapid alternation creates trill effect
  
  // Left hand: Bass line foundation
  // Simple but solid harmonic support
  note("<bb1 f1 bb1 bb1>")
    .s("sine")
    .lpf(450)
    .gain(0.55)
    .attack(0.08)
    .release(1.5)
    .room(0.4)
    .slow(2),
  
  // Left hand: Middle register harmonies
  // Creates the rich, warm harmonic texture
  note("<[bb2 d3 f3] [c3 eb3 f3]>")
    .s("square")
    .lpf(800)
    .gain(0.35)
    .attack(0.15)
    .release(1.2)
    .room(0.48)
    .slow(4),
  
  // Additional depth: Sustained bass tones
  // Adds to the profound, contemplative atmosphere
  note("bb0")
    .s("sine")
    .lpf(250)
    .gain(0.25)
    .attack(1.0)
    .release(4.0)
    .room(0.65)
    .slow(8)
)
