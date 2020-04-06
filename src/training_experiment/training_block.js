import React from 'react';
import { AudioController } from '../audio_controller.js';
import { LessonType, Strings, StaticImages, Chords, Timbres, musical_pieces_data } from '../defs.js';
import { SongHeader, InfoScreen, LoadingScreen, ContinueButton } from '../ui.js';
import { randomSequence, shuffleArray } from '../randomize.js';
import ls from 'local-storage';

// each trial entry is [audio_idx, chord, transposition, timbre]
let training_data = {
  musical_pieces: [
    [[1, Chords.BIG_MAJOR, 0, null], [2, Chords.SMALL_MAJOR, 0, null], 
     [3, Chords.SMALL_MINOR, 0, null], [4, Chords.HALF_DIM, 0, null]],
    [[5, Chords.BIG_MAJOR, 0, null], [6, Chords.SMALL_MAJOR, 0, null], 
     [7, Chords.SMALL_MINOR, 0, null], [8, Chords.HALF_DIM, 0, null]],
    [ // piano recordings
      [9, Chords.BIG_MAJOR, 0, Timbres.PIANO], [10, Chords.BIG_MAJOR, 1, Timbres.PIANO], 
      [11, Chords.BIG_MAJOR, 2, Timbres.PIANO], [12, Chords.BIG_MAJOR, 3, Timbres.PIANO],
      [13, Chords.SMALL_MAJOR, 0, Timbres.PIANO], [14, Chords.SMALL_MAJOR, 1, Timbres.PIANO],
      [15, Chords.SMALL_MAJOR, 2, Timbres.PIANO], [16, Chords.SMALL_MAJOR, 3, Timbres.PIANO],
      [17, Chords.SMALL_MINOR, 0, Timbres.PIANO], [18, Chords.SMALL_MINOR, 1, Timbres.PIANO], 
      [19, Chords.SMALL_MINOR, 2, Timbres.PIANO], [20, Chords.SMALL_MINOR, 3, Timbres.PIANO],
      [21, Chords.HALF_DIM, 0, Timbres.PIANO], [22, Chords.HALF_DIM, 1, Timbres.PIANO], 
      [23, Chords.HALF_DIM, 2, Timbres.PIANO], [24, Chords.HALF_DIM, 3, Timbres.PIANO],
      // guitar recordings
      [41, Chords.BIG_MAJOR, 0, Timbres.GUITAR], [42, Chords.BIG_MAJOR, 1, Timbres.GUITAR], 
      [43, Chords.BIG_MAJOR, 2, Timbres.GUITAR], [44, Chords.BIG_MAJOR, 3, Timbres.GUITAR],
      [45, Chords.SMALL_MAJOR, 0, Timbres.GUITAR], [46, Chords.SMALL_MAJOR, 1, Timbres.GUITAR], 
      [47, Chords.SMALL_MAJOR, 2, Timbres.GUITAR], [48, Chords.SMALL_MAJOR, 3, Timbres.GUITAR],
      [49, Chords.SMALL_MINOR, 0, Timbres.GUITAR], [50, Chords.SMALL_MINOR, 1, Timbres.GUITAR], 
      [51, Chords.SMALL_MINOR, 2, Timbres.GUITAR], [52, Chords.SMALL_MINOR, 3, Timbres.GUITAR],
      [53, Chords.HALF_DIM, 0, Timbres.GUITAR], [54, Chords.HALF_DIM, 1, Timbres.GUITAR], 
      [55, Chords.HALF_DIM, 2, Timbres.GUITAR], [56, Chords.HALF_DIM, 3, Timbres.GUITAR],
    ],
  ],
  tonal_context: [
    [ // piano
      [25, Chords.BIG_MAJOR, 0, Timbres.PIANO], [26, Chords.SMALL_MAJOR, 0, Timbres.PIANO],
      [27, Chords.SMALL_MINOR, 0, Timbres.PIANO], [28, Chords.HALF_DIM, 0, Timbres.PIANO],
      // guitar
      [29, Chords.BIG_MAJOR, 0, Timbres.GUITAR], [30, Chords.SMALL_MAJOR, 0, Timbres.GUITAR],
      [31, Chords.SMALL_MINOR, 0, Timbres.GUITAR], [32, Chords.HALF_DIM, 0, Timbres.GUITAR],
    ],
    [ // piano
      [33, Chords.BIG_MAJOR, 0, Timbres.PIANO], [35, Chords.SMALL_MAJOR, 0, Timbres.PIANO],
      [37, Chords.SMALL_MINOR, 0, Timbres.PIANO], [39, Chords.HALF_DIM, 0, Timbres.PIANO],
      // guitar
      [34, Chords.BIG_MAJOR, 0, Timbres.GUITAR], [36, Chords.SMALL_MAJOR, 0, Timbres.GUITAR],
      [38, Chords.SMALL_MINOR, 0, Timbres.GUITAR], [40, Chords.HALF_DIM, 0, Timbres.GUITAR],
    ],
    [ // piano recordings
      [9, Chords.BIG_MAJOR, 0, Timbres.PIANO], [10, Chords.BIG_MAJOR, 1, Timbres.PIANO], 
      [11, Chords.BIG_MAJOR, 2, Timbres.PIANO], [12, Chords.BIG_MAJOR, 3, Timbres.PIANO],
      [13, Chords.SMALL_MAJOR, 0, Timbres.PIANO], [14, Chords.SMALL_MAJOR, 1, Timbres.PIANO],
      [15, Chords.SMALL_MAJOR, 2, Timbres.PIANO], [16, Chords.SMALL_MAJOR, 3, Timbres.PIANO],
      [17, Chords.SMALL_MINOR, 0, Timbres.PIANO], [18, Chords.SMALL_MINOR, 1, Timbres.PIANO], 
      [19, Chords.SMALL_MINOR, 2, Timbres.PIANO], [20, Chords.SMALL_MINOR, 3, Timbres.PIANO],
      [21, Chords.HALF_DIM, 0, Timbres.PIANO], [22, Chords.HALF_DIM, 1, Timbres.PIANO], 
      [23, Chords.HALF_DIM, 2, Timbres.PIANO], [24, Chords.HALF_DIM, 3, Timbres.PIANO],
      // guitar recordings
      [41, Chords.BIG_MAJOR, 0, Timbres.GUITAR], [42, Chords.BIG_MAJOR, 1, Timbres.GUITAR], 
      [43, Chords.BIG_MAJOR, 2, Timbres.GUITAR], [44, Chords.BIG_MAJOR, 3, Timbres.GUITAR],
      [45, Chords.SMALL_MAJOR, 0, Timbres.GUITAR], [46, Chords.SMALL_MAJOR, 1, Timbres.GUITAR], 
      [47, Chords.SMALL_MAJOR, 2, Timbres.GUITAR], [48, Chords.SMALL_MAJOR, 3, Timbres.GUITAR],
      [49, Chords.SMALL_MINOR, 0, Timbres.GUITAR], [50, Chords.SMALL_MINOR, 1, Timbres.GUITAR], 
      [51, Chords.SMALL_MINOR, 2, Timbres.GUITAR], [52, Chords.SMALL_MINOR, 3, Timbres.GUITAR],
      [53, Chords.HALF_DIM, 0, Timbres.GUITAR], [54, Chords.HALF_DIM, 1, Timbres.GUITAR], 
      [55, Chords.HALF_DIM, 2, Timbres.GUITAR], [56, Chords.HALF_DIM, 3, Timbres.GUITAR],
    ],
  ],
  automatic: [
    [ // piano
      [9, Chords.BIG_MAJOR, 0, Timbres.PIANO], [13, Chords.SMALL_MAJOR, 0, Timbres.PIANO],
      [17, Chords.SMALL_MINOR, 0, Timbres.PIANO], [21, Chords.HALF_DIM, 0, Timbres.PIANO],
      // guitar
      [41, Chords.BIG_MAJOR, 0, Timbres.GUITAR], [45, Chords.SMALL_MAJOR, 0, Timbres.GUITAR],
      [49, Chords.SMALL_MINOR, 0, Timbres.GUITAR], [53, Chords.HALF_DIM, 0, Timbres.GUITAR],
    ],
    [ // piano
      [9, Chords.BIG_MAJOR, 0, Timbres.PIANO], [13, Chords.SMALL_MAJOR, 0, Timbres.PIANO],
      [17, Chords.SMALL_MINOR, 0, Timbres.PIANO], [21, Chords.HALF_DIM, 0, Timbres.PIANO],
      // guitar
      [41, Chords.BIG_MAJOR, 0, Timbres.GUITAR], [45, Chords.SMALL_MAJOR, 0, Timbres.GUITAR],
      [49, Chords.SMALL_MINOR, 0, Timbres.GUITAR], [53, Chords.HALF_DIM, 0, Timbres.GUITAR],
    ],
    [ // piano recordings
      [9, Chords.BIG_MAJOR, 0, Timbres.PIANO], [10, Chords.BIG_MAJOR, 1, Timbres.PIANO], 
      [11, Chords.BIG_MAJOR, 2, Timbres.PIANO], [12, Chords.BIG_MAJOR, 3, Timbres.PIANO],
      [13, Chords.SMALL_MAJOR, 0, Timbres.PIANO], [14, Chords.SMALL_MAJOR, 1, Timbres.PIANO],
      [15, Chords.SMALL_MAJOR, 2, Timbres.PIANO], [16, Chords.SMALL_MAJOR, 3, Timbres.PIANO],
      [17, Chords.SMALL_MINOR, 0, Timbres.PIANO], [18, Chords.SMALL_MINOR, 1, Timbres.PIANO], 
      [19, Chords.SMALL_MINOR, 2, Timbres.PIANO], [20, Chords.SMALL_MINOR, 3, Timbres.PIANO],
      [21, Chords.HALF_DIM, 0, Timbres.PIANO], [22, Chords.HALF_DIM, 1, Timbres.PIANO], 
      [23, Chords.HALF_DIM, 2, Timbres.PIANO], [24, Chords.HALF_DIM, 3, Timbres.PIANO],
      // guitar recordings
      [41, Chords.BIG_MAJOR, 0, Timbres.GUITAR], [42, Chords.BIG_MAJOR, 1, Timbres.GUITAR], 
      [43, Chords.BIG_MAJOR, 2, Timbres.GUITAR], [44, Chords.BIG_MAJOR, 3, Timbres.GUITAR],
      [45, Chords.SMALL_MAJOR, 0, Timbres.GUITAR], [46, Chords.SMALL_MAJOR, 1, Timbres.GUITAR], 
      [47, Chords.SMALL_MAJOR, 2, Timbres.GUITAR], [48, Chords.SMALL_MAJOR, 3, Timbres.GUITAR],
      [49, Chords.SMALL_MINOR, 0, Timbres.GUITAR], [50, Chords.SMALL_MINOR, 1, Timbres.GUITAR], 
      [51, Chords.SMALL_MINOR, 2, Timbres.GUITAR], [52, Chords.SMALL_MINOR, 3, Timbres.GUITAR],
      [53, Chords.HALF_DIM, 0, Timbres.GUITAR], [54, Chords.HALF_DIM, 1, Timbres.GUITAR], 
      [55, Chords.HALF_DIM, 2, Timbres.GUITAR], [56, Chords.HALF_DIM, 3, Timbres.GUITAR],
    ],
  ],
};

const TrainingInfo = props => {
  let { lesson_type, next } = props;
  let info;
  switch (lesson_type) {
  case LessonType.MUSICAL_PIECES:
    info = (
      <div>
      <p>בחלק זה תשמעו קטעים מוזיקליים ותצטרכו לזהות את האקורד הראשון שלהם. בדומה לחלק הקודם, האקורד יושמע גם אחרי הקטע המוזיקלי.</p>
      <p>עליכם לזהות את סוג האקורד במהירות האפשרית, וללחוץ עליו באמצעות העכבר.</p>
      </div>);
    break;
  case LessonType.TONAL_CONTEXT:
    info = (
      <div>
        <p>בחלק זה תשמעו צמדים מוזיקליים לאחר מבוא טונאלי של סולם עולה ויורד, ותצטרכו לזהות את האקורד הראשון בכל צמד. האקורד אותו תצטרכו לזהות יושמע שוב לאחר שמיעת צמד האקורדים.</p>
        <p>עליכם לזהות את סוג האקורד במהירות האפשרית, וללחוץ עליו באמצעות העכבר.</p>
      </div>);
  case LessonType.AUTOMATIC:
    info = (
      <div>
        <p>בחלק זה תשמעו אקורדים בודדים, ותצטרכו לזהות אותם במהירות האפשרית, וללחוץ על סוג האקורד.</p>
      </div>);
  }
  return <InfoScreen next={next} info={info}/>;
};

const InfoBeforeTrainingPartB = props => {
  let { lesson_type, next } = props;
  let info;
  switch (lesson_type) {
  case LessonType.MUSICAL_PIECES:
    info = (
      <div>
        <p>בחלק זה תשמעו קטעים מוזיקליים בחליל ופסנתר ותצטרכו לזהות את האקורד המושמע בליווי.</p>
        <p>עליכם לזהות את סוג האקורד במהירות האפשרית, וללחוץ עליו באמצעות העכבר.</p>
      </div>);
    break;
  case LessonType.TONAL_CONTEXT:
    info = <p>בחלק זה תשמעו מבוא טונאלי ואחריו אקורד בודד. תצטרכו לזהות את האקורד הבודד במהירות האפשרית, וללחוץ על סוג האקורד.</p>;
    break;
  case LessonType.AUTOMATIC:
    info = <p>תזכורת: בחלק זה תשמעו אקורדים בודדים, ותצטרכו לזהות אותם במהירות האפשרית, וללחוץ על סוג האקורד.</p>;
    break;
  }
  return <InfoScreen info={info} next={next}/>;
};

const InfoBeforeTrainingPartC = props => {
  let { lesson_type, next } = props;
  let info;
  switch (lesson_type) {
  case LessonType.MUSICAL_PIECES:
    info = <p>בחלק זה תשמעו אקורדים בודדים, ללא הקטע המוזיקלי, ותצטרכו לזהות אותם במהירות האפשרית, וללחוץ על סוג האקורד.</p>;
    break;
  case LessonType.TONAL_CONTEXT:
    info = <p>בחלק זה תשמעו אקורדים בודדים, ללא הקטע המוזיקלי, ותצטרכו לזהות אותם במהירות האפשרית, וללחוץ על סוג האקורד.</p>;
    break;
  case LessonType.AUTOMATIC:
    info = <p>תזכורת: בחלק זה תשמעו אקורדים בודדים, ותצטרכו לזהות אותם במהירות האפשרית, וללחוץ על סוג האקורד.</p>;
    break;
  }
  return <InfoScreen info={info} next={next}/>;
};

const SuccessfulIdentification = props => {
  const { next } = props;
  return (
    <div className="row successScreenWrapper">
      <div className="col-sm-8 offset-sm-2 text-center">
        <span className="songTitle"> { Strings.success_identification } &nbsp;</span>
        <img src= { StaticImages.happySmiley } width="150px" height="150px" alt=""/>
        <br/>
        <br/>
        <ContinueButton next={next} />
      </div>
    </div>
  );
};

const ShowCorrectAnswer = props => {
  const { correctChord } = props;
  return (
    <div>
      <div className="row">
        <div className="col-sm-8 offset-sm-1">
          <span className="songTitle">{ Strings.failure_song_has_chord } </span>
          <span className="songTitle">{ correctChord }</span>
          <br/>
          <span className="songTitle">{ Strings.how_it_sounds }</span>
        </div>
      </div>
    </div>
  );
};

const FailedIdentification = props => {
  const { shouldShowCorrect, correctChord} = props;

  let appendix = <div></div>;
  if (shouldShowCorrect === true){
    appendix = 
      <div className="row">
        <div className="col-sm-8 offset-sm-2 text-center">
          <ShowCorrectAnswer correctChord={ correctChord } />
        </div>
      </div>;
  }
  return (
    <div>
      <div className="row">
        <div className="col-sm-8 offset-sm-2 text-center">
            <img src= { StaticImages.sadSmiley } width="150px" height="150px" alt="" className="sadSmiley"/>
            <span className="songTitle"> { Strings.failure_identification } &nbsp;</span>
            <br/>
            <span className="songTitle">{ Strings.how_it_sounds }</span>
        </div>
      </div>
      { appendix }
    </div>
  );
};

const SongWithChords = props => {
  const { songData, chord_buttons, disabled, next } = props;

  const gen_button = (chord, i) => {
    if (disabled) 
      return <button className="chordBtn" disabled key={i} onClick={(e) => next(chord)}>{chord}</button>;
    else 
      return <button className="chordBtn" key={i} onClick={(e) => next(chord)}>{chord}</button>;
  };

  return (
    <div className="songDisplayWrapper">
      <SongHeader songData = { songData} />
      <div className="row"><div className="col-sm-12">&nbsp;</div></div>
      <div className="row"><div className="col-sm-12">&nbsp;</div></div>
      <div className="row">
        <div className="col-sm-4 offset-sm-4 text-center songTitle">
          שם האקורד:
        </div>
      </div>
      <div className="row">
        <div className="col-sm-8 offset-sm-2 chords">
          {chord_buttons.map((chord, i) => gen_button(chord, i))}
        </div>
      </div>
    </div>
  );
};

const ChordSelection = props => {
  let { chord_buttons, disabled, with_song_names, next } = props;
  const gen_button = (chord) => {
    const label = with_song_names ? <p>{chord} <br/> {musical_pieces_data[chord].name}</p> : <p>{chord}</p>;

    if (disabled) 
      return <button className="chordBtn" disabled onClick={(e) => next(chord)}>{label}</button>;
    else 
      return <button className="chordBtn" onClick={(e) => next(chord)}>{label}</button>;
  };

  return (
    <div className="songDisplayWrapper">
      <div className="row">
        <div className="col-sm-2 offset-sm-2">
          {gen_button(chord_buttons[0])}
        </div>
        <div className="col-sm-4">
          &nbsp;
        </div>
        <div className="col-sm-2">
          {gen_button(chord_buttons[1])}
        </div>
      </div>
      <div className="row text-center">
        <div className="col-sm-2 offset-sm-5 plusSign align-middle">
          +
        </div>
      </div>
      <div className="row">
        <div className="col-sm-2 offset-sm-2">
          {gen_button(chord_buttons[2])}
        </div>
        <div className="col-sm-4">
          &nbsp;
        </div>
        <div className="col-sm-2">
          {gen_button(chord_buttons[3])}
        </div>
      </div>
    </div>
  );
};

class TrainingPart extends React.Component {
  state = {
    trial_idx: 31,
    done_loading: false,
    done_playing: false,
    show_feedback: false,
    answer: null,
  };

  constructor({part, session, chord_buttons, next, data}) {
    super();
    this.part = part;
    this.session = session;
    this.chord_buttons = chord_buttons;
    this.next = next;
    this.data = data;
    this.trials_per_part = 32;

    switch (session.lesson_type) {
    case LessonType.MUSICAL_PIECES:
      this.part_data = training_data.musical_pieces[part];
      break;
    case LessonType.TONAL_CONTEXT:
      this.part_data = training_data.tonal_context[part];
      break;
    case LessonType.AUTOMATIC:
      this.part_data = training_data.automatic[part];
      break;
    };

    this.ls_prefix = "training_part" + part + "_";
    if (session.continued) {
      this.sequence = ls.get(this.ls_prefix + "sequence");
      const trial_idx = ls.get(this.ls_prefix + "trial_idx");
      console.log("trial_idx:" + trial_idx + "," + this.state.trial_idx);
      if (trial_idx !== null) this.state.trial_idx = trial_idx;
      console.log("trial_idx:" + trial_idx + "," + this.state.trial_idx);
      session.continued = false; // we only need to restore session once!
    }
    else {
      this.sequence = randomSequence(this.part_data, this.trials_per_part);
      ls.set(this.ls_prefix + "sequence", this.sequence);
      ls.set(this.ls_prefix + "trial_idx", this.state.trial_idx);
    }
    console.log("TRAINING PART " + part + " sequence:");
    console.log(this.sequence);

    const that = this;
    const doneLoadingAudio = () => {
      that.setState({done_loading: true});
      that.audioController.play(that.sequence[that.state.trial_idx][0]);
    };

    const donePlaying = () => {
      that.setState({done_playing: true});

      // play the next audio idx in case the user made a mistake (Failedidentification)
      console.log("doneplaying");
      console.log(this.state);
      
      // this part runs when we give feedback for an incorrect answer.
      if (this.state.show_feedback) {
        if (!this.state.fail_show_correct) {
          // play the correct answer audio idx
          this.audioController.play(this.state.correct_audio_idx);
          this.setState({fail_show_correct: true});
        }
        else {
          // continue 
          this.nextTrial();
        }
      }
    };

    this.audioController = new AudioController(this.part_data.map(d => d[0]), doneLoadingAudio, donePlaying);
  }

  /* calculate the transposition count since the beginning of training (currently of part). */
  get_transposition_play_count() { 
    const idx = this.state.trial_idx;
    const trial = this.sequence[idx];
    console.log("trial idx:" + idx + " trial: " + trial);
    console.log("slice:");
    console.log(this.sequence.slice(0, idx));
    console.log("filter:");
    console.log(this.sequence.slice(0, idx)
                .filter(t => t[1] === trial[1] && t[2] === trial[2]));
    const count_in_part = this.sequence.slice(0, idx)
      .filter(t => t[1] === trial[1] && t[2] === trial[2]).length + 1;
    console.log("count_in_part: " + count_in_part);
    return count_in_part; // TODO: return actual transposition count (not in part)
  }

  render() {
    const that = this;
    const trial_data = this.sequence[this.state.trial_idx];
    const chord_name = trial_data[1];
    const transposition = trial_data[2];

    const nextTrial = () => {
      const trial_idx = that.state.trial_idx;
      if (trial_idx < that.trials_per_part - 1) {
        that.setState({trial_idx: trial_idx + 1,
                       done_playing: false,
                       show_feedback: false});
        that.audioController.play(this.sequence[trial_idx+1][0]);
      }
      else {
        that.next();
      }
    };

    const processAnswer = (answer) => {
      console.log("SELECTION: " + answer);
      const correct = answer === chord_name;
      // save trial data
      const td = {
        time: new Date().toString(),
        audio_index: trial_data[0],
        chord_number: that.trials_per_part * this.part + this.state.trial_idx + 1,
        chord_type: chord_name,
        transposition: transposition + 1,
        transposition_play_count: that.get_transposition_play_count(),
        selected_chord_type: answer,
        correct: correct,
      };
      that.data.trials.push(td);
      console.log("SAVING DATA");
      console.log(that.data);
      ls.set("data", that.data);
      if (this.state.trial_idx+1 < this.trials_per_part)
        ls.set(this.ls_prefix + "trial_idx", this.state.trial_idx+1);

      // continue to show answer feedback
      if (!correct) {
        // start playing the chosen chord and then the right chord.
        // [idx, chord, trnsp, timbre]
        const selected_audio_idx = that.part_data.
          filter(d => d[1] === answer && d[2] === transposition && d[3] === trial_data[3])[0][0];
        const correct_audio_idx = trial_data[0];
        console.log("selected_audio_idx=" + selected_audio_idx + " correct_audio_idx=" + correct_audio_idx);
        this.setState({show_feedback: true,
                       correct: correct,
                       fail_show_correct: false,
                       correct_audio_idx: correct_audio_idx});
        that.audioController.play(selected_audio_idx);
      }
      else {        
        that.setState({show_feedback: true,
                       correct: correct});
      }
    };
    
    console.log("rendering part " + this.part + " trial " + this.state.trial_idx);
    if (!this.state.done_loading) 
      return <LoadingScreen />;

    if (!this.state.show_feedback) {
      let screen;
      if (this.part < 2 && this.session.lesson_type === LessonType.MUSICAL_PIECES) {
        const song_data = musical_pieces_data[chord_name];
        screen = <SongWithChords songData={song_data} disabled={!this.state.done_playing} 
                                 chord_buttons={this.chord_buttons} next={processAnswer}/>;
      }
      else {
        screen = <ChordSelection 
        chord_buttons={this.chord_buttons} 
        disabled={!this.state.done_playing} 
        with_song_names={this.session.lesson_type === LessonType.MUSICAL_PIECES}
        next={processAnswer}/>;
      }
      
      return (
        <div className="container">
          {screen}
        </div>
      );
    }
    else { // show feedback screen
      console.log("preparing feedback for correct=" + this.state.correct);
      if (this.state.correct) {
        return <SuccessfulIdentification next={nextTrial}/>;
      } else {
        this.nextTrial = nextTrial;
        return <FailedIdentification shouldShowCorrect={this.state.fail_show_correct} correctChord={chord_name} />;
      }
    }
  }
};

export class TrainingBlock extends React.Component {
  steps = {
    INFO_A: 1,
    PART_A: 2,
    INFO_B: 3,
    PART_B: 4,
    INFO_C: 5,
    PART_C: 6,
    DONE: 7,
  }

  state = {
    step: 1,
  }

  chord_buttons = shuffleArray([Chords.BIG_MAJOR, Chords.SMALL_MAJOR, Chords.SMALL_MINOR, Chords.HALF_DIM]);

  nextStep = () => {
    const { step } = this.state;
    
    this.setState({
      step: step + 1
    });
    ls.set("training_block_step", step + 1);

    if (step + 1 === this.steps.DONE)
      this.next();
  }

  constructor({data, session, next}) {
    super();
    this.data = data;
    this.session = session;
    this.next = next;

    if (session.continued) {
      this.chord_buttons = ls.get("training_block_chord_buttons");      
      this.state.step = ls.get("training_block_step");
    }
    else {
      ls.set("training_block_chord_buttons", this.chord_buttons);
      ls.set("training_block_step", this.state.step);
    }
  }

  render() {
    const { step } = this.state;
    let screen;
    switch (step) {
    case this.steps.INFO_A:
      this.session.continued = false;
      screen = <TrainingInfo lesson_type={this.session.lesson_type} next={this.nextStep} key={step} />;
      break;
    case this.steps.PART_A:
      screen = <TrainingPart part={0} session={this.session} next={this.nextStep} key={step} chord_buttons={this.chord_buttons} data={this.data} />;
      break;
    case this.steps.INFO_B:
      this.session.continued = false;
      screen = <InfoBeforeTrainingPartB lesson_type={this.session.lesson_type} next={this.nextStep} key={step} />;
      break;
    case this.steps.PART_B:
      screen = <TrainingPart part={1} session={this.session} next={this.nextStep} key={step} chord_buttons={this.chord_buttons} data={this.data} />;
      break;
    case this.steps.INFO_C:
      this.session.continued = false;
      screen = <InfoBeforeTrainingPartC lesson_type={this.session.lesson_type} next={this.nextStep} key={step} />;
      break;
    case this.steps.PART_C:
      screen = <TrainingPart part={2} session={this.session} next={this.nextStep} key={step} chord_buttons={this.chord_buttons} data={this.data} />;
      break;
    case this.steps.DONE:
      screen = null;
      break;
    };

    return screen;
  }
}
