# Sokolov Repertoire - Classical Piano Transcriptions for Strudel

A collection of simplified Strudel interpretations of classical piano masterpieces from the repertoire often performed by the legendary pianist Grigory Sokolov. These educational transcriptions capture the essential musical character, harmonic structures, and expressive qualities of these timeless works.

## About This Collection

This collection contains 16 original Strudel code files that interpret classical piano works spanning from Bach to Prokofiev. Each file is a simplified, educational representation designed to:

- Capture the essential musical character of the original work
- Demonstrate harmonic structures and voice-leading
- Illustrate tempo, dynamics, and expressive markings
- Provide runnable code for the Strudel live coding environment
- Include extensive comments explaining musical features

**Important Note:** These are simplified, educational interpretations based on general knowledge of these public domain classical works. They are not note-for-note transcriptions of any specific edition or performance, but rather original creative interpretations that capture the musical essence of each piece.

## Pieces Included

### Romantic Era

1. **Chopin Prelude Op.28 No.4 in E minor** (`chopin_prelude_op28_no4.js`)
   - Tempo: Largo (68 BPM)
   - Character: Melancholic, funeral march-like
   - Features: Descending chromatic bass, sustained chords

2. **Chopin Prelude Op.28 No.15 "Raindrop" in Db major** (`chopin_prelude_op28_no15.js`)
   - Tempo: Sostenuto (80 BPM)
   - Character: Lyrical with continuous repeated note (the "raindrop")
   - Features: Ab pedal point throughout, A-B-A form

3. **Chopin Nocturne Op.9 No.2 in Eb major** (`chopin_nocturne_op9_no2.js`)
   - Tempo: Andante (44 BPM)
   - Character: Ornamental, dreamy nocturnal atmosphere
   - Features: Florid melody over flowing accompaniment

4. **Schubert Impromptu D.899 No.2 in Eb major** (`schubert_impromptu_d899_no2.js`)
   - Tempo: Allegro (132 BPM)
   - Character: Flowing triplet figurations, harp-like
   - Features: Continuous running passages

5. **Schubert Moment Musical Op.94 No.3 in F minor** (`schubert_moment_musical_op94_no3.js`)
   - Tempo: Allegro moderato (120 BPM)
   - Character: Dance-like with gentle lilt
   - Features: Waltz-like accompaniment, modal contrast

6. **Schubert Piano Sonata D.960 in Bb major - First Movement Theme** (`schubert_sonata_d960_theme.js`)
   - Tempo: Molto moderato (60 BPM)
   - Character: Profound, contemplative
   - Features: Famous low trill, expansive themes

7. **Schumann Fantasie Op.17 - First Movement Theme** (`schumann_fantasie_op17_mvt1.js`)
   - Tempo: Durchaus phantastisch (96 BPM)
   - Character: Passionate, heroic
   - Features: Surging romantic harmonies, wide dynamic range

8. **Brahms Intermezzo Op.118 No.2 in A major** (`brahms_intermezzo_op118_no2.js`)
   - Tempo: Andante teneramente (72 BPM)
   - Character: Tender, introspective
   - Features: Arpeggiated accompaniment, autumnal harmonies

9. **Brahms Intermezzo Op.117 No.1 in Eb major** (`brahms_intermezzo_op117_no1.js`)
   - Tempo: Andante moderato (80 BPM)
   - Character: Lullaby-like, "Sleep softly my child"
   - Features: Rocking motion, scotch snap rhythms

10. **Liszt Consolation No.3 in Db major** (`liszt_consolation_no3.js`)
    - Tempo: Lento placido (60 BPM)
    - Character: Serene, contemplative
    - Features: Flowing arpeggios, lush harmonies

11. **Rachmaninoff Prelude Op.23 No.5 in G minor** (`rachmaninoff_prelude_op23_no5.js`)
    - Tempo: Alla marcia (108 BPM)
    - Character: March-like, powerful
    - Features: Bold rhythmic patterns, orchestral sonority

### Classical Era

12. **Mozart Piano Sonata K.331 in A major - Theme** (`mozart_sonata_k331_theme.js`)
    - Tempo: Andante grazioso (40 BPM in 6/8)
    - Character: Graceful, elegant
    - Features: Alberti bass, balanced phrases

13. **Beethoven Piano Sonata Op.110 - Arioso dolente Theme** (`beethoven_sonata_op110_arioso.js`)
    - Tempo: Adagio ma non troppo (56 BPM)
    - Character: Profoundly moving, "Lamenting song"
    - Features: Recitative-like, late Beethoven harmony

### Baroque Era

14. **Bach Partita No.2 in C minor BWV 826 - Sarabande** (`bach_partita_no2_sarabande.js`)
    - Tempo: Slow, stately (60 BPM)
    - Character: Dignified, noble
    - Features: Contrapuntal texture, emphasis on beat 2

### Impressionist Era

15. **Debussy Clair de Lune from Suite Bergamasque** (`debussy_clair_de_lune.js`)
    - Tempo: Andante très expressif (60 BPM)
    - Character: Atmospheric, moonlit
    - Features: Impressionist harmonies, floating quality

### Modern Era

16. **Prokofiev Piano Sonata No.7 Op.83 - Precipitato** (`prokofiev_sonata_no7_precipitato.js`)
    - Tempo: Precipitato (152 BPM)
    - Character: Relentless, driving, aggressive
    - Features: Motoric rhythms, percussive textures

## Strudel Syntax Overview

Each file uses Strudel's powerful pattern notation:

- `note()` - Defines pitch sequences using scientific pitch notation
- `s()` - Selects synthesizer/sample (sine, sawtooth, triangle, square)
- `lpf()` - Low-pass filter for tone shaping
- `gain()` - Volume control (0.0 to 1.0)
- `attack()` - Note attack time in seconds
- `release()` - Note release time in seconds
- `room()` - Reverb amount (0.0 to 1.0)
- `slow()` / `fast()` - Tempo modulation
- `stack()` - Layer multiple voices/patterns
- `setcpm()` - Set cycles per minute (tempo)

## Usage

### Running in Strudel

1. Visit [strudel.cc](https://strudel.cc/)
2. Copy the code from any `.js` file
3. Paste into the Strudel editor
4. Click "Play" or press Ctrl+Enter
5. Adjust the code and experiment!

### Using with strudelMCP Server

```javascript
// Initialize Strudel
await strudel_init()

// Load a pattern
const pattern = fs.readFileSync('./sokolov_repertoire/chopin_prelude_op28_no4.js', 'utf8')

// Write to Strudel
await strudel_write({ pattern })

// Play
await strudel_play()
```

## Understanding the Code Structure

Each file follows a consistent structure:

```javascript
// 1. Title and tempo marking
setcpm(68)

// 2. Stack multiple voices
stack(
  // Right hand melody
  note("<pitch sequence>")
    .s("synthesizer")
    .lpf(cutoff)
    .gain(volume)
    .attack(time)
    .release(time)
    .room(reverb)
    .slow(factor),
  
  // Left hand bass/accompaniment
  note("<pitch sequence>")
    .s("synthesizer")
    // ... more parameters
)
```

## Musical Concepts Demonstrated

### Harmony
- Chromatic voice leading (Chopin Prelude No.4)
- Pedal points (Chopin "Raindrop")
- Modal mixture (Schubert, Brahms)
- Impressionist harmonies (Debussy)
- Late Romantic chromaticism (Rachmaninoff)

### Texture
- Melody + accompaniment (Mozart, Chopin Nocturne)
- Contrapuntal writing (Bach Sarabande)
- Arpeggiated textures (Schubert Impromptu, Liszt)
- Chordal writing (Rachmaninoff, Prokofiev)

### Form
- Binary form (Bach)
- Ternary form (many pieces)
- Theme and variations (Mozart)
- Through-composed (Schumann)

### Expression
- Tempo rubato (Chopin, Schumann)
- Dynamic contrasts (Beethoven, Prokofiev)
- Articulation (Bach, Mozart)
- Character markings (all pieces)

## Customization

Feel free to modify these patterns:

- **Tempo**: Change `setcpm()` values
- **Timbre**: Try different synthesizers (sine, sawtooth, triangle, square)
- **Effects**: Adjust `lpf()`, `room()`, `delay()`
- **Dynamics**: Modify `gain()` values
- **Articulation**: Change `attack()` and `release()` times
- **Layering**: Add or remove voices in `stack()`

## Educational Value

This collection demonstrates:

1. **Historical Progression**: From Baroque to Modern era
2. **Stylistic Diversity**: Dance forms, nocturnes, preludes, sonatas
3. **Harmonic Evolution**: Simple Baroque to complex Romantic/Modern harmony
4. **Textural Variety**: Monophonic to rich polyphonic textures
5. **Expressive Range**: Intimate to virtuosic, lyrical to percussive

## Technical Notes

- All pieces use simplified voicing suitable for Strudel's capabilities
- Pitches use scientific pitch notation (C4 = middle C)
- Tempo markings are approximate and educational
- Dynamic markings are represented through gain values
- Pedal effects are simulated through room() reverb

## Performance Practice

When running these pieces in Strudel:

1. Start with the written tempo, then adjust to taste
2. Listen for balance between melody and accompaniment
3. Experiment with different synthesizer combinations
4. Try adding effects like delay or chorus
5. Consider combining sections from different pieces

## Limitations

These transcriptions are:
- **Simplified** - Complex passages are reduced
- **Interpretive** - Not literal transcriptions
- **Educational** - Focused on demonstrating concepts
- **Monophonic per voice** - Limited by Strudel's architecture

They are NOT:
- Complete score reproductions
- Performance editions
- Exact transcriptions of recordings
- Suitable for scholarly analysis of specific editions

## Further Exploration

To learn more about these pieces:
- Study the original scores (IMSLP has public domain editions)
- Listen to various recordings and interpretations
- Read about each composer's life and style
- Explore music theory texts on the relevant periods
- Experiment with arranging your own classical pieces in Strudel

## About Grigory Sokolov

Grigory Sokolov (b. 1950) is one of the greatest living pianists, renowned for his profound interpretations of classical piano literature. His repertoire spans from Bach to Shostakovich, with particular depth in Romantic composers like Chopin, Schubert, Schumann, and Brahms. These pieces represent works frequently performed in his recitals and recordings.

## Contributing

Feel free to:
- Add more pieces to the collection
- Improve existing transcriptions
- Add variations or alternative interpretations
- Create teaching materials based on these examples

## License

These original Strudel interpretations are provided for educational purposes. The underlying classical compositions are in the public domain. The Strudel code itself follows the repository's MIT license.

---

*"Music is the universal language of mankind."* - Henry Wadsworth Longfellow

Enjoy exploring classical piano literature through the Strudel live coding environment!
