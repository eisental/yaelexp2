import React from 'react';
import { LoadingScreen, ButtonTable, ContinueButton, InfoScreen } from '../ui.js';
import { Chords, Timbres, Variants } from '../defs.js';
import { audio_mapping, test_d_indexing, test_b_indexing } from './audio_mapping.js';
import ls from 'local-storage';
import { randomInt, randomElement, shuffleArray, randomSequence } from '../randomize.js';
import { AudioController } from '../audio_controller.js';

const SubtestInfo = ({test_num, next}) => {
  let info;
  switch (test_num) {
  case 0:
  case 1:
    info = (
      <div>
        <p>בחלק זה יושמעו אקורדים בודדים. עליך לזהות את סוג האקורד, וללחוץ עליו במהירות האפשרית.</p>
      </div>
    );
    break;
  case 2:
    info = (
      <div>
        <p>בחלק זה יושמעו קטעים מוזיקליים קצרים מתוך שירים. האקורד אותו עליך לזהות יהיה האקורד הראשון בכל קטע. עליך לזהות אותו וללחוץ על סוג האקורד במהירות האפשרית</p>
      </div>
    );
    break;
  case 3:
    info = (
      <div>
        <p>בחלק זה יושמעו צמדים של שני אקורדים. עליך לזהות את האקורד הראשון שמושמע מתוך הצמד, וללחוץ על סוג האקורד במהירות האפשרית.</p>
      </div>
    );
    break;
  }
  return <InfoScreen info={info} next={next} />;
};

class TestBlock extends React.Component {
  state = {
    trial_idx: 0,
    show_info: true,
    loading: true,
  }

  constructor({test_num, chord_button_labels, next, data}) {
    super();
    this.test_num = test_num;
    this.chord_button_labels = chord_button_labels;
    this.next = next;
    this.data = data;
    this.ls_prefix = "test_subtests_testblock" + test_num + "_";

    this.test_data = audio_mapping[test_num];

    const cont_sequence = ls.get(this.ls_prefix + "sequence");
    if (cont_sequence !== null) {
      this.sequence = cont_sequence;

      const cont_trial_idx = ls.get(this.ls_prefix + "trial_idx");
      if (cont_trial_idx !== null) 
        this.state.trial_idx = cont_trial_idx;

      const cont_show_info = ls.get(this.ls_prefix + "show_info");
      if (cont_show_info !== null)
        this.state.show_info = cont_show_info;
    }
    else {       
      this.sequence = this.make_test_sequence(test_num);
      ls.set(this.ls_prefix + "sequence", this.sequence);
      ls.set(this.ls_prefix + "trial_idx", this.state.trial_idx);
      ls.set(this.ls_prefix + "show_info", this.state.show_info);
    }

    const that = this;
    const doneLoadingAudio = () => {
      that.setState({loading: false});
      
    };

    const donePlaying = () => {
    };

    this.audioController = new AudioController(this.sequence.map(d => d[0]), doneLoadingAudio, donePlaying);

    console.log("Starting subtest " + this.test_num + ". sequence:");
    console.log(this.sequence);
  }

  make_test_sequence = (test_num) => {
    switch (test_num) {
    case 0:
      return shuffleArray(this.test_data);      
    case 1:      
      return this.make_subtest_b_seq();
    case 2:
      return randomSequence(this.test_data, 32);
    case 3:       
      return this.make_subtest_d_seq();
    default:
      return null;
    }
  }
  
  pick_unique_two = arr => {
    const fst = randomElement(arr);
    const snd = randomElement(arr.slice(0, fst).concat(arr.slice(fst+1, 4)));
    return [fst, snd];
  }

  make_subtest_b_seq = () => {
    let sequence = [];
    for (let c in Chords) {
      for (let trnsp = 0; trnsp < 4; trnsp++) {
        const [var1, var2] = this.pick_unique_two([0,1,2,3]);
        sequence.push(this.test_data[test_b_indexing(Chords[c], trnsp, randomInt(0, 1), var1)]);
        sequence.push(this.test_data[test_b_indexing(Chords[c], trnsp, randomInt(0, 1), var2)]);        
      }
    }
    return shuffleArray(sequence);
  }

  make_subtest_d_seq = () => {
    let sequence = [];
    for (let c in Chords) {
      for (let type=0; type<4; type++) {
        const [trnsp1, trnsp2] = this.pick_unique_two([0,1,2,3]);
        sequence.push(this.test_data[test_d_indexing(Chords[c], trnsp1, Timbres.PIANO, type)]);
        sequence.push(this.test_data[test_d_indexing(Chords[c], trnsp2, Timbres.GUITAR, type)]);                                     
      }
    }
    return shuffleArray(sequence);
  }
  
  get_transposition_play_count = () => { 
    const idx = this.state.trial_idx;
    const trial = this.sequence[idx];
    const count_in_part = this.sequence.slice(0, idx)
      .filter(t => t[1] === trial[1] && t[2] === trial[2]).length + 1;
    return count_in_part;
  }

  startTrials = () => {
    this.setState({show_info: false});
    ls.set(this.ls_prefix + "show_info", false);

    this.audioController.play(this.sequence[this.state.trial_idx][0]);
    this.response_start = new Date();
  }

  nextTrial = () => {
    const { trial_idx } = this.state;

    this.audioController.stop(this.sequence[trial_idx][0]);

    if (trial_idx + 1 >= this.sequence.length) {
      this.next();
    }
    else {
      this.setState({trial_idx: trial_idx + 1});      
      ls.set(this.ls_prefix + "trial_idx", trial_idx + 1);

      // collect data

      this.audioController.play(this.sequence[trial_idx+1][0]);
      this.response_start = new Date();
    }
  }

  render() {
    const { trial_idx, show_info, loading } = this.state;
    if (loading)
      return <LoadingScreen />;
    else if (show_info) {
      return <SubtestInfo test_num={this.test_num} next={this.startTrials} />;
    }
    else {
      return (
        <div className="container">
          <ButtonTable labels={this.chord_button_labels} values={this.chord_button_labels} next={this.nextTrial} key={trial_idx} />
        </div>
      );
    }
  }
}

export class SubtestsBlock extends React.Component {
  ls_prefix = "test_subtests_";

  subtests_count = 4;

  state = {
    test_idx: 0,
  }

  nextTest = () => {
    const { test_idx } = this.state;
    if (test_idx + 1 >= this.subtests_count) 
      this.next();
    else {
      this.setState({ test_idx: test_idx + 1 });
      ls.set(this.ls_prefix + "test_idx", test_idx + 1);
    }
  }

  constructor({data, next, button_labels}) {
    super();
    this.data = data;
    this.next = next;
    this.chord_button_labels = button_labels;

    const cont_test_order = ls.get(this.ls_prefix + "test_order");
    if (cont_test_order !== null) {
      this.test_order = cont_test_order;
      
      const cont_test_idx = ls.get(this.ls_prefix + "test_idx");
      if (cont_test_idx) this.state.test_idx = cont_test_idx;
    }
    else {
      this.test_order = shuffleArray([0, 1, 2, 3]);

      ls.set(this.ls_prefix + "test_order", this.test_order);
      ls.set(this.ls_prefix + "test_idx", this.state.test_idx);
    }

    console.log("Test order: " + this.test_order);    
  }

  render() {
    const { test_idx } = this.state;
    const test_num = this.test_order[test_idx];

    return <TestBlock test_num={test_num}
                      chord_button_labels={this.chord_button_labels} 
                      next={this.nextTest} 
                      data={this.data}
                      key={test_num} />;
  }
}
