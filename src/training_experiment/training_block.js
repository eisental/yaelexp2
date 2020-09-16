import React from 'react';
import { AudioController } from '../audio_controller.js';
import { LessonType, LessonTypeNumbering, Strings, StaticImages, Chords, musical_pieces_data } from '../defs.js';
import { ReplayButton, LoadingScreen, ContinueButton, ButtonTable } from '../ui.js';
import { randomSequence } from '../randomize.js';
import { TrainingInfo, InfoBeforeTrainingPartB, InfoBeforeTrainingPartC } from './info.js';
import ls from 'local-storage';

// each trial entry is [audio_idx, chord, transposition]
const training_data = {
  musical_pieces: [
    [[1, Chords.BIG_MAJOR, 0], [2, Chords.SMALL_MAJOR, 0], // part 1
     [3, Chords.SMALL_MINOR, 0], [4, Chords.HALF_DIM, 0]],

    [[5, Chords.BIG_MAJOR, 0], [6, Chords.SMALL_MAJOR, 0], // part 2
     [7, Chords.SMALL_MINOR, 0], [8, Chords.HALF_DIM, 0],
     [9, Chords.BIG_MAJOR, 1], [12, Chords.SMALL_MAJOR, 1], 
     [15, Chords.SMALL_MINOR, 1], [18, Chords.HALF_DIM, 1],
     [10, Chords.BIG_MAJOR, 2], [13, Chords.SMALL_MAJOR, 2], 
     [16, Chords.SMALL_MINOR, 2], [19, Chords.HALF_DIM, 2],
     [11, Chords.BIG_MAJOR, 3], [14, Chords.SMALL_MAJOR, 3], 
     [17, Chords.SMALL_MINOR, 3], [20, Chords.HALF_DIM, 3]],

    [[1021, Chords.BIG_MAJOR, 0], [1022, Chords.BIG_MAJOR, 1], // part 3
     [1023, Chords.BIG_MAJOR, 2], [1024, Chords.BIG_MAJOR, 3],
     [1025, Chords.SMALL_MAJOR, 0], [1026, Chords.SMALL_MAJOR, 1],
     [1027, Chords.SMALL_MAJOR, 2], [1028, Chords.SMALL_MAJOR, 3],
     [1029, Chords.SMALL_MINOR, 0], [1030, Chords.SMALL_MINOR, 1], 
     [1031, Chords.SMALL_MINOR, 2], [1032, Chords.SMALL_MINOR, 3],
     [1033, Chords.HALF_DIM, 0], [1034, Chords.HALF_DIM, 1], 
     [1035, Chords.HALF_DIM, 2], [1036, Chords.HALF_DIM, 3]],
  ],
  tonal_context: [
    [[37, Chords.BIG_MAJOR, 0], [38, Chords.SMALL_MAJOR, 0], // part 1
     [39, Chords.SMALL_MINOR, 0], [40, Chords.HALF_DIM, 0]],

    [[41, Chords.BIG_MAJOR, 0], [42, Chords.SMALL_MAJOR, 0], // part 2
     [43, Chords.SMALL_MINOR, 0], [44, Chords.HALF_DIM, 0],
     [45, Chords.BIG_MAJOR, 1], [48, Chords.SMALL_MAJOR, 1],
     [51, Chords.SMALL_MINOR, 1], [54, Chords.HALF_DIM, 1],
     [46, Chords.BIG_MAJOR, 2], [49, Chords.SMALL_MAJOR, 2],
     [52, Chords.SMALL_MINOR, 2], [55, Chords.HALF_DIM, 2],
     [47, Chords.BIG_MAJOR, 3], [50, Chords.SMALL_MAJOR, 3],
     [53, Chords.SMALL_MINOR, 3], [56, Chords.HALF_DIM, 3]],
    
    [[21, Chords.BIG_MAJOR, 0], [22, Chords.BIG_MAJOR, 1],  // part 3
      [23, Chords.BIG_MAJOR, 2], [24, Chords.BIG_MAJOR, 3],
      [25, Chords.SMALL_MAJOR, 0], [26, Chords.SMALL_MAJOR, 1],
      [27, Chords.SMALL_MAJOR, 2], [28, Chords.SMALL_MAJOR, 3],
      [29, Chords.SMALL_MINOR, 0], [30, Chords.SMALL_MINOR, 1], 
      [31, Chords.SMALL_MINOR, 2], [32, Chords.SMALL_MINOR, 3],
      [33, Chords.HALF_DIM, 0], [34, Chords.HALF_DIM, 1], 
      [35, Chords.HALF_DIM, 2], [36, Chords.HALF_DIM, 3]],
  ],
  automatic: [
    [[21, Chords.BIG_MAJOR, 0], [25, Chords.SMALL_MAJOR, 0], // part 1
     [29, Chords.SMALL_MINOR, 0], [33, Chords.HALF_DIM, 0]],

    [[21, Chords.BIG_MAJOR, 0], [22, Chords.BIG_MAJOR, 1], // part 2
     [23, Chords.BIG_MAJOR, 2], [24, Chords.BIG_MAJOR, 3],
     [25, Chords.SMALL_MAJOR, 0], [26, Chords.SMALL_MAJOR, 1],
     [27, Chords.SMALL_MAJOR, 2], [28, Chords.SMALL_MAJOR, 3],
     [29, Chords.SMALL_MINOR, 0], [30, Chords.SMALL_MINOR, 1],
     [31, Chords.SMALL_MINOR, 2], [32, Chords.SMALL_MINOR, 3],
     [33, Chords.HALF_DIM, 0], [34, Chords.HALF_DIM, 1],
     [35, Chords.HALF_DIM, 2], [36, Chords.HALF_DIM, 3]],

    [[21, Chords.BIG_MAJOR, 0], [22, Chords.BIG_MAJOR, 1], // part 3
     [23, Chords.BIG_MAJOR, 2], [24, Chords.BIG_MAJOR, 3],
     [25, Chords.SMALL_MAJOR, 0], [26, Chords.SMALL_MAJOR, 1],
     [27, Chords.SMALL_MAJOR, 2], [28, Chords.SMALL_MAJOR, 3],
     [29, Chords.SMALL_MINOR, 0], [30, Chords.SMALL_MINOR, 1],
     [31, Chords.SMALL_MINOR, 2], [32, Chords.SMALL_MINOR, 3],
     [33, Chords.HALF_DIM, 0], [34, Chords.HALF_DIM, 1],
     [35, Chords.HALF_DIM, 2], [36, Chords.HALF_DIM, 3]]    
  ],
};

const correction_suffixes = {
  [Chords.BIG_MAJOR]: "A",
  [Chords.SMALL_MAJOR]: "B",
  [Chords.SMALL_MINOR]: "C",
  [Chords.HALF_DIM]: "D",
};

const musical_pieces_correction_data = {
  [Chords.BIG_MAJOR]: 1, 
  [Chords.SMALL_MAJOR]: 2, 
  [Chords.SMALL_MINOR]: 3, 
  [Chords.HALF_DIM]: 4 
};

const TrainingScreen = ({chord, lesson_type, lesson_part, chord_button_labels, is_free, 
                         answer_received, replay_count, is_playing, next, replay}) => {
  let song_image = null;
  let desc_line1 = "\u00a0";
  let desc_line2 = "\u00a0";

  if (lesson_part === 0 && lesson_type === LessonType.MUSICAL_PIECES) {
    const song_data = musical_pieces_data[chord];
    desc_line1 = "שם השיר:";
    desc_line2 = song_data.name;

    song_image = (
      <div className="row text-center">
        <img className="center-chord-image" src={song_data.imgSrc} alt=""/>
      </div>
    );
  }

  const replay_button = (is_free && !answer_received && replay_count > 0 && !is_playing) ? (
    <div className="center-lesson-btn">
      <ReplayButton onClick={replay} />
    </div>
  ) : null;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 center-block text-center">
          <p className="chordName">{desc_line1}</p>
          <p className="chordName">{desc_line2}</p>
        </div>
      </div>
      <div className="row lesson-button-table">
        <ButtonTable labels={chord_button_labels} values={chord_button_labels} next={next} disabled={answer_received}/>
      </div>
      {song_image}
      {replay_button}
    </div>
  );
};

const CorrectFeedbackScreen = props => {
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

const IncorrectFeedbackScreen = props => {
  const { shouldShowCorrect, shouldShowButton, correctChord, lesson_type, part, next} = props;

  let appendix;

  if (shouldShowCorrect === true){
    const button = shouldShowButton ? <ContinueButton next={next} /> : null;
    let text;
    if (part === 2 || lesson_type === LessonType.AUTOMATIC) text = "האקורד שהושמע הוא אקורד ";
    else if (lesson_type === LessonType.MUSICAL_PIECES) text = "בשיר יש אקורד ";
    else text = "בהקלטה יש אקורד ";
    
    appendix = 
      <div>
        <span className="songTitle">{ text } </span>
        <span className="songTitle">{ correctChord }</span>
        <br/>
        <span className="songTitle">{ Strings.how_it_sounds }</span>
        <br/>
        <br/>
        {button}
      </div>;
  } else appendix = null;

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 offset-sm-1 text-center">
            <span className="songTitle"> { Strings.failure_identification } &nbsp;</span>
            <br/>
            <span className="songTitle">{ Strings.how_it_sounds }</span>
            { appendix }
        </div>
        <div className="col-sm-2">
          <img src= { StaticImages.sadSmiley } width="150px" height="150px" alt="" className="sadSmiley"/>
        </div>
      </div>
    </div>
  );
};

class TrainingPart extends React.Component {
  state = {
    trial_idx: 0,
    done_loading: false,
    is_playing_trial: true,
    is_playing_incorrect: false,
    is_playing_correct: false,
    answer_received: false,
    replay_count: 2,
  };

  trials_per_part = 16;

  constructor({part, session, is_free, chord_buttons, next, data}) {
    super();
    this.part = part;
    this.session = session;
    this.is_free = is_free;
    this.chord_buttons = chord_buttons;
    this.next = next;
    this.data = data;

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
      if (trial_idx !== null) this.state.trial_idx = trial_idx;
      session.continued = false; // we only need to restore session once!
    }
    else {
      this.sequence = randomSequence(this.part_data, this.trials_per_part);
      ls.set(this.ls_prefix + "sequence", this.sequence);
      ls.set(this.ls_prefix + "trial_idx", this.state.trial_idx);
    }

    console.log("Training sequence for part " + this.part + ":");
    console.log(this.sequence);

    const gen_letters_correction_list = (add_correct) => {
      return this.part_data.map(d => {
        let l = [];
        const idx = d[0] < 1000 ? d[0] : d[0] - 1000;

        for (const chord in correction_suffixes) {
          if (chord !== d[1])
            l.push(idx + correction_suffixes[chord]);
        }
        if (add_correct)
          l.push(idx + "Correct");

        if (d[0] >= 1000)
          l.push(idx);

        return l;
      }).flat();
    };
    
    let feedback_idxs = null;
    
    switch (this.session.lesson_type) {
    case LessonType.MUSICAL_PIECES:
      if (part === 0) {
        feedback_idxs = [1, 2, 3, 4];
      }
      else {
        feedback_idxs = gen_letters_correction_list(false);
      }
      break;
    case LessonType.TONAL_CONTEXT:
      feedback_idxs = gen_letters_correction_list(part < 2);
      break;
    case LessonType.AUTOMATIC:
      feedback_idxs = gen_letters_correction_list(false);
      break;
    }

    this.audioController = new AudioController(feedback_idxs.concat(this.part_data.map(d => d[0])), 
                                               this.doneLoadingAudio, this.donePlaying);
  }

  /* calculate the transposition count since the beginning of part. */
  get_transposition_play_count() { 
    const idx = this.state.trial_idx;
    const trial = this.sequence[idx];
    const count_in_part = this.sequence.slice(0, idx)
      .filter(t => t[1] === trial[1] && t[2] === trial[2]).length + 1;
    return count_in_part;
  }

  doneLoadingAudio = () => {
    this.setState({done_loading: true});
    this.audioController.play(this.sequence[this.state.trial_idx][0]);
    this.response_start = new Date();
  };

  donePlaying = () => {
    if (this.state.is_playing_trial) {
      // finished playing trial audio.
      this.setState({is_playing_trial: false});
      if (this.state.answer_received) {
        if (!this.state.correct) {
          this.audioController.play(this.state.selected_audio_idx);
        }
      }
    }
    else {
      // finished playing correct or incorrect
      if (this.state.is_playing_incorrect) {
        // play the correct answer audio idx
        this.audioController.play(this.state.correct_audio_idx);
        this.setState({is_playing_correct: true,
                       is_playing_incorrect: false});
      } else if (this.state.is_playing_correct) {
        // done playing feedback, show continue button.
        this.setState({done_playing_correct_feedback: true,
                       is_playing_correct: false});
      }
    }
  }

  replay = () => {
    const { trial_idx, replay_count } = this.state;
    this.setState({replay_count: replay_count-1, is_playing_trial: true});
    this.audioController.play(this.sequence[trial_idx][0]);
  }

  nextTrial = () => {
    const trial_idx = this.state.trial_idx;
    if (trial_idx < this.trials_per_part - 1) {
      this.audioController.play(this.sequence[trial_idx+1][0]);
      this.setState({trial_idx: trial_idx + 1,
                     is_playing_trial: true,
                     answer_received: false});
      this.response_start = new Date(); // RT measurement
    }
    else {
      this.next();
    }
  }

  processAnswer = (answer) => {
    const trial_data = this.sequence[this.state.trial_idx];
    const chord_name = trial_data[1];
    const transposition = trial_data[2];

    const correct = answer === chord_name;

    // save trial data
    const td = {
      time: new Date().toString(),
      strategy: LessonTypeNumbering[this.session.lesson_type],
      part: this.part + 1,
      is_free: this.is_free ? 1 : 2,
      audio_index: trial_data[0],
      chord_number: this.trials_per_part * this.part + this.state.trial_idx + 1,
      chord_type: chord_name,
      transposition: transposition + 1,
      transposition_play_count: this.get_transposition_play_count(),
      selected_chord_type: answer,
      correct: correct,
      response_time: new Date() - this.response_start,
    };
    this.data.trials.push(td);
    ls.set("data", this.data);
    if (this.state.trial_idx+1 < this.trials_per_part)
      ls.set(this.ls_prefix + "trial_idx", this.state.trial_idx+1);

    // continue to show answer feedback
    if (!correct) {
      // find the right selected and correct audio indices.

      const c_idx = trial_data[0] < 1000 ? trial_data[0] : trial_data[0] - 1000;
      let selected_audio_idx, correct_audio_idx;

      if (this.session.lesson_type === LessonType.MUSICAL_PIECES && this.part===0) {
        selected_audio_idx = musical_pieces_correction_data[answer];
        correct_audio_idx = musical_pieces_correction_data[trial_data[1]];
      }
      else {
        selected_audio_idx = c_idx + correction_suffixes[answer];
        if (this.session.lesson_type === LessonType.TONAL_CONTEXT && this.part < 2) {
          correct_audio_idx = c_idx + "Correct";
        }
        else {
          correct_audio_idx = c_idx;
        }
      }

      if (!this.state.is_playing_trial) {
        this.audioController.play(selected_audio_idx);
      }

      this.setState({answer_received: true,
                     correct: correct,
                     is_playing_incorrect: true,
                     is_playing_correct: false,
                     done_playing_correct_feedback: false,
                     correct_audio_idx: correct_audio_idx,
                     selected_audio_idx: selected_audio_idx});

    }
    else {        
      this.setState({answer_received: true,
                     correct: correct});
    }
  }

  render() {
    const trial_data = this.sequence[this.state.trial_idx];
    const chord_name = trial_data[1];
    const transposition = trial_data[2];
    
    if (!this.state.done_loading) {
      return <LoadingScreen />;
    }

    else if (this.state.answer_received && !this.state.is_playing_trial) {
      // show feedback screen
      if (this.state.correct) {
        return <CorrectFeedbackScreen next={this.nextTrial}/>;
      } else {
        return <IncorrectFeedbackScreen shouldShowCorrect={!this.state.is_playing_incorrect} 
                                        shouldShowButton={this.state.done_playing_correct_feedback} 
                                        correctChord={chord_name} lesson_type={this.session.lesson_type} 
                                        next={this.nextTrial} part={this.part}/>;
      }
    }

    else { 
      return (
        <TrainingScreen chord={chord_name} lesson_type={this.session.lesson_type} lesson_part={this.part} 
                        chord_button_labels={this.chord_buttons} is_free={this.is_free} 
                        answer_received={this.state.answer_received} replay_count={this.state.replay_count} 
                        is_playing={this.state.is_playing_trial} next={this.processAnswer} replay={this.replay}/>
      );
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

  nextStep = () => {
    const { step } = this.state;

    this.setState({
      step: step + 1
    });

    ls.set("training_block_step", step + 1);

    if (step + 1 === this.steps.DONE)
      this.next();
  }

  constructor({data, session, is_free, next}) {
    super();
    this.data = data;
    this.session = session;
    this.next = next;
    this.chord_buttons = session.chord_button_labels;
    this.is_free = is_free;

    if (session.continued) {
      this.state.step = ls.get("training_block_step");
    }
    else {
      ls.set("training_block_step", this.state.step);
    }
  }

  render() {
    const { step } = this.state;
    let screen;
    switch (step) {
    case this.steps.INFO_A:
      this.session.continued = false;
      screen = <TrainingInfo lesson_type={this.session.lesson_type} is_free={this.is_free} next={this.nextStep} key={step} />;
      break;
    case this.steps.PART_A:
      screen = <TrainingPart part={0} session={this.session} is_free={this.is_free} next={this.nextStep} key={step} chord_buttons={this.chord_buttons} data={this.data} />;
      break;
    case this.steps.INFO_B:
      this.session.continued = false;
      screen = <InfoBeforeTrainingPartB lesson_type={this.session.lesson_type} is_free={this.is_free} next={this.nextStep} key={step} />;
      break;
    case this.steps.PART_B:
      screen = <TrainingPart part={1} session={this.session} is_free={this.is_free} next={this.nextStep} key={step} chord_buttons={this.chord_buttons} data={this.data} />;
      break;
    case this.steps.INFO_C:
      this.session.continued = false;
      screen = <InfoBeforeTrainingPartC lesson_type={this.session.lesson_type} is_free={this.is_free} next={this.nextStep} key={step} />;
      break;
    case this.steps.PART_C:
      screen = <TrainingPart part={2} session={this.session} is_free={this.is_free} next={this.nextStep} key={step} chord_buttons={this.chord_buttons} data={this.data} />;
      break;
    case this.steps.DONE:
      screen = null;
      break;
    };

    return screen;
  }
}
