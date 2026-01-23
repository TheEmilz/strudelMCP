// Chopin Nocturne Op.9 No.2 in Eb major
// A simplified Strudel interpretation of one of Chopin's most famous nocturnes
// Tempo: Andante (around 132 BPM in 12/8 time, feels like 44 BPM)
//
// Structure: Ornamental melody over flowing accompaniment
// Features elaborate ornamentation and fioritura in the melody
//
// Harmonic features:
// - Key: Eb major with rich chromatic embellishments
// - Classic nocturne texture: melody + accompaniment
// - Chromatic passing tones and neighbor notes
// - Expressive modulations to related keys
// - Rich harmonic palette with altered chords
//
// Performance notes:
// - Extremely expressive rubato in melody
// - Melody should sing above accompaniment
// - Left hand maintains steady flow while right hand is free
// - Delicate dynamic shadings
// - Extensive ornamentation in melody (trills, grace notes)
// - Deep pedal for rich harmonic blend

setcpm(44)

stack(
  // Right hand: Ornamental melody
  // Highly expressive melodic line with embellishments
  note("<[bb4 eb5 g5] [c5 eb5 ab5] [bb4 d5 g5] [bb4 eb5 g5]>")
    .s("sine")
    .lpf(1800)
    .gain(0.52)
    .attack(0.2)
    .release(1.6)
    .room(0.7)
    .slow(2),
  
  // Right hand: Florid ornamentation (grace notes, turns)
  // Represents the elaborate fioritura
  note("<g5 [ab5 g5 f5] [g5 f5 eb5] g5>")
    .s("triangle")
    .lpf(2200)
    .gain(0.38)
    .attack(0.05)
    .release(0.6)
    .room(0.65)
    .fast(3),
  
  // Left hand: Flowing accompaniment pattern
  // Classic Chopinesque "oom-pah-pah" waltz bass
  note("<eb2 [g2 bb2 eb3], bb1 [bb2 d3 f3]>")
    .s("sine")
    .lpf(600)
    .gain(0.45)
    .attack(0.08)
    .release(0.8)
    .room(0.45)
    .fast(1.5),
  
  // Left hand: Deep bass notes
  // Foundational bass on strong beats
  note("<eb1 ~ bb1 ~>")
    .s("sine")
    .lpf(350)
    .gain(0.55)
    .attack(0.05)
    .release(1.3)
    .room(0.4)
    .slow(2),
  
  // Additional color: Sustained harmonies
  // Creates the nocturnal, dreamlike atmosphere
  note("<[g3 bb3 eb4] [ab3 c4 eb4]>")
    .s("sawtooth")
    .lpf(1000)
    .gain(0.25)
    .attack(0.5)
    .release(2.0)
    .room(0.8)
    .slow(4)
)
