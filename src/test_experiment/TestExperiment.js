import React from 'react';
import '../Experiment.css';
import './TestExperiment.css';
import { InfoScreen, ContinueButton, ErrorScreen, LoadingScreen } from '../ui.js';
import { Chords } from '../defs.js';
import { PretestBlock } from './pretest.js';
import { SubtestsBlock } from './subtests.js';
import { PersonalInfoScreen } from './personal_info.js';
import ls from 'local-storage';
import { does_user_sheet_exists } from '../sessions.js';
import gs from '../spreadsheet_io.js';
import { shuffleArray } from '../randomize.js';

const LoginScreen = ({next, data}) => {
  const handleContinue = () => {
    data.id = document.getElementById('id_input').value;
    next();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 infotext">
          <p className="text-center">תוכנת המבחן</p>
          <p>
            הכנס את מספר תעודת הזהות ולחץ על המשך כדי להתחיל.
          </p>          
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

const FinishScreen = ({data, done_saving}) => {
  return (
    <div className="container">
      <div className="col-md-8 offset-md-2 finish-screen text-center">
        <h1>תודה רבה!</h1>
        <p>{done_saving ? "הנתונים נשמרו בהצלחה!" : "אנא המתן לשמירת הנתונים..."}</p>
      </div>
    </div>
  );
};

const TestInfo = () => {
  return (
    <div>
      <p>מיד תעברו למסך ובו ארבעה סוגי אקורדים: מז'ור גדול, מז'ור קטן, מינור קטן, וחצי מוקטן.</p>
      <p>תחילה, תתבקשו לבצע ניסוי ללא קול: במרכז המסך יופיע אחד מסוגי האקורדים, ועליכם ללחוץ על סוג האקורד הזהה שבעיגול המקיף אותו.</p>
      <p>לאחר מספר ניסיונות ללא קול, תעברו לשמיעת האקורדים.</p>
      <p>לפני ההשמעה עליכם להניח את האצבע על סימן הפלוס שבאמצע המסך. יהיה עליכם לזהות את האקורד כמה שיותר מהר אך מבלי לוותר על דיוק. יהיה ניתן לשמוע את האקורד פעם אחת בלבד.</p>
      <p>ברגע הזיהוי יש ללחוץ על סוג האקורד במהירות האפשרית.</p>
      <p>בהצלחה!</p>
    </div>
  );
};

class TestExperiment extends React.Component {
  conn = { // read/write connection details for google spreadsheet.
    spreadsheet_id: '1D2s3D13ldvchzueCFWTkvH8kzhNBEMZzizPnjGQnhMY',
    api_key: 'AIzaSyDHFHbGy_GhEt1Q4FW61YYEX2jk3hZcSoQ',
    write_url: 'https://script.google.com/macros/s/AKfycbxv6Uc9VsHlKI6SMe6YmH-MELryrJYvYg-uQnGFhyMF2X7zyC-O/exec',
  }

  ls_prefix = "test_";
  sheet_suffix = "-test";

  steps = {
    LOGIN: 1,
    INFO: 2,
    PRETEST: 3,
    SUB_TESTS: 4,
    PERSONAL_INFO: 5,
    FINISH: 6,
  }

  state = {
    step: 1,
    error: null,
    loading: false,
  }

  data = {
    id: undefined,
    trials: [],
  }

  chord_button_labels = shuffleArray([Chords.BIG_MAJOR, Chords.SMALL_MAJOR, Chords.SMALL_MINOR, Chords.HALF_DIM]);

  nextStep = () => {
    const { step } = this.state;
    const new_step = step + 1;

    if (step > 1)
      ls.set(this.ls_prefix + "step", new_step);

    const altered_step = this.stepWillChange(step, new_step);
    this.setState({step: altered_step || new_step});
    this.stepChanged(new_step);
  }

  stepWillChange = (step, new_step) => {
    if (step === this.steps.LOGIN) {
      this.setState({loading: true});
      does_user_sheet_exists(this.conn, this.data.id + this.sheet_suffix)
        .then(sheet_exists => {
          if (sheet_exists) {
            this.setState({loading:false});
            ls.set(this.ls_prefix + "data", this.data);
          }
          else {
            this.setState({error: "גיליון מבחן עבור נבדק " + this.data.id + " לא קיים במערכת.",
                           loading: false});
          }

        })
        .catch(err => {
          this.setState({error: "לא ניתן להתחבר. בדקו את חיבור האינטרנט ונסו שוב. " + err});
        });

      // try to recover from local storage
      const cont_data = ls.get(this.ls_prefix + "data");
      if (cont_data && cont_data.id === this.data.id) {
        console.log("Loading from local storage...");
        
        this.data = cont_data;
        
        const cont_button_labels = ls.get(this.ls_prefix + "chord_button_labels");
        if (cont_button_labels)
          this.chord_button_labels = cont_button_labels;

        const cont_step = ls.get(this.ls_prefix + "step");
        if (cont_step) 
          return cont_step;
      }
      else {
        console.log("clearing local storage");
        ls.clear();
        ls.set(this.ls_prefix + "chord_button_labels", this.chord_button_labels);
      }
    }
  }

  stepChanged = (step) => {
    if (step === this.steps.FINISH) {
      this.data.end_time = new Date().toString();
      console.log("Saving data...");
      console.log(this.data.trials);

      this.data.trials.forEach(t => {
        t.id = this.data.id;
        t.start_time = this.data.start_time;
        t.end_time = this.data.end_time;
      });
      
      const that = this;
      gs.write(this.conn, "" + this.data.id + this.sheet_suffix, this.data.trials)
        .then(res => { 
          that.setState({done_saving: true});
          ls.clear(); 
        })
        .catch(this.dataSaveError);
    }
  }

  dataSaveError(response) {
    alert("Error while saving data: " + response);
  }

  componentDidMount() {
    this.data.start_time = new Date().toString();
  }

  render() {
    const {step} = this.state;
    console.log("rendering step " + step);

    if (this.state.error) {
      return <ErrorScreen error={this.state.error} />;
    } 
    else if (this.state.loading) {
      return <LoadingScreen />;
    } 
    else {
      switch(step) {
      case this.steps.LOGIN: 
        return <LoginScreen next={this.nextStep} data={this.data} />;
      case this.steps.INFO:
        const test_info = <TestInfo />;
        return <InfoScreen info={test_info} next={this.nextStep} />;
      case this.steps.PRETEST:
        return <PretestBlock next={this.nextStep} button_labels={this.chord_button_labels} />;
      case this.steps.SUB_TESTS:
        return <SubtestsBlock next={this.nextStep} data={this.data} button_labels={this.chord_button_labels} />;
      case this.steps.PERSONAL_INFO:
        return <PersonalInfoScreen next={this.nextStep} data={this.data} />;
      case this.steps.FINISH:
        return <FinishScreen done_saving={this.state.done_saving} />;
      default:
        return <div>???</div>;
      }
    }
  }
}

export default TestExperiment;
