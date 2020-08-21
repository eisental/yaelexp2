import React from 'react';
import '../Experiment.css';
import './TrainingExperiment.css';
import { IntroText, InfoText, PretestInfo } from './info.js';
import { Chords, LessonType }  from '../defs.js';
import { LessonBlock } from './lesson_block.js';
import { TrainingBlock } from './training_block.js';
import { InfoScreen, LoadingScreen, ErrorScreen, ContinueButton, ButtonTable } from '../ui.js';
import { write_subject_data, read_subject_data, does_user_sheet_exists, was_last_session_today, SessionEvent, writeSessionEvent, readSessionData, readLessonType } from '../sessions.js';
import { shuffleArray, randomSequence } from '../randomize.js';
import gs from '../spreadsheet_io.js';
import ls from 'local-storage';

const MAX_NUMBER_OF_SESSIONS = 5;

// 1st screen.
const IntroScreen = ({next, data}) => {
  function handleContinue() {
    data.id = document.getElementById('id_input').value;
    next();
  }

  return ( // the hidden p tag is there to balance the " marks
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 infotext">
          <IntroText />
        </div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col text-center">
          <br/>
          <label>ת"ז: <input type="text" id="id_input"/><br/></label>
          <p hidden>"</p>
          <br/>
          <ContinueButton next={handleContinue} disabled={false} />
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

const FinishScreen = ({done_saving, session_number}) => {
  const remaining = MAX_NUMBER_OF_SESSIONS - session_number;
  return (
    <div className="container">
      <div className="col-md-8 offset-md-2">
        <p>הפעלה מספר {session_number} הסתיימה. נותרו עוד {remaining} הפעלות.</p>
        <p>{done_saving ? "הנתונים נשמרו בהצלחה!" : "אנא המתן לשמירת הנתונים..."}</p>
      </div>
    </div>
  );
};

const ContinueScreen = ({session_number, next}) => {
  const info = <p className="text-center">לחץ על הכפתור כדי להמשיך את הפעלה מספר {session_number}.</p>;
  return <InfoScreen info={info} next={next} />;
};

const AssociationForm = ({data, session, next}) => {
  const save_data = () => {
    const chord_associations = document.getElementById('chord_associations').value;

    if (chord_associations.length===0) {
      alert("אנא ענו על השאלה.");
      return;
    }

    const td = {
      time: new Date().toString(),
      session_number: session.number,
      chord_associations: chord_associations
    };
    data.trials.push(td);
    ls.set("data", data);
    next();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8 offset-sm-2 association-form">
          <label htmlFor="chord_associations">אם השתמשתם/ן באסוציאציות לזיהוי האקורדים, אנא ציינו כעת באילו אסוציאציות השתמשתם/ן:</label>
          <textarea id="chord_associations" rows="5" cols="70"/>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-8 offset-sm-2 text-center">
          <ContinueButton next={save_data} />
        </div>
      </div>
    </div>
  );
};

class PretestBlock extends React.Component {
  state = {
    trial_idx: 0,
  };

  practice_trials_count = 8;
  test_trails_count = 20;
  button_idxs = [0, 1, 2, 3];

  constructor({session, next, data}) {
    super();
    this.next = next;
    this.data = data;
    this.session = session;

    this.ls_prefix = "pretest_";
    if (session.continued) {
      this.sequence = ls.get(this.ls_prefix + "sequence");
      const trial_idx = ls.get(this.ls_prefix + "trial_idx");
      if (trial_idx !== null) this.state.trial_idx = trial_idx;
      session.continued = false;
    }
    else {
      const practice_sequence = randomSequence(this.button_idxs, this.practice_trials_count);
      const test_sequence = randomSequence(this.button_idxs, this.test_trails_count);
      this.sequence = practice_sequence.concat(test_sequence);
      ls.set(this.ls_prefix + "sequence", this.sequence);
      ls.set(this.ls_prefix + "trial_idx", this.state.trial_idx);
    }

    this.response_start = new Date();
  }

  render() {
    const that = this;
    const target_btn = this.sequence[this.state.trial_idx];

    const nextTrial = (selection) => {
      if (this.state.trial_idx+1 > this.practice_trials_count) {
        // save trial data
        const correct = selection === target_btn;
        const td = {
          time: new Date().toString(),
          correct: correct,
          response_time: new Date() - that.response_start,
          session_number: 0,
        };
        that.data.trials.push(td);
        ls.set("data", that.data);
      }

      if (this.state.trial_idx < that.practice_trials_count + that.test_trails_count - 1) {
        that.setState({trial_idx: this.state.trial_idx + 1});
        that.response_start = new Date();
        ls.set(this.ls_prefix + "trial_idx", this.state.trial_idx+1);
      }
      else {
        that.next();
      }
    };
    let labels = [null, null, null, null];
    labels[target_btn] = <div className="pretestCircle"></div>;
    return (
      <div className="container">
        <ButtonTable labels={labels} values={this.button_idxs} next={nextTrial} key={this.state.trial_idx}/>
      </div>
    );
  }
};

class TrainingExperiment extends React.Component {
  conn = { // read/write connection details for google spreadsheet.
    spreadsheet_id: '1D2s3D13ldvchzueCFWTkvH8kzhNBEMZzizPnjGQnhMY',
    api_key: 'AIzaSyDHFHbGy_GhEt1Q4FW61YYEX2jk3hZcSoQ',
    write_url: 'https://script.google.com/macros/s/AKfycbxv6Uc9VsHlKI6SMe6YmH-MELryrJYvYg-uQnGFhyMF2X7zyC-O/exec',
  }

  steps = {
    INTRO: 1,
    INFO: 2, 
    PRETEST_INFO: 3,
    PRETEST: 4, 
    LESSON: 5,
    FREE_TRAINING: 6,
    FAST_TRAINING: 7,
    ASSOCIATION_FORM: 8, // only when lesson type is automatic.
    FINISH: 9
  }

  state = {
    step: 1,
    is_loading_session: true, // true until session data is received.
    did_check_user_registered: false, // false until sheet list is received.
    done_saving: false, // false until the data is saved to the spreadsheet.
    max_sessions_reached: false,
    session_done_for_today: false,
    user_unregistered: true,
    did_load_registration_list: false,
    did_load_lesson_type: false,
  };

  data = {
    id: undefined,
    trials: [],
  };

  // Check previous sessions data. Start a new session accordingly
  // or enforce session limits.
  maybe_start_session = () => {
    let session = {id: this.data.id};
    const previous_sessions = this.sessions.filter(e => e.id === session.id);
    if (previous_sessions.length === 0) {
      // First session
      ls.clear();
      session.number = 1;
      this.start_new_session(session);
    }
    else {
      // Not first session
      const last_session = previous_sessions[previous_sessions.length-1];
      const last_session_number = parseInt(last_session.number);
      
      session.lesson_type = parseInt(last_session.lesson_type);
      if (last_session.event !== SessionEvent.SESSION_END) {
        // The last session for this subject id isn't finished.
        if (was_last_session_today(last_session)) {
          // Same day. Try to continue the last session.
          session.number = last_session_number;
          // Retreive session and data from local storage.
          console.log("Looking for session data in local storage.");
          const continued_session = ls.get('session');
          if (continued_session && continued_session.id === session.id) {
            session = continued_session;
            const continued_data = ls.get('data');
            if (continued_data) {
              console.log("Loading experiment data from local storage.");
              this.data = continued_data;
            }
            
            const continued_step = ls.get('step');
            session.continued = true;
            this.setState({continued_step: continued_step || this.steps.INFO,
                           session: session});
            this.stepChanged(continued_step);
          } 
          else {
            // Can't continue session. Redo the session (this shouldn't actually happen)
            ls.clear();
            session.number = last_session_number;
            this.start_new_session(session);
          }
        }
        else {
          // A new day.
          ls.clear();
          this.setState({cant_continue_session: true,
                         session: session});
        }
      }
      else {
        // The last session was finished. 
        ls.clear();
        if (last_session_number >= MAX_NUMBER_OF_SESSIONS) {
          // enforce the session limit.
          this.setState({max_sessions_reached: true,
                         session: session});
        }
        else {
          if (!was_last_session_today(last_session)) {
            // Start a new session
            session.number = last_session_number + 1;
            this.start_new_session(session);
          }
          else {
            // No more sessions for today.
            this.setState({session_done_for_today: true,
                           session: session});
          }
        }
      }
    }
  }

  start_new_session = (session) => {
    if (session.number === 1) {
      // First session. Read lesson type from the LessonTypes spreadsheet (the table is maintained by 
      // the experimenter), and generate a random chord button order for all sessions and test.
      // Write the data to the SubjectsData spreadsheet.
      readLessonType(this.conn, session.id)
        .then(lesson_type => {
          if (lesson_type === -1)
            this.setState({session: session, 
                           user_unregistered: true,
                           did_load_lesson_type: true});
          else {
            session.lesson_type = lesson_type;            
            session.chord_button_labels = shuffleArray([Chords.BIG_MAJOR, Chords.SMALL_MAJOR, 
                                                        Chords.SMALL_MINOR, Chords.HALF_DIM]);
            ls.set('session', session);

            writeSessionEvent(this.conn, session, 
                              SessionEvent.SESSION_START);
            write_subject_data(this.conn, session);

            this.setState({session: session,
                           did_load_lesson_type: true});
          }
        })
        .catch(err => { alert("Error while reading lessons: " + err); });
    }
    else {
      // Not first session. Read lesson type and button order from the SubjectsData spreadsheet.
      read_subject_data(this.conn, session.id)
        .then((subject_data) => {
          if (subject_data) {
            session.chord_button_labels = subject_data.chord_button_labels;
            session.lesson_type = parseInt(subject_data.lesson_type);
            ls.set('session', session);
            writeSessionEvent(this.conn, session, 
                              SessionEvent.SESSION_START);
            this.setState({session: session,
                           did_load_lesson_type: true});
          }
          else {
            this.setState({session: session,
                           cant_read_subject_data: true});
          }
        })
        .catch(err => {
          alert("Error while reading subject data:" + err);
        });
    }
  }

  continue_session = () => {
    const { continued_step, step } = this.state;
    this.stepWillChange(step, continued_step);
    this.setState({
      step: continued_step,
      continued_step: undefined
    });
    this.stepChanged(continued_step);

    ls.set('session', this.state.session);
    writeSessionEvent(this.conn, this.state.session, 
                      SessionEvent.SESSION_CONTINUED, this.sessionEventError);
  }


  nextStep = () => {
    const { step } = this.state;
    let new_step = step + 1;

    if (this.state.session && this.state.session.number && this.state.session.number !== 1) {
      if (step + 1 === this.steps.PRETEST_INFO || step + 1 === this.steps.PRETEST)
        // jump over pretest after the 1st session.
        new_step = this.steps.PRETEST + 1;
      else if (step + 1 === this.steps.ASSOCIATION_FORM && 
               (this.state.session.lesson_type !== LessonType.AUTOMATIC ||
                (this.state.session.number !== 1 && this.state.session.number !== MAX_NUMBER_OF_SESSIONS)))
        // jump over association form unless this is the 1st or last session of automatic lesson type.
        new_step = this.steps.ASSOCIATION_FORM + 1;
    }

    if (step > 1) // otherwise the key will be overwritten before loading.
      ls.set('step', new_step);

    this.stepWillChange(step, new_step);
    this.setState({
      step: new_step
    });
    this.stepChanged(new_step);
  }

  stepWillChange = (step, new_step) => {
    if (step === this.steps.INTRO) {
      // Start the session logic after entering subject id in the first screen.
      does_user_sheet_exists(this.conn, this.data.id)
        .then((sheet_exists) => { 
          this.setState({did_load_registration_list: true});
          if (sheet_exists) {
            this.setState({user_unregistered: false});
            this.maybe_start_session(); 
          }
          else this.setState({user_unregistered: true, session: {}});
        }).catch(this.sessionDataLoadError);
    }
  } 

  stepChanged = (step) => {   
    if (step === this.steps.FINISH) {
      // end of session. 
      this.data.end_time = new Date().toString();

      // write data
      console.log("Saving data...");

      this.data.trials.forEach(t => { 
        t.id = this.data.id;
        if (t.session_number === undefined)
          t.session_number = this.state.session.number;
        t.start_time = this.data.start_time;
        t.end_time = this.data.end_time;
      });

      let that = this;
      gs.write(this.conn, this.data.id, this.data.trials)
        .then(res => { that.setState({done_saving: true});
                       ls.clear(); })
        .catch(this.dataSaveError);

      // write session ended event
      writeSessionEvent(this.conn, this.state.session, 
                        SessionEvent.SESSION_END, this.sessionEventError);
      // TODO: need to make sure both writes finished before setting done_saving: true!

      // clear session from local storage. TODO: also do this only after both saves are done.

    }
  }

  dataSaveError = (response) => {
    alert("Error while saving data: " + response);
  }

  sessionEventError = (response) => { // TODO
    alert("Error while writing session event.");
  }

  sessionDataLoaded = (session_data) => {
    this.setState({ is_loading_session: false });
    this.sessions = session_data;
  }

  sessionDataLoadError = (response) => { // TODO
    // ask to refresh the page, try again... contact info?
    alert("Session data load error: " + response);
  }

  componentDidMount() {
    // read session data
    var that = this;
    
    readSessionData(this.conn)
      .then(that.sessionDataLoaded)
      .catch(that.sessionDataLoadError);

    this.data.start_time = new Date().toString();
  }

  getScreenForStep(step) {
    let screen;
    switch(step) {
    case this.steps.INTRO:
      screen = <IntroScreen data={this.data} next={this.nextStep} key={step}/>;
      break;
    case this.steps.INFO:
      this.state.session.continued = false;
      const info = <InfoText lesson_type={this.state.session.lesson_type} key={step} />;
      screen = <InfoScreen info={info} next={this.nextStep}/>;
      break;
    case this.steps.PRETEST_INFO:
      this.state.session.continued = false;
      const pretest_info = <PretestInfo />;
      screen = <InfoScreen info={pretest_info} next={this.nextStep} key={step} />;
      break;
    case this.steps.PRETEST:
      screen = <PretestBlock data={this.data} next={this.nextStep} session={this.state.session} key={step} />;
      break;
    case this.steps.LESSON:
      screen = <LessonBlock data={this.data} next={this.nextStep} session={this.state.session} key={step} />;
      break;
    case this.steps.FREE_TRAINING:
      screen = <TrainingBlock data={this.data} is_free={true} next={this.nextStep} session={this.state.session} key={step} />;
      break;
    case this.steps.FAST_TRAINING:
      screen = <TrainingBlock data={this.data} is_free={false} next={this.nextStep} session={this.state.session} key={step} />;
      break;
    case this.steps.ASSOCIATION_FORM:
      screen = <AssociationForm data={this.data} session={this.state.session} next={this.nextStep} key={step} />;
      break;
    case this.steps.FINISH:
      screen = <FinishScreen done_saving={this.state.done_saving} session_number={this.state.session.number}  key={step}/>;
      break;
    }
    
    return screen;
  } 

  render() {
    const {step} = this.state;

    let screen;

    if (this.state.is_loading_session || !this.state.did_load_lesson_type)
      screen = <LoadingScreen />;
    
    if (this.state.continued_step !== undefined) {
      screen = <ContinueScreen session_number={this.state.session.number} next={this.continue_session}/>;
    } else if (this.state.step === 2) {
      // After entering ID on the intro screen we check the session data before continuing.
      if (!this.state.did_load_registration_list || !this.state.session) 
        screen = <LoadingScreen />;
      else {
        if (this.state.max_sessions_reached)
          screen = <ErrorScreen error="עברת את מספר ההפעלות המותר." />;
        else if (this.state.session_done_for_today)
          screen = <ErrorScreen error="ביצעת כבר הפעלה אחת של התוכנה היום. ניתן להתחבר שוב מחר." />;
        else if (this.state.did_load_registration_list && this.state.user_unregistered)
          screen = <ErrorScreen error="מספר הנבדק לא קיים במערכת! אנא צרו קשר עם הנסיינית ונסו שוב." />;
        else if (this.state.cant_continue_session) 
          screen = <ErrorScreen error="ההפעלה האחרונה שלך לא הושלמה. לא ניתן להמשיך בניסוי. אנא צרו קשר עם הנסיינית." />;
        else if (this.state.cant_read_subject_data)
          screen = <ErrorScreen error={"לא ניתן לקרוא נתונים עבור נבדק " + this.data.id + "."} />;
        else screen = this.getScreenForStep(step);
      }
    }
    else screen = this.getScreenForStep(step);

    return screen;
  }
}

export default TrainingExperiment;
