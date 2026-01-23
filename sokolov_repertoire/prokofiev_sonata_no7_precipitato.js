// Prokofiev Piano Sonata No.7 Op.83 - Precipitato (Final Movement Theme)
// A simplified Strudel interpretation of the driving finale
// Tempo: Precipitato (around 152 BPM) - "Headlong, rushing"
//
// Structure: Toccata-like movement with relentless forward drive
// One of Prokofiev's "War Sonatas" - powerful and aggressive
//
// Harmonic features:
// - Key: Bb major/minor with strong modal mixture
// - Driving, motoric rhythms (7/8 time signature)
// - Angular, modernist harmonies
// - Bitonality and polytonal suggestions
// - Percussive, hammered chords
// - Dissonant but structured harmonic language
//
// Performance notes:
// - Relentless, driving energy throughout
// - Percussive, almost violent touch
// - Steady, motoric rhythm never relaxing
// - Strong accents and dynamic contrasts
// - Machine-like precision and power
// - Virtuosic demands with clarity
// - Barbaric, primitive energy

setcpm(152)

stack(
  // Right hand: Driving motoric pattern
  // Relentless repeated-note patterns
  note("<bb4 bb4 bb4 c5 bb4 bb4 a4>")
    .s("square")
    .lpf(1800)
    .gain(0.6)
    .attack(0.01)
    .release(0.3)
    .room(0.3)
    .fast(2),
  
  // Right hand: Percussive chords (accents)
  // Angular, dissonant chords
  note("<[bb4 d5 f5] [c5 e5 g5]>")
    .s("sawtooth")
    .lpf(2000)
    .gain(0.65)
    .attack(0.01)
    .release(0.25)
    .room(0.28)
    .slow(2),
  
  // Left hand: Powerful bass ostinato
  // Driving bass pattern in 7/8 feel
  note("<bb2 f2 bb2 c3 bb2 f2 a2>")
    .s("sine")
    .lpf(600)
    .gain(0.7)
    .attack(0.01)
    .release(0.4)
    .room(0.25)
    .fast(2),
  
  // Left hand: Strong bass accents
  // Hammered bass notes
  note("<bb1 ~ c2 ~>")
    .s("sine")
    .lpf(350)
    .gain(0.75)
    .attack(0.01)
    .release(0.5)
    .room(0.22)
    .slow(2),
  
  // Additional percussive layer
  // Creates the aggressive, mechanical texture
  note("<[d3 f3 bb3] [e3 g3 c4]>")
    .s("triangle")
    .lpf(1200)
    .gain(0.5)
    .attack(0.01)
    .release(0.35)
    .room(0.25)
    .slow(4)
)
