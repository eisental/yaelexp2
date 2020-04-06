import React from 'react';
import './TrainingExperiment.css';
import { IntroText, InfoText } from './info.js';
import { LessonType, Strings } from '../defs.js';
import { LessonBlock } from './lesson_block.js';
import { TrainingBlock } from './training_block.js';
import { InfoScreen, LoadingScreen, ErrorScreen, ContinueButton } from '../ui.js';
import { does_user_sheet_exists, was_last_session_today, SessionEvent, writeSessionEvent, readSessionData, readLessonType } from '../sessions.js';
import gs from '../spreadsheet_io.js';
import ls from 'local-storage';

const MAX_NUMBER_OF_SESSIONS = 5;

// 1st screen.
function IntroScreen({next, data}) {
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
}

// 2nd screen. Different text per lesson type.
function StartScreen({next, lesson_type}) {
  const info = <InfoText lesson_type={lesson_type} />;
  return <InfoScreen info={info} next={next}/>;
}

function FinishScreen({data, done_saving, session_number}) {
  const remaining = MAX_NUMBER_OF_SESSIONS - session_number - 1;
  return (
    <div className="container">
      <div className="col-md-8 offset-md-2">
        <p>הפעלה מספר {session_number+1} הסתיימה. נותרו עוד {remaining} הפעלות.</p>
        <p>{done_saving ? "הנתונים נשמרו בהצלחה!" : "אנא המתן לשמירת הנתונים..."}</p>
      </div>
    </div>
  );
}

class TrainingExperiment extends React.Component {
  conn = { // read/write connection details for google spreadsheet.
    spreadsheet_id: '1D2s3D13ldvchzueCFWTkvH8kzhNBEMZzizPnjGQnhMY',
    api_key: 'AIzaSyDHFHbGy_GhEt1Q4FW61YYEX2jk3hZcSoQ',
    write_url: 'https://script.google.com/macros/s/AKfycbxv6Uc9VsHlKI6SMe6YmH-MELryrJYvYg-uQnGFhyMF2X7zyC-O/exec',
  }

  steps = {
    INTRO: 1,
    INFO: 2, 
    LESSON: 3,
    TRAINING: 4,
    FINISH: 5
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

  maybe_start_session = () => {
    // Check previous sessions data. Start a new session accordingly
    // or enforce session limits.
    let session = {id: this.data.id};
    const previous_sessions = this.sessions.filter(e => e.id === session.id);
    console.log("previous_session:");
    console.log(previous_sessions);
    if (previous_sessions.length === 0) {
      // First session
      ls.clear();
      session.number = 0;
      this.setState({did_load_lesson_type: false});
      console.log("call readLessontype");
      readLessonType(this.conn, session.id)
        .then(lesson_type => {
          if (lesson_type === -1)
            this.setState({session: session, 
                           user_unregistered: true,
                           did_load_lesson_type: true});
          else {
            session.lesson_type = lesson_type;
            console.log("loaded lesson_type: " + lesson_type);
            writeSessionEvent(this.conn, session, 
                              SessionEvent.SESSION_START);
            
            this.setState({session: session,
                           did_load_lesson_type: true});
          }

        })
        .catch(err => { console.log("error while reading lessons: " + err); });
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
          // Retreive session and data from local storage. <== TODO: deal with missing values.
          const continued_session = ls.get('session');
          console.log("continued_session:");
          console.log(continued_session);
          if (continued_session && continued_session.id === session.id) {
            writeSessionEvent(this.conn, session, 
                              SessionEvent.SESSION_CONTINUED, this.sessionEventError);
            
            console.log("Loading session data from local storage.");
            session = continued_session;
            const continued_data = ls.get('data');
            console.log("continued_data:");
            console.log(continued_data);
            if (continued_data) {
              console.log("Loading experiment data from local storage.");
              this.data = continued_data;
            }
            
            const continued_step = ls.get('step');
            console.log("continued_step:");
            console.log(continued_step);
            
            session.continued = true;
            this.setState({step: continued_step || this.steps.INFO,
                           session: session});            
          } 
          else {
            // Can't continue session. Start a new one. 
            ls.clear();
            session.number = last_session_number + 1;
            writeSessionEvent(this.conn, session, 
                              SessionEvent.SESSION_START);
            this.setState({session: session});
          }
        }
        else {
          // A new day. TODO: what happens when max session reached on unfinished session?
          ls.clear();
          if (last_session_number + 1 >= MAX_NUMBER_OF_SESSIONS) {
            // enforce the session limit.
            this.setState({max_sessions_reached: true,
                           session: session});
          } 
          else {
            // Continue to next session. 
            // TODO: should this automatically add another lesson? or just use the same session number?
            session.number = last_session_number + 1;
            writeSessionEvent(this.conn, session, 
                              SessionEvent.SESSION_START);
            this.setState({session: session});
          }
        }
      }
      else {
        // The last session was finished. 
        ls.clear();
        if (last_session_number + 1 >= MAX_NUMBER_OF_SESSIONS) {
          // enforce the session limit.
          this.setState({max_sessions_reached: true,
                         session: session});
        }
        else {
          if (!was_last_session_today(last_session)) {
            // Start a new session
            session.number = last_session_number + 1;
            writeSessionEvent(this.conn, session, 
                              SessionEvent.SESSION_START);
            this.setState({session: session});
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

  nextStep = () => {
    const { step } = this.state;
    if (step > 1) // otherwise the key will be overwritten before loading.
      ls.set('step', step + 1);
    this.stepWillChange(step);
    this.setState({
      step: step + 1
    });
    this.stepChanged(step + 1);
  }

  stepWillChange = (step) => {
    if (step === this.steps.INTRO) {
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
      console.log(this.data.trials);

      this.data.trials.forEach(t => { 
        t.id = this.data.id;
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
    console.log("error" + response);
  }

  sessionEventError = (response) => { // TODO
    console.log("error while writing session event.");
  }

  sessionDataLoaded = (session_data) => {
    this.setState({ is_loading_session: false });
    this.sessions = session_data;
  }

  sessionDataLoadError = (response) => { // TODO
    // ask to refresh the page, try again... contact info?
    console.log("Session data load error: " + response);
  }

  componentDidMount() {
    // read session data
    var that = this;
    
    readSessionData(this.conn)
      .then(that.sessionDataLoaded)
      .catch(that.sessionDataLoadError); // TODO: handle errors!

    this.data.start_time = new Date().toString();
  }

  getScreenForStep(step) {
    let screen;
    console.log("session: ");
    console.log(this.state.session);
    {
      switch(step) {
      case this.steps.INTRO:
        screen = <IntroScreen data={this.data} next={this.nextStep} />;
        break;
      case this.steps.INFO:
        this.state.session.continued = false;
        screen = <StartScreen next={this.nextStep} lesson_type={this.state.session.lesson_type} />;
        break;
      case this.steps.LESSON:
        screen = <LessonBlock data={this.data} next={this.nextStep} session={this.state.session} />;
        break;
      case this.steps.TRAINING:
        screen = <TrainingBlock data={this.data} next={this.nextStep} session={this.state.session} />;
        break;
      case this.steps.FINISH:
        screen = <FinishScreen data={this.data} done_saving={this.state.done_saving} session_number={this.state.session.number} />;
      }
    }
    return screen;
  } 

  render() {
    const {step} = this.state;

    let screen;

    if (this.state.is_loading_session || !this.state.did_load_lesson_type)
      screen = <LoadingScreen />;
    if (this.state.step === 2) {
      // After entering ID on the intro screen we check the session data before continuing.
      if (!this.state.did_load_registration_list || !this.state.session) 
        screen = <LoadingScreen />;
      else {
        if (this.state.max_sessions_reached)
          screen = <ErrorScreen error="עברת את מספר ההפעלות המותר." />;
        else if (this.state.session_done_for_today)
          screen = <ErrorScreen error="ביצעת כבר הפעלה אחת של התוכנה היום. ניתן להתחבר שוב מחר." />;
        else if (this.state.did_load_registration_list && this.state.user_unregistered)
          screen = <ErrorScreen error="מספר הנבדק לא קיים במערכת! אנא צור קשר עם הנסיינית ונסה שוב." />;
        else screen = this.getScreenForStep(step);
      }
    }
    else screen = this.getScreenForStep(step);

    return screen;
  }
}

export default TrainingExperiment;
