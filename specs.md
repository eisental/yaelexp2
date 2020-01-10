# Main Structure

App:
TrainingExperiment: run sequence of screens
    1. IntroScreen - gathers: data.id | always the same.
    2. InfoScreen - takes: lesson\_type. | different text per lesson type.
    3. LessonBlock - takes: lesson\_type | run a sequence of lesson screens
       1. MUSICAL_PIECES type:
          SongLessonScreen - takes: song image and recording | x 16+16+16 (recordings change every 16)
              randomization:
       2. TONAL_CONTEXT & AUTOMATIC types:
          ChordLessonScreen - takes: chord name and recording | x 16+16+16
              randomization:
    5. TrainingBlock - takes: gathers: | run a sequence of training screens
       1. TrainingInfo - takes: lesson\_type | different text per lesson type
       2. FeedbackScreen - takes: success/failure, recordings/chords etc. | feedback for every answer.
       1. MUSICAL_PIECES type:
          3. SongTrainingScreen - takes song image and recording | x 32+32 (recordings change every 32)
             - randomization: button order (per app instance)
          4. TrainingReminderInfo - takes: lesson\_type | different text per lesson type
          5. ChordsTrainingScreen - takes: text for buttons, recordings | x 16
             - randomization: button order (per app instance)
       2. TONAL_CONTEXT type:
          3. ChordsTrainingScreen - as above | x32
          4. TrainingReminderInfo1
          5. ChordsTrainingScreen - as above | x32
          6. TrainingReminderInfo2
          7. ChordsTrainingScreen - as above | x32
       3. AUTOMATIC type:
          3. ChordsTrainingScreen - as above | x96
    6. FinishScreen - takes: session index, data | saves data and shows some text (afterwards) 

Data:
- id
- session number?
- session timing (start, end)
  - `start_time, end_time`
  - set by: IntroScreen, Finishscreen
  - each id has many sessions. 
- for each training screen:
  - recording number
  - chord number (1-96)
  - chord type (1 - M7, 2 - 7, 3 - m7, 4 - halfdim)
  - transposition type (1-4)
  - transposition play index
  - selected chord type (same as chord type)
  - is correct?

record:

`id | session_number | start_time | end_time | time | audio_index | chord_number | chord_type | transposition | transposition_play_count | selected_chord_type | correct? |`

spreadsheet:
https://docs.google.com/spreadsheets/d/1D2s3D13ldvchzueCFWTkvH8kzhNBEMZzizPnjGQnhMY/edit#gid=0

  spreadsheetId = '1D2s3D13ldvchzueCFWTkvH8kzhNBEMZzizPnjGQnhMY';
  apiKey = 'AIzaSyDHFHbGy_GhEt1Q4FW61YYEX2jk3hZcSoQ';
  writeScriptUrl = 'https://script.google.com/macros/s/AKfycbxv6Uc9VsHlKI6SMe6YmH-MELryrJYvYg-uQnGFhyMF2X7zyC-O/exec'
  readUrl = "https://sheets.googleapis.com/v4/spreadsheets/" 

TestExperiment: 


---------------

# TODO:
- make abstractions:
  - InfoScreen / TextScreen with font size, text and a next button.
  - ScreenSequence. is it possible to read the inner dom?
- find out what we said about session continuation.
