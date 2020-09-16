import { Chords, Timbres } from '../defs.js';

// subtest number -> [[audio_idx, chord, transposition, timbre], ...]
export const audio_mapping = [
  // Subtest A
  [[57, Chords.BIG_MAJOR, 0, Timbres.PIANO], [58, Chords.BIG_MAJOR, 1, Timbres.PIANO],
   [59, Chords.BIG_MAJOR, 2, Timbres.PIANO], [60, Chords.BIG_MAJOR, 3, Timbres.PIANO],
   [61, Chords.SMALL_MAJOR, 0, Timbres.PIANO], [62, Chords.SMALL_MAJOR, 1, Timbres.PIANO],
   [63, Chords.SMALL_MAJOR, 2, Timbres.PIANO], [64, Chords.SMALL_MAJOR, 3, Timbres.PIANO],
   [65, Chords.SMALL_MINOR, 0, Timbres.PIANO], [66, Chords.SMALL_MINOR, 1, Timbres.PIANO],
   [67, Chords.SMALL_MINOR, 2, Timbres.PIANO], [68, Chords.SMALL_MINOR, 3, Timbres.PIANO],
   [69, Chords.HALF_DIM, 0, Timbres.PIANO], [70, Chords.HALF_DIM, 1, Timbres.PIANO],
   [71, Chords.HALF_DIM, 2, Timbres.PIANO], [72, Chords.HALF_DIM, 3, Timbres.PIANO],

   [73, Chords.BIG_MAJOR, 0, Timbres.GUITAR], [74, Chords.BIG_MAJOR, 1, Timbres.GUITAR],
   [75, Chords.BIG_MAJOR, 2, Timbres.GUITAR], [76, Chords.BIG_MAJOR, 3, Timbres.GUITAR],
   [77, Chords.SMALL_MAJOR, 0, Timbres.GUITAR], [78, Chords.SMALL_MAJOR, 1, Timbres.GUITAR],
   [79, Chords.SMALL_MAJOR, 2, Timbres.GUITAR], [80, Chords.SMALL_MAJOR, 3, Timbres.GUITAR],
   [81, Chords.SMALL_MINOR, 0, Timbres.GUITAR], [82, Chords.SMALL_MINOR, 1, Timbres.GUITAR],
   [83, Chords.SMALL_MINOR, 2, Timbres.GUITAR], [84, Chords.SMALL_MINOR, 3, Timbres.GUITAR],
   [85, Chords.HALF_DIM, 0, Timbres.GUITAR], [86, Chords.HALF_DIM, 1, Timbres.GUITAR],
   [87, Chords.HALF_DIM, 2, Timbres.GUITAR], [88, Chords.HALF_DIM, 3, Timbres.GUITAR],   
  ],

  // Subtest B
  [[89, Chords.BIG_MAJOR, 0, Timbres.SONG], [90, Chords.SMALL_MAJOR, 0, Timbres.SONG],
   [91, Chords.SMALL_MINOR, 0, Timbres.SONG], [92, Chords.HALF_DIM, 0, Timbres.SONG],
   [93, Chords.BIG_MAJOR, 1, Timbres.SONG], [94, Chords.BIG_MAJOR, 2, Timbres.SONG],
   [95, Chords.BIG_MAJOR, 3, Timbres.SONG], [96, Chords.SMALL_MAJOR, 1, Timbres.SONG],
   [97, Chords.SMALL_MAJOR, 2, Timbres.SONG], [98, Chords.SMALL_MAJOR, 3, Timbres.SONG],
   [99, Chords.SMALL_MINOR, 1, Timbres.SONG], [100, Chords.SMALL_MINOR, 2, Timbres.SONG],
   [101, Chords.SMALL_MINOR, 3, Timbres.SONG], [102, Chords.HALF_DIM, 1, Timbres.SONG],
   [103, Chords.HALF_DIM, 3, Timbres.SONG], [104, Chords.HALF_DIM, 2, Timbres.SONG],
  ],

  // Subtest C
  [[105, Chords.BIG_MAJOR, 0, Timbres.PIANO], [106, Chords.BIG_MAJOR, 1, Timbres.PIANO],
   [107, Chords.BIG_MAJOR, 2, Timbres.PIANO], [108, Chords.BIG_MAJOR, 3, Timbres.PIANO],
   [109, Chords.BIG_MAJOR, 0, Timbres.PIANO], [110, Chords.BIG_MAJOR, 1, Timbres.PIANO],
   [111, Chords.BIG_MAJOR, 2, Timbres.PIANO], [112, Chords.BIG_MAJOR, 3, Timbres.PIANO],
   [113, Chords.BIG_MAJOR, 0, Timbres.PIANO], [114, Chords.BIG_MAJOR, 1, Timbres.PIANO],
   [115, Chords.BIG_MAJOR, 2, Timbres.PIANO], [116, Chords.BIG_MAJOR, 3, Timbres.PIANO],
   [117, Chords.BIG_MAJOR, 0, Timbres.PIANO], [118, Chords.BIG_MAJOR, 1, Timbres.PIANO],
   [119, Chords.BIG_MAJOR, 2, Timbres.PIANO], [120, Chords.BIG_MAJOR, 3, Timbres.PIANO],

   [121, Chords.SMALL_MAJOR, 0, Timbres.PIANO], [122, Chords.SMALL_MAJOR, 1, Timbres.PIANO],
   [123, Chords.SMALL_MAJOR, 2, Timbres.PIANO], [124, Chords.SMALL_MAJOR, 3, Timbres.PIANO],
   [125, Chords.SMALL_MAJOR, 0, Timbres.PIANO], [126, Chords.SMALL_MAJOR, 1, Timbres.PIANO],
   [127, Chords.SMALL_MAJOR, 2, Timbres.PIANO], [128, Chords.SMALL_MAJOR, 3, Timbres.PIANO],
   [129, Chords.SMALL_MAJOR, 0, Timbres.PIANO], [130, Chords.SMALL_MAJOR, 1, Timbres.PIANO],
   [131, Chords.SMALL_MAJOR, 2, Timbres.PIANO], [132, Chords.SMALL_MAJOR, 3, Timbres.PIANO],
   [133, Chords.SMALL_MAJOR, 0, Timbres.PIANO], [134, Chords.SMALL_MAJOR, 1, Timbres.PIANO],
   [135, Chords.SMALL_MAJOR, 2, Timbres.PIANO], [136, Chords.SMALL_MAJOR, 3, Timbres.PIANO],

   [137, Chords.SMALL_MINOR, 0, Timbres.PIANO], [138, Chords.SMALL_MINOR, 1, Timbres.PIANO],
   [139, Chords.SMALL_MINOR, 2, Timbres.PIANO], [140, Chords.SMALL_MINOR, 3, Timbres.PIANO],
   [141, Chords.SMALL_MINOR, 0, Timbres.PIANO], [142, Chords.SMALL_MINOR, 1, Timbres.PIANO],
   [143, Chords.SMALL_MINOR, 2, Timbres.PIANO], [144, Chords.SMALL_MINOR, 3, Timbres.PIANO],
   [145, Chords.SMALL_MINOR, 0, Timbres.PIANO], [146, Chords.SMALL_MINOR, 1, Timbres.PIANO],
   [147, Chords.SMALL_MINOR, 2, Timbres.PIANO], [148, Chords.SMALL_MINOR, 3, Timbres.PIANO],
   [149, Chords.SMALL_MINOR, 0, Timbres.PIANO], [150, Chords.SMALL_MINOR, 1, Timbres.PIANO],
   [151, Chords.SMALL_MINOR, 2, Timbres.PIANO], [152, Chords.SMALL_MINOR, 3, Timbres.PIANO],

   [153, Chords.HALF_DIM, 0, Timbres.PIANO], [154, Chords.HALF_DIM, 1, Timbres.PIANO],
   [155, Chords.HALF_DIM, 2, Timbres.PIANO], [156, Chords.HALF_DIM, 3, Timbres.PIANO],
   [157, Chords.HALF_DIM, 0, Timbres.PIANO], [158, Chords.HALF_DIM, 1, Timbres.PIANO],
   [159, Chords.HALF_DIM, 2, Timbres.PIANO], [160, Chords.HALF_DIM, 3, Timbres.PIANO],
   [161, Chords.HALF_DIM, 0, Timbres.PIANO], [162, Chords.HALF_DIM, 1, Timbres.PIANO],
   [163, Chords.HALF_DIM, 2, Timbres.PIANO], [164, Chords.HALF_DIM, 3, Timbres.PIANO],
   [165, Chords.HALF_DIM, 0, Timbres.PIANO], [166, Chords.HALF_DIM, 1, Timbres.PIANO],
   [167, Chords.HALF_DIM, 2, Timbres.PIANO], [168, Chords.HALF_DIM, 3, Timbres.PIANO],

   // guitar
   [169, Chords.BIG_MAJOR, 0, Timbres.GUITAR], [170, Chords.BIG_MAJOR, 1, Timbres.GUITAR],
   [171, Chords.BIG_MAJOR, 2, Timbres.GUITAR], [172, Chords.BIG_MAJOR, 3, Timbres.GUITAR],
   [173, Chords.BIG_MAJOR, 0, Timbres.GUITAR], [174, Chords.BIG_MAJOR, 1, Timbres.GUITAR],
   [175, Chords.BIG_MAJOR, 2, Timbres.GUITAR], [176, Chords.BIG_MAJOR, 3, Timbres.GUITAR],
   [177, Chords.BIG_MAJOR, 0, Timbres.GUITAR], [178, Chords.BIG_MAJOR, 1, Timbres.GUITAR],
   [179, Chords.BIG_MAJOR, 2, Timbres.GUITAR], [180, Chords.BIG_MAJOR, 3, Timbres.GUITAR],
   [181, Chords.BIG_MAJOR, 0, Timbres.GUITAR], [182, Chords.BIG_MAJOR, 1, Timbres.GUITAR],
   [183, Chords.BIG_MAJOR, 2, Timbres.GUITAR], [184, Chords.BIG_MAJOR, 3, Timbres.GUITAR],

   [185, Chords.SMALL_MAJOR, 0, Timbres.GUITAR], [186, Chords.SMALL_MAJOR, 1, Timbres.GUITAR],
   [187, Chords.SMALL_MAJOR, 2, Timbres.GUITAR], [188, Chords.SMALL_MAJOR, 3, Timbres.GUITAR],
   [189, Chords.SMALL_MAJOR, 0, Timbres.GUITAR], [190, Chords.SMALL_MAJOR, 1, Timbres.GUITAR],
   [191, Chords.SMALL_MAJOR, 2, Timbres.GUITAR], [192, Chords.SMALL_MAJOR, 3, Timbres.GUITAR],
   [193, Chords.SMALL_MAJOR, 0, Timbres.GUITAR], [194, Chords.SMALL_MAJOR, 1, Timbres.GUITAR],
   [195, Chords.SMALL_MAJOR, 2, Timbres.GUITAR], [196, Chords.SMALL_MAJOR, 3, Timbres.GUITAR],
   [197, Chords.SMALL_MAJOR, 0, Timbres.GUITAR], [198, Chords.SMALL_MAJOR, 1, Timbres.GUITAR],
   [199, Chords.SMALL_MAJOR, 2, Timbres.GUITAR], [200, Chords.SMALL_MAJOR, 3, Timbres.GUITAR],

   [201, Chords.SMALL_MINOR, 0, Timbres.GUITAR], [202, Chords.SMALL_MINOR, 1, Timbres.GUITAR],
   [203, Chords.SMALL_MINOR, 2, Timbres.GUITAR], [204, Chords.SMALL_MINOR, 3, Timbres.GUITAR],
   [205, Chords.SMALL_MINOR, 0, Timbres.GUITAR], [206, Chords.SMALL_MINOR, 1, Timbres.GUITAR],
   [207, Chords.SMALL_MINOR, 2, Timbres.GUITAR], [208, Chords.SMALL_MINOR, 3, Timbres.GUITAR],
   [209, Chords.SMALL_MINOR, 0, Timbres.GUITAR], [210, Chords.SMALL_MINOR, 1, Timbres.GUITAR],
   [211, Chords.SMALL_MINOR, 2, Timbres.GUITAR], [212, Chords.SMALL_MINOR, 3, Timbres.GUITAR],
   [213, Chords.SMALL_MINOR, 0, Timbres.GUITAR], [214, Chords.SMALL_MINOR, 1, Timbres.GUITAR],
   [215, Chords.SMALL_MINOR, 2, Timbres.GUITAR], [216, Chords.SMALL_MINOR, 3, Timbres.GUITAR],

   [217, Chords.HALF_DIM, 0, Timbres.GUITAR], [218, Chords.HALF_DIM, 1, Timbres.GUITAR],
   [219, Chords.HALF_DIM, 2, Timbres.GUITAR], [220, Chords.HALF_DIM, 3, Timbres.GUITAR],
   [221, Chords.HALF_DIM, 0, Timbres.GUITAR], [222, Chords.HALF_DIM, 1, Timbres.GUITAR],
   [223, Chords.HALF_DIM, 2, Timbres.GUITAR], [224, Chords.HALF_DIM, 3, Timbres.GUITAR],
   [225, Chords.HALF_DIM, 0, Timbres.GUITAR], [226, Chords.HALF_DIM, 1, Timbres.GUITAR],
   [227, Chords.HALF_DIM, 2, Timbres.GUITAR], [228, Chords.HALF_DIM, 3, Timbres.GUITAR],
   [229, Chords.HALF_DIM, 0, Timbres.GUITAR], [230, Chords.HALF_DIM, 1, Timbres.GUITAR],
   [231, Chords.HALF_DIM, 2, Timbres.GUITAR], [232, Chords.HALF_DIM, 3, Timbres.GUITAR],
  ],
];

export const test_a_indexing = (chord, transposition, timbre) => {
  let idx = 0;
  if (timbre === Timbres.PIANO) idx += 0;
  else if (timbre === Timbres.GUITAR) idx += 16;

  switch (chord) {
    case Chords.BIG_MAJOR: idx += 0; break;
    case Chords.SMALL_MAJOR: idx += 4; break;
    case Chords.SMALL_MINOR: idx += 8; break;
    case Chords.HALF_DIM: idx += 12; break;
  }

  return idx + transposition;
};

export const test_c_indexing = (chord, transposition, timbre, type) => {
  /*
  PIANO>
    BIG_MAJOR:    0-15
    SMALL_MAJOR: 16-31
    SMALL_MINOR: 32-47
    HALF_DIM:    48-63
  GUITAR>
    BIG_MAJOR:   64-79
    SMALL_MAJOR: 80-95
    SMALL_MINOR: 96-111
    HALF_DIM:   112-127  
  */

  let idx = 0;
  if (timbre === Timbres.PIANO) idx += 0;
  else if (timbre === Timbres.GUITAR) idx += 64;

  switch (chord) {
    case Chords.BIG_MAJOR: idx += 0; break;
    case Chords.SMALL_MAJOR: idx += 16; break;
    case Chords.SMALL_MINOR: idx += 32; break;
    case Chords.HALF_DIM: idx += 48; break;
  }

  return idx + type*4 + transposition;
};
