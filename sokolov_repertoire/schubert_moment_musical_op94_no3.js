// Schubert Moment Musical Op.94 No.3 in F minor
// A simplified Strudel interpretation of this dance-like piece
// Tempo: Allegro moderato (around 120 BPM)
//
// Structure: A-B-A-B-A form with contrasting major and minor sections
// Section A: Graceful dance in F minor
// Section B: Lighter character in F major (Trio)
//
// Harmonic features:
// - Key: F minor (A sections), F major (B sections)
// - Modal contrast between minor melancholy and major brightness
// - Simple diatonic harmonies with occasional chromatic passing tones
// - Clear periodic phrase structure (8-bar phrases)
//
// Performance notes:
// - Dance-like character with gentle rhythmic lilt
// - A sections: tender and somewhat melancholic
// - B sections: lighter, more playful character
// - Subtle dynamic contrasts between sections
// - Smooth legato touch throughout

setcpm(120)

stack(
  // Right hand: Melodic line (A section - F minor)
  // Dance-like melody with characteristic dotted rhythms
  note("<[f4 ab4 c5] [eb4 g4 bb4] [f4 ab4 c5] [g4 bb4 db5]>")
    .s("sawtooth")
    .lpf(1600)
    .gain(0.45)
    .attack(0.15)
    .release(0.9)
    .room(0.5)
    .slow(2),
  
  // Right hand upper voice: Top melody notes
  note("<c5 bb4 ab4 g4>")
    .s("triangle")
    .lpf(2000)
    .gain(0.4)
    .attack(0.1)
    .release(0.8)
    .room(0.55)
    .slow(2),
  
  // Left hand: Waltz-like accompaniment pattern
  // Bass note followed by chord (oom-pah-pah pattern)
  note("<f2 [ab2 c3] [ab2 c3], bb1 [db2 f2] [db2 f2]>")
    .s("sine")
    .lpf(600)
    .gain(0.5)
    .attack(0.05)
    .release(0.6)
    .room(0.35)
    .slow(2),
  
  // B section suggestion (F major - brighter character)
  // Occasional brighter harmonies suggesting the major mode Trio
  note("<a4 c5 f5>")
    .s("square")
    .lpf(1400)
    .gain(0.3)
    .attack(0.2)
    .release(0.7)
    .room(0.5)
    .slow(8)
    .sometimes(x => x.gain(0.45)), // Occasionally emphasized
  
  // Inner voice: Harmonic filling
  note("<ab3 g3 f3 eb3>")
    .s("square")
    .lpf(1000)
    .gain(0.28)
    .attack(0.15)
    .release(0.75)
    .room(0.45)
    .slow(2)
)
