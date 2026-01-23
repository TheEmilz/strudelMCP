// Brahms Intermezzo Op.118 No.2 in A major
// A simplified Strudel interpretation of this tender, introspective piece
// Tempo: Andante teneramente (around 72 BPM) - "tenderly"
//
// Structure: A-B-A form with lyrical melody over arpeggiated accompaniment
// One of Brahms's most beloved late piano pieces
//
// Harmonic features:
// - Key: A major with rich chromatic harmony
// - Suspension-laden voice leading creating gentle dissonances
// - Warm, autumnal harmonic colors
// - Inner voice counterpoint typical of late Brahms
// - Seamless modulations to related keys
//
// Performance notes:
// - Extremely tender and introspective character
// - Gentle, singing tone in melody
// - Arpeggiated left hand creates harp-like texture
// - Subtle dynamic shading (mostly p to pp)
// - Rich pedal for blending, but with clarity
// - Each note lovingly shaped

setcpm(72)

stack(
  // Right hand: Singing melody (top voice)
  // Tender, introspective melodic line
  note("<[a4 cs5] [b4 d5] [cs5 e5] [d5 fs5]>")
    .s("sine")
    .lpf(1600)
    .gain(0.5)
    .attack(0.3)
    .release(1.5)
    .room(0.65)
    .slow(2),
  
  // Right hand: Middle voice creating rich harmony
  // Inner voice counterpoint characteristic of Brahms
  note("<cs4 d4 e4 fs4>")
    .s("triangle")
    .lpf(1200)
    .gain(0.35)
    .attack(0.25)
    .release(1.3)
    .room(0.6)
    .slow(2),
  
  // Left hand: Arpeggiated accompaniment pattern
  // Broken chord patterns creating flowing texture
  note("<[a2 e3 a3] [d2 fs3 b3] [cs2 e3 a3] [fs2 a3 d4]>")
    .s("sine")
    .lpf(800)
    .gain(0.4)
    .attack(0.1)
    .release(0.8)
    .room(0.45)
    .fast(2),
  
  // Left hand: Bass notes (on strong beats)
  // Foundational bass providing harmonic grounding
  note("<a1 d2 a1 fs1>")
    .s("sine")
    .lpf(400)
    .gain(0.55)
    .attack(0.05)
    .release(1.2)
    .room(0.4)
    .slow(2),
  
  // Additional warmth: Sustained inner harmonies
  // Creates the rich, autumnal harmonic glow
  note("<[e3 gs3] [fs3 a3]>")
    .s("sawtooth")
    .lpf(1000)
    .gain(0.25)
    .attack(0.4)
    .release(1.8)
    .room(0.7)
    .slow(4)
)
