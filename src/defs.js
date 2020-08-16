export const LessonType = {
  MUSICAL_PIECES: 0,
  TONAL_CONTEXT: 1,
  AUTOMATIC: 2,
};

export const Chords = {
  BIG_MAJOR: "מז'ור גדול",
  SMALL_MAJOR: "מז'ור קטן",
  SMALL_MINOR: "מינור קטן",
  HALF_DIM:"חצי מוקטן"
}

export const Timbres = {
  PIANO: 0,
  GUITAR: 1,
  SONG: 2,
}

export const StaticImages = {
  happySmiley: "static_images/happySmiley.jpg",
  sadSmiley: "static_images/sadSmiley.png",
}

export const Strings = {
  continue_text: "המשך",
  success_identification: "בחרת באקורד הנכון",
  failure_identification: "בחרת באקורד הלא נכון",
  how_it_sounds: "כך הוא נשמע",
};

export const SheetNames = {
  TRAINING_SESSIONS: "TrainingSessions",
  LESSON_TYPES: "LessonTypes",
  SUBJECTS_DATA: "SubjectsData",
}

// For MUSICAL_CONTEXT lessons. A mapping of chord name to the image and song name that goes with it.
export let musical_pieces_data = {};
musical_pieces_data[Chords.BIG_MAJOR] = {
  imgSrc: "song_images/song1.png",
  name: "Imagine",
};
musical_pieces_data[Chords.SMALL_MAJOR] = {
  imgSrc: "song_images/song2.png",
  name: "הליכה לקיסריה"
};
musical_pieces_data[Chords.SMALL_MINOR] = {
  imgSrc: "song_images/song3.png",
  name: "Rocket man"
};
musical_pieces_data[Chords.HALF_DIM] = {
  imgSrc: "song_images/song4.png",
  name: "ברית עולם"
};
