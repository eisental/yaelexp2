import { Chords, Timbres, Variants } from '../defs.js';

// subtest number -> [[audio_idx, chord, transposition, timbre, variant], ...]
export const audio_mapping = [
  // Subtest A
  [[297, Chords.BIG_MAJOR, 0, Timbres.PIANO, 0], [298, Chords.BIG_MAJOR, 1, Timbres.PIANO, 0],
   [299, Chords.BIG_MAJOR, 2, Timbres.PIANO, 0], [300, Chords.BIG_MAJOR, 3, Timbres.PIANO, 0],
   [301, Chords.SMALL_MAJOR, 0, Timbres.PIANO, 0], [302, Chords.SMALL_MAJOR, 1, Timbres.PIANO, 0],
   [303, Chords.SMALL_MAJOR, 2, Timbres.PIANO, 0], [304, Chords.SMALL_MAJOR, 3, Timbres.PIANO, 0],
   [305, Chords.SMALL_MINOR, 0, Timbres.PIANO, 0], [306, Chords.SMALL_MINOR, 1, Timbres.PIANO, 0],
   [307, Chords.SMALL_MINOR, 2, Timbres.PIANO, 0], [308, Chords.SMALL_MINOR, 3, Timbres.PIANO, 0],
   [309, Chords.HALF_DIM, 0, Timbres.PIANO, 0], [310, Chords.HALF_DIM, 1, Timbres.PIANO, 0],
   [311, Chords.HALF_DIM, 2, Timbres.PIANO, 0], [312, Chords.HALF_DIM, 3, Timbres.PIANO, 0],

   [313, Chords.BIG_MAJOR, 0, Timbres.GUITAR, 0], [314, Chords.BIG_MAJOR, 1, Timbres.GUITAR, 0],
   [315, Chords.BIG_MAJOR, 2, Timbres.GUITAR, 0], [316, Chords.BIG_MAJOR, 3, Timbres.GUITAR, 0],
   [317, Chords.SMALL_MAJOR, 0, Timbres.GUITAR, 0], [318, Chords.SMALL_MAJOR, 1, Timbres.GUITAR, 0],
   [319, Chords.SMALL_MAJOR, 2, Timbres.GUITAR, 0], [320, Chords.SMALL_MAJOR, 3, Timbres.GUITAR, 0],
   [321, Chords.SMALL_MINOR, 0, Timbres.GUITAR, 0], [322, Chords.SMALL_MINOR, 1, Timbres.GUITAR, 0],
   [323, Chords.SMALL_MINOR, 2, Timbres.GUITAR, 0], [324, Chords.SMALL_MINOR, 3, Timbres.GUITAR, 0],
   [325, Chords.HALF_DIM, 0, Timbres.GUITAR, 0], [326, Chords.HALF_DIM, 1, Timbres.GUITAR, 0],
   [327, Chords.HALF_DIM, 2, Timbres.GUITAR, 0], [328, Chords.HALF_DIM, 3, Timbres.GUITAR, 0],   
  ],

  // Subtest B
  [[57, Chords.BIG_MAJOR, 0, Timbres.PIANO, Variants.OPEN], [58, Chords.BIG_MAJOR, 1, Timbres.PIANO, Variants.OPEN],
   [59, Chords.BIG_MAJOR, 2, Timbres.PIANO, Variants.OPEN], [60, Chords.BIG_MAJOR, 3, Timbres.PIANO, Variants.OPEN],
   [61, Chords.BIG_MAJOR, 0, Timbres.PIANO, Variants.INVERSION], [62, Chords.BIG_MAJOR, 1, Timbres.PIANO, Variants.INVERSION],
   [63, Chords.BIG_MAJOR, 2, Timbres.PIANO, Variants.INVERSION], [64, Chords.BIG_MAJOR, 3, Timbres.PIANO, Variants.INVERSION],
   [65, Chords.BIG_MAJOR, 0, Timbres.PIANO, Variants.REGISTER], [66, Chords.BIG_MAJOR, 1, Timbres.PIANO, Variants.REGISTER],
   [67, Chords.BIG_MAJOR, 2, Timbres.PIANO, Variants.REGISTER], [68, Chords.BIG_MAJOR, 3, Timbres.PIANO, Variants.REGISTER],

   [69, Chords.BIG_MAJOR, 0, Timbres.GUITAR, Variants.OPEN], [70, Chords.BIG_MAJOR, 1, Timbres.GUITAR, Variants.OPEN],
   [71, Chords.BIG_MAJOR, 2, Timbres.GUITAR, Variants.OPEN], [72, Chords.BIG_MAJOR, 3, Timbres.GUITAR, Variants.OPEN],
   [73, Chords.BIG_MAJOR, 0, Timbres.GUITAR, Variants.INVERSION], [74, Chords.BIG_MAJOR, 1, Timbres.GUITAR, Variants.INVERSION],
   [75, Chords.BIG_MAJOR, 2, Timbres.GUITAR, Variants.INVERSION], [76, Chords.BIG_MAJOR, 3, Timbres.GUITAR, Variants.INVERSION],
   [77, Chords.BIG_MAJOR, 0, Timbres.GUITAR, Variants.REGISTER], [78, Chords.BIG_MAJOR, 1, Timbres.GUITAR, Variants.REGISTER],
   [79, Chords.BIG_MAJOR, 2, Timbres.GUITAR, Variants.REGISTER], [80, Chords.BIG_MAJOR, 3, Timbres.GUITAR, Variants.REGISTER],

   [81, Chords.SMALL_MAJOR, 0, Timbres.PIANO, Variants.OPEN], [82, Chords.SMALL_MAJOR, 1, Timbres.PIANO, Variants.OPEN],
   [83, Chords.SMALL_MAJOR, 2, Timbres.PIANO, Variants.OPEN], [84, Chords.SMALL_MAJOR, 3, Timbres.PIANO, Variants.OPEN],
   [85, Chords.SMALL_MAJOR, 0, Timbres.PIANO, Variants.INVERSION], [86, Chords.SMALL_MAJOR, 1, Timbres.PIANO, Variants.INVERSION],
   [87, Chords.SMALL_MAJOR, 2, Timbres.PIANO, Variants.INVERSION], [88, Chords.SMALL_MAJOR, 3, Timbres.PIANO, Variants.INVERSION],
   [89, Chords.SMALL_MAJOR, 0, Timbres.PIANO, Variants.REGISTER], [90, Chords.SMALL_MAJOR, 1, Timbres.PIANO, Variants.REGISTER],
   [91, Chords.SMALL_MAJOR, 2, Timbres.PIANO, Variants.REGISTER], [92, Chords.SMALL_MAJOR, 3, Timbres.PIANO, Variants.REGISTER],

   [93, Chords.SMALL_MAJOR, 0, Timbres.GUITAR, Variants.OPEN], [94, Chords.SMALL_MAJOR, 1, Timbres.GUITAR, Variants.OPEN],
   [95, Chords.SMALL_MAJOR, 2, Timbres.GUITAR, Variants.OPEN], [96, Chords.SMALL_MAJOR, 3, Timbres.GUITAR, Variants.OPEN],
   [97, Chords.SMALL_MAJOR, 0, Timbres.GUITAR, Variants.INVERSION], [98, Chords.SMALL_MAJOR, 1, Timbres.GUITAR, Variants.INVERSION],
   [99, Chords.SMALL_MAJOR, 2, Timbres.GUITAR, Variants.INVERSION], [100, Chords.SMALL_MAJOR, 3, Timbres.GUITAR, Variants.INVERSION],
   [101, Chords.SMALL_MAJOR, 0, Timbres.GUITAR, Variants.REGISTER], [102, Chords.SMALL_MAJOR, 1, Timbres.GUITAR, Variants.REGISTER],
   [103, Chords.SMALL_MAJOR, 2, Timbres.GUITAR, Variants.REGISTER], [104, Chords.SMALL_MAJOR, 3, Timbres.GUITAR, Variants.REGISTER],

   [105, Chords.SMALL_MINOR, 0, Timbres.PIANO, Variants.OPEN], [106, Chords.SMALL_MINOR, 1, Timbres.PIANO, Variants.OPEN],
   [107, Chords.SMALL_MINOR, 2, Timbres.PIANO, Variants.OPEN], [108, Chords.SMALL_MINOR, 3, Timbres.PIANO, Variants.OPEN],
   [109, Chords.SMALL_MINOR, 0, Timbres.PIANO, Variants.INVERSION], [110, Chords.SMALL_MINOR, 1, Timbres.PIANO, Variants.INVERSION],
   [111, Chords.SMALL_MINOR, 2, Timbres.PIANO, Variants.INVERSION], [112, Chords.SMALL_MINOR, 3, Timbres.PIANO, Variants.INVERSION],
   [113, Chords.SMALL_MINOR, 0, Timbres.PIANO, Variants.REGISTER], [114, Chords.SMALL_MINOR, 1, Timbres.PIANO, Variants.REGISTER],
   [115, Chords.SMALL_MINOR, 2, Timbres.PIANO, Variants.REGISTER], [116, Chords.SMALL_MINOR, 3, Timbres.PIANO, Variants.REGISTER],

   [117, Chords.SMALL_MINOR, 0, Timbres.GUITAR, Variants.OPEN], [118, Chords.SMALL_MINOR, 1, Timbres.GUITAR, Variants.OPEN],
   [119, Chords.SMALL_MINOR, 2, Timbres.GUITAR, Variants.OPEN], [120, Chords.SMALL_MINOR, 3, Timbres.GUITAR, Variants.OPEN],
   [121, Chords.SMALL_MINOR, 0, Timbres.GUITAR, Variants.INVERSION], [122, Chords.SMALL_MINOR, 1, Timbres.GUITAR, Variants.INVERSION],
   [123, Chords.SMALL_MINOR, 2, Timbres.GUITAR, Variants.INVERSION], [124, Chords.SMALL_MINOR, 3, Timbres.GUITAR, Variants.INVERSION],
   [125, Chords.SMALL_MINOR, 0, Timbres.GUITAR, Variants.REGISTER], [126, Chords.SMALL_MINOR, 1, Timbres.GUITAR, Variants.REGISTER],
   [127, Chords.SMALL_MINOR, 2, Timbres.GUITAR, Variants.REGISTER], [128, Chords.SMALL_MINOR, 3, Timbres.GUITAR, Variants.REGISTER],

   [129, Chords.HALF_DIM, 0, Timbres.PIANO, Variants.OPEN], [130, Chords.HALF_DIM, 1, Timbres.PIANO, Variants.OPEN],
   [131, Chords.HALF_DIM, 2, Timbres.PIANO, Variants.OPEN], [132, Chords.HALF_DIM, 3, Timbres.PIANO, Variants.OPEN],
   [133, Chords.HALF_DIM, 0, Timbres.PIANO, Variants.INVERSION], [134, Chords.HALF_DIM, 1, Timbres.PIANO, Variants.INVERSION],
   [135, Chords.HALF_DIM, 2, Timbres.PIANO, Variants.INVERSION], [136, Chords.HALF_DIM, 3, Timbres.PIANO, Variants.INVERSION],
   [137, Chords.HALF_DIM, 0, Timbres.PIANO, Variants.REGISTER], [138, Chords.HALF_DIM, 1, Timbres.PIANO, Variants.REGISTER],
   [139, Chords.HALF_DIM, 2, Timbres.PIANO, Variants.REGISTER], [140, Chords.HALF_DIM, 3, Timbres.PIANO, Variants.REGISTER],

   [141, Chords.HALF_DIM, 0, Timbres.GUITAR, Variants.OPEN], [142, Chords.HALF_DIM, 1, Timbres.GUITAR, Variants.OPEN],
   [143, Chords.HALF_DIM, 2, Timbres.GUITAR, Variants.OPEN], [144, Chords.HALF_DIM, 3, Timbres.GUITAR, Variants.OPEN],
   [145, Chords.HALF_DIM, 0, Timbres.GUITAR, Variants.INVERSION], [146, Chords.HALF_DIM, 1, Timbres.GUITAR, Variants.INVERSION],
   [147, Chords.HALF_DIM, 2, Timbres.GUITAR, Variants.INVERSION], [148, Chords.HALF_DIM, 3, Timbres.GUITAR, Variants.INVERSION],
   [149, Chords.HALF_DIM, 0, Timbres.GUITAR, Variants.REGISTER], [150, Chords.HALF_DIM, 1, Timbres.GUITAR, Variants.REGISTER],
   [151, Chords.HALF_DIM, 2, Timbres.GUITAR, Variants.REGISTER], [152, Chords.HALF_DIM, 3, Timbres.GUITAR, Variants.REGISTER],

  ],
  // Subtest C 153-168
  [[153, Chords.BIG_MAJOR, 0, Timbres.SONG, 0], [154, Chords.SMALL_MAJOR, 0, Timbres.SONG, 0],
   [155, Chords.SMALL_MINOR, 0, Timbres.SONG, 0], [156, Chords.HALF_DIM, 0, Timbres.SONG, 0],
   [157, Chords.BIG_MAJOR, 1, Timbres.SONG, 0], [158, Chords.BIG_MAJOR, 2, Timbres.SONG, 0],
   [159, Chords.BIG_MAJOR, 3, Timbres.SONG, 0], [160, Chords.SMALL_MAJOR, 1, Timbres.SONG, 0],
   [161, Chords.SMALL_MAJOR, 2, Timbres.SONG, 0], [162, Chords.SMALL_MAJOR, 3, Timbres.SONG, 0],
   [163, Chords.SMALL_MINOR, 1, Timbres.SONG, 0], [164, Chords.SMALL_MINOR, 2, Timbres.SONG, 0],
   [165, Chords.SMALL_MINOR, 3, Timbres.SONG, 0], [166, Chords.HALF_DIM, 1, Timbres.SONG, 0],
   [167, Chords.HALF_DIM, 3, Timbres.SONG, 0], [168, Chords.HALF_DIM, 2, Timbres.SONG, 0],
  ],
  // Subtest D
  [[169, Chords.BIG_MAJOR, 0, Timbres.PIANO, 0], [170, Chords.BIG_MAJOR, 1, Timbres.PIANO, 0],
   [171, Chords.BIG_MAJOR, 2, Timbres.PIANO, 0], [172, Chords.BIG_MAJOR, 3, Timbres.PIANO, 0],
   [173, Chords.BIG_MAJOR, 0, Timbres.PIANO, 0], [174, Chords.BIG_MAJOR, 1, Timbres.PIANO, 0],
   [175, Chords.BIG_MAJOR, 2, Timbres.PIANO, 0], [176, Chords.BIG_MAJOR, 3, Timbres.PIANO, 0],
   [177, Chords.BIG_MAJOR, 0, Timbres.PIANO, 0], [178, Chords.BIG_MAJOR, 1, Timbres.PIANO, 0],
   [179, Chords.BIG_MAJOR, 2, Timbres.PIANO, 0], [180, Chords.BIG_MAJOR, 3, Timbres.PIANO, 0],
   [181, Chords.BIG_MAJOR, 0, Timbres.PIANO, 0], [182, Chords.BIG_MAJOR, 1, Timbres.PIANO, 0],
   [183, Chords.BIG_MAJOR, 2, Timbres.PIANO, 0], [184, Chords.BIG_MAJOR, 3, Timbres.PIANO, 0],

   [185, Chords.SMALL_MAJOR, 0, Timbres.PIANO, 0], [186, Chords.SMALL_MAJOR, 1, Timbres.PIANO, 0],
   [187, Chords.SMALL_MAJOR, 2, Timbres.PIANO, 0], [188, Chords.SMALL_MAJOR, 3, Timbres.PIANO, 0],
   [189, Chords.SMALL_MAJOR, 0, Timbres.PIANO, 0], [190, Chords.SMALL_MAJOR, 1, Timbres.PIANO, 0],
   [191, Chords.SMALL_MAJOR, 2, Timbres.PIANO, 0], [192, Chords.SMALL_MAJOR, 3, Timbres.PIANO, 0],
   [193, Chords.SMALL_MAJOR, 0, Timbres.PIANO, 0], [194, Chords.SMALL_MAJOR, 1, Timbres.PIANO, 0],
   [195, Chords.SMALL_MAJOR, 2, Timbres.PIANO, 0], [196, Chords.SMALL_MAJOR, 3, Timbres.PIANO, 0],
   [197, Chords.SMALL_MAJOR, 0, Timbres.PIANO, 0], [198, Chords.SMALL_MAJOR, 1, Timbres.PIANO, 0],
   [199, Chords.SMALL_MAJOR, 2, Timbres.PIANO, 0], [200, Chords.SMALL_MAJOR, 3, Timbres.PIANO, 0],

   [201, Chords.SMALL_MINOR, 0, Timbres.PIANO, 0], [202, Chords.SMALL_MINOR, 1, Timbres.PIANO, 0],
   [203, Chords.SMALL_MINOR, 2, Timbres.PIANO, 0], [204, Chords.SMALL_MINOR, 3, Timbres.PIANO, 0],
   [205, Chords.SMALL_MINOR, 0, Timbres.PIANO, 0], [206, Chords.SMALL_MINOR, 1, Timbres.PIANO, 0],
   [207, Chords.SMALL_MINOR, 2, Timbres.PIANO, 0], [208, Chords.SMALL_MINOR, 3, Timbres.PIANO, 0],
   [209, Chords.SMALL_MINOR, 0, Timbres.PIANO, 0], [210, Chords.SMALL_MINOR, 1, Timbres.PIANO, 0],
   [211, Chords.SMALL_MINOR, 2, Timbres.PIANO, 0], [212, Chords.SMALL_MINOR, 3, Timbres.PIANO, 0],
   [213, Chords.SMALL_MINOR, 0, Timbres.PIANO, 0], [214, Chords.SMALL_MINOR, 1, Timbres.PIANO, 0],
   [215, Chords.SMALL_MINOR, 2, Timbres.PIANO, 0], [216, Chords.SMALL_MINOR, 3, Timbres.PIANO, 0],

   [217, Chords.HALF_DIM, 0, Timbres.PIANO, 0], [218, Chords.HALF_DIM, 1, Timbres.PIANO, 0],
   [219, Chords.HALF_DIM, 2, Timbres.PIANO, 0], [220, Chords.HALF_DIM, 3, Timbres.PIANO, 0],
   [221, Chords.HALF_DIM, 0, Timbres.PIANO, 0], [222, Chords.HALF_DIM, 1, Timbres.PIANO, 0],
   [223, Chords.HALF_DIM, 2, Timbres.PIANO, 0], [224, Chords.HALF_DIM, 3, Timbres.PIANO, 0],
   [225, Chords.HALF_DIM, 0, Timbres.PIANO, 0], [226, Chords.HALF_DIM, 1, Timbres.PIANO, 0],
   [227, Chords.HALF_DIM, 2, Timbres.PIANO, 0], [228, Chords.HALF_DIM, 3, Timbres.PIANO, 0],
   [229, Chords.HALF_DIM, 0, Timbres.PIANO, 0], [230, Chords.HALF_DIM, 1, Timbres.PIANO, 0],
   [231, Chords.HALF_DIM, 2, Timbres.PIANO, 0], [232, Chords.HALF_DIM, 3, Timbres.PIANO, 0],

   // guitar
   [233, Chords.BIG_MAJOR, 0, Timbres.GUITAR, 0], [234, Chords.BIG_MAJOR, 1, Timbres.GUITAR, 0],
   [235, Chords.BIG_MAJOR, 2, Timbres.GUITAR, 0], [236, Chords.BIG_MAJOR, 3, Timbres.GUITAR, 0],
   [237, Chords.BIG_MAJOR, 0, Timbres.GUITAR, 0], [238, Chords.BIG_MAJOR, 1, Timbres.GUITAR, 0],
   [239, Chords.BIG_MAJOR, 2, Timbres.GUITAR, 0], [240, Chords.BIG_MAJOR, 3, Timbres.GUITAR, 0],
   [241, Chords.BIG_MAJOR, 0, Timbres.GUITAR, 0], [242, Chords.BIG_MAJOR, 1, Timbres.GUITAR, 0],
   [243, Chords.BIG_MAJOR, 2, Timbres.GUITAR, 0], [244, Chords.BIG_MAJOR, 3, Timbres.GUITAR, 0],
   [245, Chords.BIG_MAJOR, 0, Timbres.GUITAR, 0], [246, Chords.BIG_MAJOR, 1, Timbres.GUITAR, 0],
   [247, Chords.BIG_MAJOR, 2, Timbres.GUITAR, 0], [248, Chords.BIG_MAJOR, 3, Timbres.GUITAR, 0],

   [249, Chords.SMALL_MAJOR, 0, Timbres.GUITAR, 0], [250, Chords.SMALL_MAJOR, 1, Timbres.GUITAR, 0],
   [251, Chords.SMALL_MAJOR, 2, Timbres.GUITAR, 0], [252, Chords.SMALL_MAJOR, 3, Timbres.GUITAR, 0],
   [253, Chords.SMALL_MAJOR, 0, Timbres.GUITAR, 0], [254, Chords.SMALL_MAJOR, 1, Timbres.GUITAR, 0],
   [255, Chords.SMALL_MAJOR, 2, Timbres.GUITAR, 0], [256, Chords.SMALL_MAJOR, 3, Timbres.GUITAR, 0],
   [257, Chords.SMALL_MAJOR, 0, Timbres.GUITAR, 0], [258, Chords.SMALL_MAJOR, 1, Timbres.GUITAR, 0],
   [259, Chords.SMALL_MAJOR, 2, Timbres.GUITAR, 0], [260, Chords.SMALL_MAJOR, 3, Timbres.GUITAR, 0],
   [261, Chords.SMALL_MAJOR, 0, Timbres.GUITAR, 0], [262, Chords.SMALL_MAJOR, 1, Timbres.GUITAR, 0],
   [263, Chords.SMALL_MAJOR, 2, Timbres.GUITAR, 0], [264, Chords.SMALL_MAJOR, 3, Timbres.GUITAR, 0],

   [265, Chords.SMALL_MINOR, 0, Timbres.GUITAR, 0], [266, Chords.SMALL_MINOR, 1, Timbres.GUITAR, 0],
   [267, Chords.SMALL_MINOR, 2, Timbres.GUITAR, 0], [268, Chords.SMALL_MINOR, 3, Timbres.GUITAR, 0],
   [269, Chords.SMALL_MINOR, 0, Timbres.GUITAR, 0], [270, Chords.SMALL_MINOR, 1, Timbres.GUITAR, 0],
   [271, Chords.SMALL_MINOR, 2, Timbres.GUITAR, 0], [272, Chords.SMALL_MINOR, 3, Timbres.GUITAR, 0],
   [273, Chords.SMALL_MINOR, 0, Timbres.GUITAR, 0], [274, Chords.SMALL_MINOR, 1, Timbres.GUITAR, 0],
   [275, Chords.SMALL_MINOR, 2, Timbres.GUITAR, 0], [276, Chords.SMALL_MINOR, 3, Timbres.GUITAR, 0],
   [277, Chords.SMALL_MINOR, 0, Timbres.GUITAR, 0], [278, Chords.SMALL_MINOR, 1, Timbres.GUITAR, 0],
   [279, Chords.SMALL_MINOR, 2, Timbres.GUITAR, 0], [280, Chords.SMALL_MINOR, 3, Timbres.GUITAR, 0],

   [281, Chords.HALF_DIM, 0, Timbres.GUITAR, 0], [282, Chords.HALF_DIM, 1, Timbres.GUITAR, 0],
   [283, Chords.HALF_DIM, 2, Timbres.GUITAR, 0], [284, Chords.HALF_DIM, 3, Timbres.GUITAR, 0],
   [285, Chords.HALF_DIM, 0, Timbres.GUITAR, 0], [286, Chords.HALF_DIM, 1, Timbres.GUITAR, 0],
   [287, Chords.HALF_DIM, 2, Timbres.GUITAR, 0], [288, Chords.HALF_DIM, 3, Timbres.GUITAR, 0],
   [289, Chords.HALF_DIM, 0, Timbres.GUITAR, 0], [290, Chords.HALF_DIM, 1, Timbres.GUITAR, 0],
   [291, Chords.HALF_DIM, 2, Timbres.GUITAR, 0], [292, Chords.HALF_DIM, 3, Timbres.GUITAR, 0],
   [293, Chords.HALF_DIM, 0, Timbres.GUITAR, 0], [294, Chords.HALF_DIM, 1, Timbres.GUITAR, 0],
   [295, Chords.HALF_DIM, 2, Timbres.GUITAR, 0], [296, Chords.HALF_DIM, 3, Timbres.GUITAR, 0],
  ],
];

export const test_b_indexing = (chord, transposition, timbre, variant) => {
  /*
    BIG_MAJOR>>
      PIANO:   0-11
      GUITAR: 12-23
    SMALL_MAJOR>>
      PIANO:  24
      GUITAR: 36
    SMALL_MINOR>>
      PIANO:  48
      GUITAR: 60
    HALF_DIM>>
      PIANO:  72
      GUITAR: 84-95
  */

  let idx = 0;
  if (timbre === Timbres.PIANO) idx += 0;
  else if (timbre === Timbres.GUITAR) idx += 12;

  switch (chord) {
    case Chords.BIG_MAJOR: idx += 0; break;
    case Chords.SMALL_MAJOR: idx += 24; break;
    case Chords.SMALL_MINOR: idx += 48; break;
    case Chords.HALF_DIM: idx += 72; break;
  }

  idx += (variant-1)*4 + transposition;
  return idx;
}

export const test_d_indexing = (chord, transposition, timbre, type) => {
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
  return idx += type*4 + transposition;
}
