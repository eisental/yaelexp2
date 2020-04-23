import React from 'react';
import { Button, ButtonTable } from '../ui.js';
import ls from 'local-storage';
import { randomSequence } from '../randomize.js';

const PretestTrial = ({button_labels, next, trial_idx, trial_chord}) => {
  return (
    <div className="container">
      <div className="overlay-box"><p>{trial_chord}</p></div>
      <div className="row">
        <ButtonTable labels={button_labels} values={button_labels} next={next} key={trial_idx} />
      </div>
    </div>    

  );
};

const ContinueScreen = ({next, on_keep_going}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col text-center">
          <p>האם ברצונך להמשיך בתרגול היבש?</p>
        </div>
      </div>
      <br/>
      <div className="row">
        <div className="col-sm-2 offset-sm-4 text-center">
          <Button label="כן" onClick={on_keep_going}/>
        </div>      
        <div className="col-sm-2 text-center">
          <Button label="לא" onClick={next}/>
        </div>
      </div>            
    </div>
  );
};

export class PretestBlock extends React.Component {
  state = {
    trial_idx: 0,
    keep_going: false,
  }

  trials_count = 14;

  ls_prefix = "test_pretest_";

  constructor({data, next, button_labels}) {
    super();
    this.data = data;
    this.next = next;
    this.button_labels = button_labels;
    
    const cont_trial_idx = ls.get(this.ls_prefix + "trial_idx");
    if (cont_trial_idx !== null) {      
      console.log("loading sequence from local storage");
      this.sequence = ls.get(this.ls_prefix + "sequence");
      this.state.trial_idx = cont_trial_idx;
    }
    else {
      this.sequence = randomSequence(button_labels, this.trials_count);
      ls.set(this.ls_prefix + "sequence", this.sequence);
      ls.set(this.ls_prefix + "trial_idx", this.state.trial_idx);      
    }
    console.log("sequence:");
    console.log(this.sequence);
  }

  nextTrial = (answer) => {
    const { trial_idx } = this.state;

    this.data.trials.push({
      time: new Date().toString(),
      subtest: 0,
      chord_type: this.sequence[trial_idx % this.trials_count],
      selected_chord_type: answer,
      correct: answer === this.sequence[trial_idx % this.trials_count],
      response_time: new Date() - this.response_start
    });
    ls.set("test_data", this.data);

    this.setState({trial_idx: trial_idx + 1,
                   keep_going: false});
    ls.set(this.ls_prefix + "trial_idx", trial_idx + 1);
    this.response_start = new Date();
  }

  keepGoing = () => {
    this.sequence = randomSequence(this.button_labels, this.trials_count);
    ls.set(this.ls_prefix + "sequence", this.sequence);      
    console.log("sequence:");
    console.log(this.sequence);
    this.setState({keep_going: true});
    this.response_start = new Date();
  };

  componentDidMount() {
    this.response_start = new Date();
  }
  
  render() {
    const { trial_idx } = this.state;
    if (trial_idx > 0 && this.state.keep_going === false && ((trial_idx) % this.trials_count === 0)) {
      return <ContinueScreen next={this.next} on_keep_going={this.keepGoing} />;
    }
    else {
      return <PretestTrial button_labels={this.button_labels} next={this.nextTrial} trial_idx={this.state.trial_idx} trial_chord={this.sequence[this.state.trial_idx % this.trials_count]}/>;
    }
  }
}

