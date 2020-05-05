import React from 'react';
import { musical_pieces_data, LessonType, Chords } from '../defs.js';
import { AudioController } from '../audio_controller.js';
import { InfoScreen, LoadingScreen, ContinueButton } from '../ui.js';
import { randomSequence } from '../randomize.js';
import ls from 'local-storage';

// Recordings used in each lesson type and part. i.e. 
// for part 1 and musical_pieces lesson: lesson_data.musical_pieces[1]
let lesson_data = {
  musical_pieces: [
    [[1, Chords.BIG_MAJOR], [2, Chords.SMALL_MAJOR], [3, Chords.SMALL_MINOR], [4, Chords.HALF_DIM]],
    [[5, Chords.BIG_MAJOR], [6, Chords.SMALL_MAJOR], [7, Chords.SMALL_MINOR], [8, Chords.HALF_DIM]],
    [[1009, Chords.BIG_MAJOR], [1013, Chords.SMALL_MAJOR], [1017, Chords.SMALL_MINOR], [1021, Chords.HALF_DIM]],
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
      <div className="col-sm-8 offset-sm-2 align-middle">
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
    <div className="songDisplayWrapper">
      <img className="songImage" src={ songData.imgSrc } alt=""/>
      <div className="row">
        <div className="col text-center">
          <div className="songTitle">
            שם השיר:
            <br/>
            { songData.name }
            <br/>
            <br/>
            שם האקורד:
            <br/>
            { chordName }
          </div>
        </div>
      </div>
    </div>
  );
};

// This component represents one part of the lesson. There are 3 parts. The only difference 
// between them is the audio sequence. Audio playing code is here.
class LessonPart extends React.Component {
  state = {
    trial_idx: 0,
    done_playing: false,
    done_loading: false,
  }

  constructor({part, session, next}) {
    super();
    this.part = part;
    this.next = next;
    this.state.done_loading = false;
    this.trials_per_part = 16;
    this.session = session;

    switch (this.session.lesson_type) {
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

    this.ls_prefix = "lesson_part" + part + "_";
    if (session.continued) {
      this.sequence = ls.get(this.ls_prefix + "sequence");
      const trial_idx = ls.get(this.ls_prefix + "trial_idx");
      if (trial_idx !== null) this.state.trial_idx = trial_idx;
      session.continued = false;
    }
    else {
      this.sequence = randomSequence(this.part_data, this.trials_per_part);
      ls.set(this.ls_prefix + "sequence", this.sequence);
      ls.set(this.ls_prefix + "trial_idx", this.state.trial_idx);
    }

//    console.log("LESSON PART " + part + " sequence:");
//    console.log(this.sequence);

    const that = this;
    const doneLoadingAudio = () => {
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
      if (trial_idx < that.trials_per_part - 1) {
        that.setState({trial_idx: trial_idx+1,
                       done_playing: false});
        that.audioController.play(this.sequence[trial_idx+1][0]);
        ls.set(this.ls_prefix + "trial_idx", trial_idx + 1);
      }
      else {
        that.next();
      }
    };

    const trialData  = this.sequence[this.state.trial_idx];
    const chordName = trialData[1];
    const songData = musical_pieces_data[chordName];

    if (this.state.done_loading) {
      let screen;
      if (this.session.lesson_type === LessonType.MUSICAL_PIECES) {
        screen = <SongWithoutChords chordName={chordName} songData={songData}/>;
      }
      else {
        screen = <NameOfChord chordName={chordName} lesson_type={this.session.lesson_type}/>;
      }
      const button = this.state.done_playing ? (
          <div className="row">
            <div className="col-sm-8 offset-sm-2 text-center">
              <br/>
              <ContinueButton next={nextTrial} />
            </div>
          </div>) : null;

      return (
        <div className="container">
          {screen}
          {button}
        </div>
      );
    }
    else {
      return <LoadingScreen />;
    }
  }
}

const InfoBeforeLessonPartA = props => {
  let { lesson_type, next } = props;
  let info;
  switch (lesson_type) {
  case LessonType.MUSICAL_PIECES:
    info = 
      <div>
        <p>מיד תשמעו קטעים קצרים מתוך שירים ישראליים מוכרים. בכל קטע שתשמעו, האקורד הראשון יהיה האקורד המשמעותי, אליו עליכם להתייחס.</p>
        <p>שימו לב כי הקטעים חוזרים על עצמם מספר רב של פעמים, בכדי לאפשר לכם למידה מעמיקה. נסו להאזין היטב בכל אחת מן ההשמעות.</p>
      </div>;
    break;
  case LessonType.TONAL_CONTEXT:
    info = 
      <div>
        <p>מיד תשמעו צמדי אקורדים. לפני כל צמד אקורדים תשמעו מבוא טונאלי – סולם עולה ויורד. בכל צמד אקורדים שתשמעו, האקורד הראשון יהיה האקורד המשמעותי, אליו עליכם להתייחס.</p>
        <p>שימו לב כי הקטעים חוזרים על עצמם מספר רב של פעמים, בכדי לאפשר לכם למידה מעמיקה. נסו להאזין היטב בכל אחת מן ההשמעות.</p>
      </div>;
    break;
  case LessonType.AUTOMATIC:
    info = 
      <div>
        <p>מיד תישמעו אקורדים. </p>
        <p>שימו לב כי האקורדים חוזרים על עצמם מספר רב של פעמים, בכדי לאפשר לכם למידה מעמיקה. נסו להאזין היטב בכל אחת מן ההשמעות.</p>
      </div>;
    break;
  };

  return <InfoScreen info={info} next={next}/>;
};

const InfoBeforeLessonPartB = props => {
  let { lesson_type, next } = props;
  let info;
  switch (lesson_type) {
  case LessonType.MUSICAL_PIECES:
    info = 
      <p>
      מיד תשמעו קטעים זהים לקטעים ששמעתם, אך הפעם בביצוע של חליל ופסנתר. 
      בכל קטע שתשמעו, האקורד הראשון יהיה האקורד המשמעותי, אליו עליכם להתייחס.
      שימו לב כי הקטעים חוזרים על עצמם מספר רב של פעמים, בכדי לאפשר לכם למידה מעמיקה. נסו להאזין היטב בכל אחת מן ההשמעות.
      </p>;
    break;
  case LessonType.TONAL_CONTEXT:
    info =
      <p>
      מיד תשמעו אקורדים זהים לאקורדים ששמעתם, אך הפעם בביצוע של גיטרה. 
      בכל קטע שתשמעו, האקורד הראשון יהיה האקורד המשמעותי, אליו עליכם להתייחס.
      שימו לב כי הקטעים חוזרים על עצמם מספר רב של פעמים, בכדי לאפשר לכם למידה מעמיקה. נסו להאזין היטב בכל אחת מן ההשמעות.
      </p>;
    break;
  case LessonType.AUTOMATIC:
    info = 
      <p>
      מיד תשמעו אקורדים זהים לאקורדים ששמעתם, אך הפעם בביצוע של גיטרה. שימו לב כי האקורדים חוזרים על עצמם מספר רב של פעמים, בכדי לאפשר לכם למידה מעמיקה. נסו להאזין היטב בכל אחת מן ההשמעות.
      </p>;
    break;
  };

  return <InfoScreen info={info} next={next}/>;
};

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

  return <InfoScreen info={info} next={next}/>;
};

// The main lesson block component.
export class LessonBlock extends React.Component {
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

  nextStep = () => {
    const { step } = this.state;

    this.setState({
      step: step + 1
    });
    ls.set("lesson_block_step", step + 1);

    if (step + 1 === this.steps.DONE)
      this.next();
  }

  state = {
    step: 1,
  };
  
  constructor({data, session, next}) {
    super();
    this.data = data;
    this.session = session;
    this.next = next;

    if (session.continued) {
      this.state.step = ls.get("lesson_block_step", this.state.step);
    }
    else {
      ls.set("lesson_block_step", this.state.step);
    }
  }
  
  render() {
    const {step} = this.state;
    let screen;

    switch(step) {
    case this.steps.INFO_A:
      this.session.continued = false;
      screen = <InfoBeforeLessonPartA lesson_type={this.session.lesson_type} next={this.nextStep} key={step} />;
      break;
    case this.steps.PART_A:
      screen = <LessonPart part={0} session={this.session} next={this.nextStep} key={step} />;
      break;
    case this.steps.INFO_B:
      this.session.continued = false;
      screen = <InfoBeforeLessonPartB lesson_type={this.session.lesson_type} next={this.nextStep} key={step} />;
      break;
    case this.steps.PART_B:
      screen = <LessonPart part={1} session={this.session} next={this.nextStep} key={step} />;
      break;
    case this.steps.INFO_C:
      this.session.continued = false;
      screen = <InfoBeforeLessonPartC lesson_type={this.session.lesson_type} next={this.nextStep} key={step} />;
      break;
    case this.steps.PART_C:
      screen = <LessonPart part={2} session={this.session} next={this.nextStep} key={step} />;
      break;
    case this.steps.DONE:
      this.nextStep();
    }

    return screen;
  }
}
