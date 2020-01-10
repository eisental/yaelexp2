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
        <div textAlign='center' className="App">
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
