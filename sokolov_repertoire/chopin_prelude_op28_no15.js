// Chopin Prelude Op.28 No.15 "Raindrop" in Db major
// A simplified Strudel interpretation of the famous "Raindrop" prelude
// Tempo: Sostenuto (around 80 BPM)
//
// Structure: A-B-A form with continuous repeated note (the "raindrop")
// Section A: Lyrical melody in Db major over Ab pedal point
// Section B: Darker middle section in C# minor with dramatic crescendo
//
// Harmonic features:
// - Key: Db major (A section), C# minor (B section - enharmonically same tonic)
// - Constant Ab (G#) pedal point throughout creating the "raindrop" effect
// - Rich harmonic progressions with chromatic elements
// - Modal interchange between major and minor modes
//
// Performance notes:
// - The repeated Ab/G# note should be played with subtle dynamic variation
// - A section is serene and cantabile
// - B section builds dramatic intensity with crescendo
// - Return to A section brings peaceful resolution

setcpm(80)

stack(
  // The famous "raindrop" - continuous Ab pedal point
  // This repeated note is the signature element of the piece
  note("ab3")
    .s("sine")
    .gain(0.35)
    .attack(0.05)
    .release(0.4)
    .room(0.3)
    .every(4, x => x.gain(0.42)), // Subtle emphasis every 4th note
  
  // Right hand: Lyrical melody (A section simplified)
  // Cantabile melodic line with expressive contour
  note("<[f4 ab4 db5] [gb4 bb4 eb5] [ab4 c5 f5] [gb4 bb4 eb5]>")
    .s("sawtooth")
    .lpf(1500)
    .gain(0.45)
    .attack(0.4)
    .release(1.8)
    .room(0.6)
    .slow(2),
  
  // Left hand: Bass and harmonic support (A section)
  // Rich bass notes supporting the harmony
  note("<db2 [bb1 eb2] ab1 [gb1 bb1]>")
    .s("sine")
    .lpf(500)
    .gain(0.5)
    .attack(0.2)
    .release(1.2)
    .room(0.4)
    .slow(2),
  
  // Middle section suggestion (darker harmonies)
  // Brief nod to the dramatic B section with darker colors
  note("<eb3 gb3 bb3>")
    .s("triangle")
    .lpf(900)
    .gain(0.3)
    .attack(0.3)
    .release(1.0)
    .room(0.5)
    .slow(4)
    .sometimes(x => x.gain(0.5).lpf(600)) // Occasional darker emphasis
)
