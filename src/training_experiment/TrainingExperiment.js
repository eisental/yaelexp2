import React from 'react';
import './TrainingExperiment.css';
import { IntroText, InfoText } from './info.js';
import { LessonType, Strings, SheetNames } from '../defs.js';
import { LessonBlock } from './lesson_block.js';
import { TrainingBlock } from './training_block.js';
import { does_user_sheet_exists, was_last_session_today, SessionEvent, writeSessionEvent, readSessionData } from '../sessions.js';
import gs from '../spreadsheet_io.js';
import ls from 'local-storage';

// 1st screen.
function IntroScreen({next, data}) {
  function handleContinue() {
    data.id = document.getElementById('id_input').value;
    next();
  }

  return ( // the hidden p tag is there to balance the " marks
    <div className="IntroScreen">
      <IntroText />
      <label>ת"ז:</label>
      <p hidden>"</p>
      <input type="text" id="id_input"/><br/>
      <button onClick={handleContinue}>{Strings.continue_text}</button>
    </div>
  );
}

// 2nd screen. Different text per lesson type.
function InfoScreen({next, lesson_type}) {
  return (
    <div className="InfoScreen">
      <InfoText lesson_type={lesson_type} />
      <button onClick={next}>{Strings.continue_text}</button>
    </div>
  );
}

function FinishScreen({data, doneSaving}) {
  return (<div>
          {doneSaving ? "Saved data!" : "Saving data, please wait..."}<br/>
          Session number x / y<br/>
          data = {data.id}
          </div>);
}

class TrainingExperiment extends React.Component {
  conn = { // read/write connection details for google spreadsheet.
    spreadsheet_id: '1D2s3D13ldvchzueCFWTkvH8kzhNBEMZzizPnjGQnhMY',
    api_key: 'AIzaSyDHFHbGy_GhEt1Q4FW61YYEX2jk3hZcSoQ',
    write_url: 'https://script.google.com/macros/s/AKfycbxv6Uc9VsHlKI6SMe6YmH-MELryrJYvYg-uQnGFhyMF2X7zyC-O/exec',
  }

  MAX_NUMBER_OF_SESSIONS = 5

  steps = {
    INTRO: 1,
    INFO: 2, 
    LESSON: 3,
    TRAINING: 5,
    FINISH: 4
  }

  state = {
    step: 1,
    lesson_type: LessonType.MUSICAL_PIECES,
    is_loading_session: true, // true until session data is received.
    did_check_user_registered: false, // false until sheet list is received.
    done_saving: false, // false until the data is saved to the spreadsheet.
    max_sessions_reached: false,
    session_done_for_today: false,
    user_unregistered: true,
    did_load_registration_list: false,
  };

  data = {
    id: undefined,
  };

  session = {
    id: undefined,
    number: undefined
  };

  maybe_start_session = () => {
    // Check previous sessions data. Start a new session accordingly
    // or enforce session limits.
    this.session.id = this.data.id;
    const previous_sessions = this.sessions.filter(e => e.id === this.session.id);
    
    if (previous_sessions.length === 0) {
      // First session
      this.session.number = 0;
      writeSessionEvent(this.conn, this.session, 
                        SessionEvent.SESSION_START);
    }
    else {
      // Not first session
      const last_session = previous_sessions[previous_sessions.length-1];
      const last_session_number = parseInt(last_session.number);
      
      if (last_session.event !== SessionEvent.SESSION_END) {
        // The last session for this subject id isn't finished.
        if (was_last_session_today(last_session)) {
          // Same day. Try to continue the last session.
          this.session.number = last_session_number;
          writeSessionEvent(this.conn, this.session, 
                            SessionEvent.SESSION_CONTINUED, this.sessionEventError);
          // Retreive session and data from local storage.
          const continued_session = ls.get('session');
          console.log("continued_session:");
          console.log(continued_session);
          if (continued_session) {
            console.log("Loading session data from local storage.");
            this.session = continued_session;
          }

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
          if (continued_step) {
            this.setState({step: continued_step});
          }
        }
        else {
          // A new day. TODO: what happens when max session reached on unfinished session?
          if (last_session_number + 1 >= this.MAX_NUMBER_OF_SESSIONS) {
            // enforce the session limit.
            this.setState({max_sessions_reached: true});
          } 
          else {
            // Continue to next session. 
            // TODO: should this automatically add another lesson? or just use the same session number?
            this.session.number = last_session_number + 1;
            writeSessionEvent(this.conn, this.session, 
                              SessionEvent.SESSION_START);
          }
        }
      }
      else {
        // The last session was finished. 
        if (last_session_number + 1 >= this.MAX_NUMBER_OF_SESSIONS) {
          // enforce the session limit.
          this.setState({max_sessions_reached: true});
        }
        else {
          if (!was_last_session_today(last_session)) {
            // Start a new session
            this.session.number = last_session_number + 1;
            writeSessionEvent(this.conn, this.session, 
                              SessionEvent.SESSION_START);
          }
          else {
            // No more sessions for today.
            this.setState({session_done_for_today: true});
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
          else this.setState({user_unregistered: true});
        }).catch(this.sessionDataLoadError);
    }
  } 

  stepChanged = (step) => {
    console.log("stepChanged: " + step);
    
    // TEMPORARY: save data to local storage.
    ls.set('data', this.data);
    
    if (step === this.steps.FINISH) {
      // end of session. 
      this.data.end_time = new Date().toString();

      // write data
      let that = this;
      console.log("Saving data...");
      this.data.session_number = this.session.number;
      gs.write(this.conn, this.data.id, this.data)
        .then(res => { that.setState({done_saving: true}); })
        .catch(this.dataSaveError);

      // write session ended event
      writeSessionEvent(this.conn, this.session, 
                        SessionEvent.SESSION_END, this.sessionEventError);
      // TODO: need to make sure both writes finished before setting done_saving: true!

      // clear session from local storage. TODO: also do this only after both saves are done.
      ls.clear();
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
    console.log("error: " + response);
  }

  componentDidMount() {
    // read session data
    /* TODO:
       read all sessions in the beginning.
       enforce session limit.
       find the next session number.
       put in data.
     */
    var that = this;
    
    readSessionData(this.conn)
      .then(that.sessionDataLoaded)
      .catch(that.sessionDataLoadError); // TODO: handle errors!
        
    this.data.start_time = new Date().toString();
  }

  render() {
    const {step} = this.state;
    let screen;
    switch(step) {
    case this.steps.INTRO:
      screen = <IntroScreen data={this.data} next={this.nextStep} />;
      break;
    case this.steps.INFO:
      screen = <InfoScreen next={this.nextStep} lesson_type={this.state.lesson_type} />;
      break;
    case this.steps.LESSON:
      screen = <LessonBlock data={this.data} next={this.nextStep} lesson_type={this.state.lesson_type} />;
      break;
    case this.steps.TRAINING:
      screen = <TrainingBlock data={this.data} next={this.nextStep} lesson_type={this.state.lesson_type} />;
      break;
    case this.steps.FINISH:
      screen = <FinishScreen data={this.data} doneSaving={this.state.done_saving}/>;
    }

    if (this.state.is_loading_session)
      screen = <div>Loading...</div>;
    if (this.state.step == 2) {
      // After entering ID on the intro screen we check the session data before continuing.
      if (!this.state.did_load_registration_list) 
        screen = <div>Waiting for registered users list...</div>;
      else {
        if (this.state.max_sessions_reached)
          screen = <div>Max sessions reached!</div>;
        else if (this.state.session_done_for_today)
          screen = <div>No more sessions allowed today!</div>;
        else if (this.state.did_load_registration_list && this.state.user_unregistered)
          screen = <div>Unregistered user id!</div>;
      }
    }

    return (
        <div textalign='center' className="App">
          <div className="container">
            {screen}
          </div>
        </div>
    );
  }
}


export default TrainingExperiment;

/*
  TODO:
  - validate id (eventually check against db)
  - experiment screens
  - css (bootstrap?)
  - code to talk with spreadsheet
  - randomization
  - session management
  - write data
*/
