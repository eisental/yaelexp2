import React from 'react';
import { musical_pieces_data, LessonType, Strings, Chords } from '../defs.js';
import { AudioController } from '../audio_controller.js';
import { SongHeader } from '../ui.js';
import { randomSequence } from '../randomize.js';

// Recordings used in each lesson type and part. i.e. 
// for part 1 and musical_pieces lesson: lesson_data.musical_pieces[1]
let lesson_data = {
  musical_pieces: [
    [[1, Chords.BIG_MAJOR], [2, Chords.SMALL_MAJOR], [3, Chords.SMALL_MINOR], [4, Chords.HALF_DIM]],
    [[5, Chords.BIG_MAJOR], [6, Chords.SMALL_MAJOR], [7, Chords.SMALL_MINOR], [8, Chords.HALF_DIM]],
    [[9, Chords.BIG_MAJOR], [13, Chords.SMALL_MAJOR], [17, Chords.SMALL_MINOR], [21, Chords.HALF_DIM]],
  ],
  tonal_context: [
    [[25, Chords.BIG_MAJOR], [26, Chords.SMALL_MAJOR], [27, Chords.SMALL_MINOR], [28, Chords.HALF_DIM]],
    [[29, Chords.BIG_MAJOR], [30, Chords.SMALL_MAJOR], [31, Chords.SMALL_MINOR], [32, Chords.HALF_DIM]],
    [[33, Chords.BIG_MAJOR], [35, Chords.SMALL_MAJOR], [37, Chords.SMALL_MINOR], [39, Chords.HALF_DIM],
     [34, Chords.BIG_MAJOR], [36, Chords.SMALL_MAJOR], [38, Chords.SMALL_MINOR], [40, Chords.HALF_DIM]],
  ],
  automatic: [
    [[9, Chords.BIG_MAJOR], [13, Chords.SMALL_MAJOR], [17, Chords.SMALL_MINOR], [21, Chords.HALF_DIM]],
    [[41, Chords.BIG_MAJOR], [45, Chords.SMALL_MAJOR], [49, Chords.SMALL_MINOR], [53, Chords.HALF_DIM]],
    [[41, Chords.BIG_MAJOR], [45, Chords.SMALL_MAJOR], [49, Chords.SMALL_MINOR], [53, Chords.HALF_DIM],
     [9, Chords.BIG_MAJOR], [13, Chords.SMALL_MAJOR], [17, Chords.SMALL_MINOR], [21, Chords.HALF_DIM]],
  ],
};

// The UI for AUTOMATIC and TONAL_CONTEXT lesson trials.
const NameOfChord = props => {
  let { chordName, lesson_type } = props;
  let description = "";
  if (lesson_type === LessonType.TONAL_CONTEXT)
    description = "שם האקורד הראשון:";
  else if (lesson_type === LessonType.AUTOMATIC)
    description = "שם האקורד:";

  return (
    <div className = "row text-center successScreenWrapper">
      <div className="col-sm-8 offset-sm-2">
        <span className="chordName">
          {description}
        <br />
        { chordName }
        </span>
      </div>
    </div>
  );
};

// The UI for MUSICAL_PIECES lesson trials.
const SongWithoutChords = props => {
  let { chordName } = props;
  let { songData } = props;
  return(
    <div>
      <SongHeader songData={ songData } />
      <div className="row"><div className="col-sm-12">&nbsp;</div></div>
      <div className="row"><div className="col-sm-12">&nbsp;</div></div>
      <div className="row">
        <span className="col-sm-4 offset-sm-4">
          <span className="songTitle fixToRight">
          שם האקורד:
          </span>
        </span>
      </div>
      <div className="row text-center">
        <div className="col-sm-4 offset-sm-4">
          <span className="songTitle fixToRight">{ chordName }</span>
        </div>
      </div>
    </div>
  );
};

// This component represents one part of the lesson. There are 3 parts. The only difference 
// between them is the audio sequence. Audio playing code is here.
class LessonPart extends React.Component {
  state = {
    trial_idx: 15,
    done_playing: false,
  };

  constructor({part, lesson_type, next}) {
    super();
    this.part = part;
    this.lesson_type = lesson_type;
    this.next = next;
    this.state.done_loading = false;
    this.trials_per_part = 16;
    
    switch (lesson_type) {
    case LessonType.MUSICAL_PIECES:
      this.part_data = lesson_data.musical_pieces[part];
      break;
    case LessonType.TONAL_CONTEXT:
      this.part_data = lesson_data.tonal_context[part];
      break;
    case LessonType.AUTOMATIC:
      this.part_data = lesson_data.automatic[part];
      break;
    };

    this.sequence = randomSequence(this.part_data, this.trials_per_part);

    console.log("LESSON PART " + part + " sequence:");
    console.log(this.sequence);

    const that = this;
    const doneLoadingAudio = () => {
      console.log(that.audioController);
      console.log(that);
      that.setState({done_loading: true});
      that.audioController.play(this.sequence[that.state.trial_idx][0]);
    };

    const donePlaying = () => {
      that.setState({done_playing: true});
    };

    this.audioController = new AudioController(this.part_data.map(d => d[0]), doneLoadingAudio, donePlaying);
  }

  render() {
    const that = this;
    const nextTrial = () => {
      const trial_idx = that.state.trial_idx;
      if (that.state.trial_idx < that.trials_per_part - 1) {
        that.setState({trial_idx: trial_idx+1,
                       done_playing: false});
        that.audioController.play(this.sequence[trial_idx+1][0]);
      }
      else {
        that.next();
      }
    };

    const trialData  = this.sequence[this.state.trial_idx];
    const chordName = trialData[1];
    const songData = musical_pieces_data[chordName];
    console.log("rendering part " + this.part + " trial " + this.state.trial_idx);
    if (this.state.done_loading) {
      let screen;
      if (this.lesson_type === LessonType.MUSICAL_PIECES) {
        screen = <SongWithoutChords chordName={chordName} songData={songData}/>;
      }
      else {
        screen = <NameOfChord chordName={chordName} lesson_type={this.lesson_type}/>;
      }

      let nextButton = this.state.done_playing ? 
          <button onClick={nextTrial}>{Strings.continue_text}</button> :
          <button onClick={nextTrial} disabled>{Strings.continue_text}</button>;

      return (
        <div>
          {screen}          
          {nextButton}
        </div>
      );
    }
    else {
      return <div>Loading...</div>;
    }
  }
}

// This info screen shows up between the 2nd and 3rd parts of the lesson.
const InfoBeforeLessonPartC = props => {
  let { lesson_type, next } = props;
  let info;
  switch (lesson_type) {
  case LessonType.MUSICAL_PIECES:
    info = <p>בחלק זה תשמעו את האקורדים המלווים את השיר, ועליכם לשיר או לזמזם את המנגינה של השיר הכתוב.</p>;
    break;
  case LessonType.TONAL_CONTEXT:
    info = <p>בחלק זה תשמעו את הסולם העולה והיורד ואחריו אקורד בודד.</p>;
    break;
  case LessonType.AUTOMATIC:
    info = <p>בחלק זה תשמעו אקורדים בודדים משני הסוגים ששמעתם קודם לכן - בפסנתר ובגיטרה.</p>;
    break;
  };
  return (
    <div className="InfoBeforeLessonPartC">
      { info }
      <button onClick={next}>{Strings.continue_text}</button>
    </div>
  );
};

// The main lesson block component.
export class LessonBlock extends React.Component {
  steps = {
    PART_A: 1,
    PART_B: 2, 
    INFO: 3,
    PART_C: 4,
    DONE: 5,
  }

  nextStep = () => {
    const { step } = this.state;

    this.setState({
      step: step + 1
    });
    if (step + 1 === this.steps.DONE)
      this.next();
  }

  state = {
    step: 1,
  };
  
  constructor({data, lesson_type, next}) {
    super();
    this.data = data;
    this.lesson_type = lesson_type;
    this.next = next;
  }
  
  render() {
    const {step} = this.state;
    let screen;
    switch(step) {
    case this.steps.PART_A:
      screen = <LessonPart part={0} lesson_type={this.lesson_type} next={this.nextStep} key={step} />;
      break;
    case this.steps.PART_B:
      screen = <LessonPart part={1} lesson_type={this.lesson_type} next={this.nextStep} key={step} />;
      break;
    case this.steps.INFO:
      screen = <InfoBeforeLessonPartC lesson_type={this.lesson_type} next={this.nextStep} key={step} />;
      break;
    case this.steps.PART_C:
      screen = <LessonPart part={2} lesson_type={this.lesson_type} next={this.nextStep} key={step} />;
      break;
    }

    return screen;
  }
}
