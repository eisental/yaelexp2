import React from 'react';
import './TrainingExperiment.css';
import { Container } from 'semantic-ui-react';
import { IntroText, InfoText } from './info.js';
import { LessonType, Strings, SheetNames } from '../defs.js';
import { LessonBlock } from './lesson_block.js';
import { TrainingBlock } from './training_block.js';
import { SessionEvent, parseSessions, writeSessionEvent, readSessionData } from '../sessions.js';
import gs from '../spreadsheet_io.js';

// 1st screen.
function IntroScreen({next, data}) {
  function handleContinue() {
    data.id = document.getElementById('id_input').value;
    next();
  }

  return (
    <div className="IntroScreen">
      <IntroText />
      <label>"ת"ז:</label>
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
  conn = {
    spreadsheet_id: '1D2s3D13ldvchzueCFWTkvH8kzhNBEMZzizPnjGQnhMY',
    api_key: 'AIzaSyDHFHbGy_GhEt1Q4FW61YYEX2jk3hZcSoQ',
    write_url: 'https://script.google.com/macros/s/AKfycbxv6Uc9VsHlKI6SMe6YmH-MELryrJYvYg-uQnGFhyMF2X7zyC-O/exec',
  }
 
  steps = {
    INTRO: 3,
    INFO: 2, 
    LESSON: 4,
    TRAINING: 1,
    FINISH: 5
  }

  state = {
    step: 1,
    lesson_type: LessonType.MUSICAL_PIECES,
    isLoading: true, // true until session data is received.
    doneSaving: false, // false until the data is saved to the spreadsheet.
  };

  data = {
    id: undefined,
  };

  session = {
    id: undefined,
    number: undefined
  };

  nextStep = () => {
    const { step } = this.state;

    this.stepWillChange(step);
    this.setState({
      step: step + 1
    });
    this.stepChanged(step + 1);
  }

  stepWillChange = (step) => {
    if (step == this.steps.INTRO) {
      console.log("got some session data:");
      console.log(this.state.sessions);

      // TODO: enforce session limit by reading this.state.sessions

      // start session
      this.session.id = this.data.id;
      this.session.number = 666;
      writeSessionEvent(this.conn, this.session, 
                        SessionEvent.SESSION_START, this.sessionEventError);

    }
  } 

  stepChanged = (step) => {
    console.log("stepChanged: " + step);

    if (step == this.steps.FINISH) {
      // end of session. 
      this.data.end_time = new Date().toString();

      // write data
      let that = this;
      console.log("Saving data...");
      gs.write(this.conn, SheetNames.TRAINING_DATA, this.data)
        .then(res => { that.setState({doneSaving: true}); })
        .catch(this.dataSaveError);

      // write session ended event
      writeSessionEvent(this.conn, this.session, 
                        SessionEvent.SESSION_END, this.sessionEventError);
      // TODO: need to make sure both writes finished before setting doneSaving: true!
    }
  }

  dataSaveError = (response) => {
    console.log("error" + response);
  }

  sessionEventError = (response) => {
    console.log("error while writing session event.");
  }

  sessionDataLoaded = (session_data) => {
    console.log("got session data");
    console.log(session_data);
    this.setState({ isLoading: false,
                    sessions: session_data});
  }

  sessionDataLoadError = (response) => {
    // ask to refresh the page, try again... contact info?
    console.log("error: " + response);
  }

  componentDidMount() {
    // read session data
    /* TODO:
       create another spreadsheet just for sessions! one row begins session another ends.
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
      screen = <FinishScreen data={this.data} doneSaving={this.state.doneSaving}/>;
    }

    if (this.state.isLoading)
      screen = <div>Loading...</div>;

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
