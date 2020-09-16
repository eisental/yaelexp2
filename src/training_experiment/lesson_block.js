import React from 'react';
import { musical_pieces_data, LessonType, Chords } from '../defs.js';
import { AudioController } from '../audio_controller.js';
import { ButtonTable, InfoScreen, LoadingScreen, ContinueButton } from '../ui.js';
import { randomSequence } from '../randomize.js';
import ls from 'local-storage';

// Recordings used in each lesson type and part. i.e. 
// for part 1 and musical_pieces lesson: lesson_data.musical_pieces[1]
let lesson_data = {
  musical_pieces: [
    [[1, Chords.BIG_MAJOR], [2, Chords.SMALL_MAJOR], [3, Chords.SMALL_MINOR], [4, Chords.HALF_DIM]],
    [[5, Chords.BIG_MAJOR], [6, Chords.SMALL_MAJOR], [7, Chords.SMALL_MINOR], [8, Chords.HALF_DIM]],
    [[1021, Chords.BIG_MAJOR], [1025, Chords.SMALL_MAJOR], [1029, Chords.SMALL_MINOR], [1033, Chords.HALF_DIM]],
  ],
  tonal_context: [
    [[37, Chords.BIG_MAJOR], [38, Chords.SMALL_MAJOR], [39, Chords.SMALL_MINOR], [40, Chords.HALF_DIM]],
    [[37, Chords.BIG_MAJOR], [38, Chords.SMALL_MAJOR], [39, Chords.SMALL_MINOR], [40, Chords.HALF_DIM]],
    [[41, Chords.BIG_MAJOR], [42, Chords.SMALL_MAJOR], [43, Chords.SMALL_MINOR], [44, Chords.HALF_DIM],],
  ],
  automatic: [
    [[21, Chords.BIG_MAJOR], [25, Chords.SMALL_MAJOR], [29, Chords.SMALL_MINOR], [33, Chords.HALF_DIM]],
    [[21, Chords.BIG_MAJOR], [25, Chords.SMALL_MAJOR], [29, Chords.SMALL_MINOR], [33, Chords.HALF_DIM]],
    [[21, Chords.BIG_MAJOR], [25, Chords.SMALL_MAJOR], [29, Chords.SMALL_MINOR], [33, Chords.HALF_DIM]]
  ],
};

// Component for the lesson UI.
const LessonScreen = ({chord, lesson_type, chord_button_labels, next, show_next}) => {
  const highlight = chord_button_labels.indexOf(chord);
  const button_table = <ButtonTable labels={chord_button_labels} values={chord_button_labels} highlight={highlight} no_interaction />;

  let next_trial_button = null;
  if (show_next) {
    next_trial_button = (
      <div className="center-lesson-btn">
        <ContinueButton next={next} className="btn-secondary" />
      </div>
    );
  }

  let line1, line2;
  let song_image = null;

  switch (lesson_type) {
  case LessonType.MUSICAL_PIECES:
    const song_data = musical_pieces_data[chord];
    line1 = "שם השיר:";
    line2 = song_data.name;
    song_image = <img className="center-chord-image" src={song_data.imgSrc} alt=""/>;
    break;
  case LessonType.TONAL_CONTEXT:
    line1 = "שם האקורד הראשון:";
    line2 = chord;
    break;
  case LessonType.AUTOMATIC:
    line1 = "שם האקורד:";
    line2 = chord;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 center-block text-center">
          <p className="chordName">{line1}</p>
          <p className="chordName">{line2}</p>
        </div>

      </div>
      <div className="row lesson-button-table">
        {button_table}
        {next_trial_button}
      </div>
      <div className="row text-center">
        {song_image}
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
    const chord = trialData[1];

    if (this.state.done_loading) {
      const { lesson_type, chord_button_labels } = this.session;
      return <LessonScreen chord={chord} lesson_type={lesson_type} chord_button_labels={chord_button_labels} next={nextTrial} show_next={this.state.done_playing}/>;
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
        <p>מיד תשמעו קטעים קצרים מתוך שירים מוכרים. בכל קטע שתשמעו, יושמעו אקורדים (מספר צלילים המנוגנים יחד) המלווים את השירה. האקורד הראשון יהיה האקורד המשמעותי, אליו עליכם להתייחס. אקורד זה יושמע בשנית לאחר הקטע.</p>
        <p>שימו לב כי הקטעים חוזרים על עצמם מספר רב של פעמים, בכדי לאפשר לכם למידה מעמיקה. נסו להאזין היטב בכל אחת מן ההשמעות.</p>
      </div>;
    break;
  case LessonType.TONAL_CONTEXT:
    info = 
      <div>
        <p>מיד תשמעו צמדי אקורדים. לפני כל צמד אקורדים תשמעו סולם עולה ויורד (צלילים שמנוגנים בזה אחר זה, בניגוד לאקורדים עצמם, שבהם הצלילים מנוגנים יחד). לאחר מכן, בכל צמד אקורדים שתשמעו, האקורד הראשון יהיה האקורד המשמעותי, אליו עליכם להתייחס.</p>
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
      מיד תשמעו אקורדים זהים לאקורדים ששמעתם בחלק הקודם. 
      בכל קטע שתשמעו, האקורד הראשון יהיה האקורד המשמעותי, אליו עליכם להתייחס.
      שימו לב כי הקטעים חוזרים על עצמם מספר רב של פעמים, בכדי לאפשר לכם למידה מעמיקה. נסו להאזין היטב בכל אחת מן ההשמעות.
      </p>;
    break;
  case LessonType.AUTOMATIC:
    info = 
      <p>
      מיד תשמעו אקורדים זהים לאקורדים ששמעתם בחלק הקודם.
      שימו לב כי האקורדים חוזרים על עצמם מספר רב של פעמים, בכדי לאפשר לכם למידה מעמיקה. נסו להאזין היטב בכל אחת מן ההשמעות.
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
    info = <p>בחלק זה תשמעו את האקורדים המלווים את השיר בלבד, ללא המנגינה, ועליכם לשיר או לזמזם את המנגינה של השיר ששמו מופיע.</p>;
    break;
  case LessonType.TONAL_CONTEXT:
    info = <p>בחלק זה תשמעו את הסולם העולה והיורד ואחריו אקורד בודד.</p>;
    break;
  case LessonType.AUTOMATIC:
    info = 
      <p>
      בחלק זה תשמעו אקורדים זהים לאקורדים ששמעתם בחלק הקודם.
      שימו לב כי האקורדים חוזרים על עצמם מספר רב של פעמים, בכדי לאפשר לכם למידה מעמיקה. נסו להאזין היטב בכל אחת מן ההשמעות.
      </p>;
    break;
  };

  return <InfoScreen info={info} next={next}/>;
};

// The main lesson block component. Responsible mostly for the lesson sequence.
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
