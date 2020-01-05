import React from 'react';
import './TrainingExperiment.css';
import { Container } from 'semantic-ui-react';
import { IntroText, InfoText } from './info.js';
import { LessonType, Strings } from './defs.js';
import { LessonBlock } from './lesson_block.js';
import { TrainingBlock } from './training_block.js';

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
  </div>);
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
  spreadsheetId = '1D2s3D13ldvchzueCFWTkvH8kzhNBEMZzizPnjGQnhMY';
  apiKey = 'AIzaSyDHFHbGy_GhEt1Q4FW61YYEX2jk3hZcSoQ';
  writeScriptUrl = 'https://script.google.com/macros/s/AKfycbxv6Uc9VsHlKI6SMe6YmH-MELryrJYvYg-uQnGFhyMF2X7zyC-O/exec'
  readUrl = "https://sheets.googleapis.com/v4/spreadsheets/" 
  
  state = {
    step: 4,
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
    // read

        
    fetch(this.readUrl + this.spreadsheetId + "/values/TrainingExperiment!A2:A1000?key=" + this.apiKey)
      .then(response => response.json())
      .then(data => console.log(data));

    // write
    fetch(this.writeScriptUrl + "?id=1&session_number=2&timestamp=" + Date.now(),
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "GET",
            mode: 'no-cors',
          })
      .then(function(res){ console.log(res); })
      .catch(function(res){ console.log("error" + res); });
  }

  render() {
    const {step} = this.state;
    let screen;
    switch(step) {
    case 1:
      screen = <IntroScreen data={this.data} next={this.nextStep} />;
      break;
    case 2:
      screen = <InfoScreen next={this.nextStep} lesson_type={this.state.lesson_type} />;
      break;
    case 3:
      screen = <LessonBlock data={this.data} next={this.nextStep} lesson_type={this.state.lesson_type} />;
      break;
    case 4:
      screen = <TrainingBlock data={this.data} next={this.nextStep} lesson_type={this.state.lesson_type} />;
      break;
    case 5:
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
