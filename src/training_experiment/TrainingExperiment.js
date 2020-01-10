import React from 'react';
import './TrainingExperiment.css';
import { Container } from 'semantic-ui-react';
import { IntroText, InfoText } from './info.js';
import { LessonType, Strings } from './defs.js';
import { LessonBlock } from './lesson_block.js';
import { TrainingBlock } from './training_block.js';
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

function FinishScreen({data}) {
  return (<div>
          Finish text goes here<br/>
          data = {data.id}
          </div>);
}

class TrainingExperiment extends React.Component {
  conn = {
    spreadsheet_id: '1D2s3D13ldvchzueCFWTkvH8kzhNBEMZzizPnjGQnhMY',
    api_key: 'AIzaSyDHFHbGy_GhEt1Q4FW61YYEX2jk3hZcSoQ',
    write_url: 'https://script.google.com/macros/s/AKfycbxv6Uc9VsHlKI6SMe6YmH-MELryrJYvYg-uQnGFhyMF2X7zyC-O/exec',
  }
 
  trainingSheetName = "TrainingExperiment";

  state = {
    step: 1,
    lesson_type: LessonType.MUSICAL_PIECES
  };

  data = {
    id: null,
  };
  
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
    console.log(this.data);
  }

  componentDidMount() {
    // read session data
    /* TODO:
       read all sessions in the beginning.
       enforce session limit.
       find the next session number.
       put in data.
     */
    gs.read(this.conn, this.trainingSheetName, "A2:E5")
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(response => console.log("error: " + response)); // TODO: handle errors!
    this.data["start_time"] = new Date().toString();
  }

  render() {
    const {step} = this.state;
    let screen;
    switch(step) {
    case 1:
      screen = <IntroScreen data={this.data} next={this.nextStep} />;
      break;
    case 5: // should be 2
      screen = <InfoScreen next={this.nextStep} lesson_type={this.state.lesson_type} />;
      break;
    case 4: // should be 3
      screen = <LessonBlock data={this.data} next={this.nextStep} lesson_type={this.state.lesson_type} />;
      break;
    case 3: // should be 4
      screen = <TrainingBlock data={this.data} next={this.nextStep} lesson_type={this.state.lesson_type} />;
      break;
    case 2: // should be 5
      // end of session. 
      this.data["end_time"] = new Date().toString();

      // write data
      gs.write(this.conn, this.trainingSheetName, this.data)
        .then(res => console.log(res))
        .catch(res => console.log("error" + res)); // TODO: handle errors!

      screen = <FinishScreen data={this.data} />;
    }
    return (
        <Container textAlign='center' className="App">
          {screen}
        </Container>
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
