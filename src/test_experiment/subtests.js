import React from 'react';
import { ReplayButton, ContinueButton, LoadingScreen, ButtonTable, InfoScreen } from '../ui.js';
import { Chords, Timbres } from '../defs.js';
import { audio_mapping, test_a_indexing, test_c_indexing } from './audio_mapping.js';
import ls from 'local-storage';
import { repeatArray, randomInt, randomElement, shuffleArray, randomSequence } from '../randomize.js';
import { AudioController } from '../audio_controller.js';

const SubtestInfo = ({test_num, is_free, next}) => {
  let info;
  switch (test_num) {
  case 0:
    if (is_free) {
      info = <p>בחלק זה יושמעו אקורדים בודדים. עליכם לזהות את סוג האקורד, וללחוץ עליו במהירות האפשרית. ניתן ללחוץ על לחצן הרמקול בכדי להאזין לאקורד שוב (עד פעמיים נוספות).</p>;
    }
    else {
      info = <p>בחלק זה יושמעו אקורדים בודדים. עליכם לזהות את סוג האקורד, וללחוץ עליו במהירות האפשרית.</p>;
    }
    break;
  case 1:
    if (is_free) {
      info = <p>בחלק זה יושמעו קטעים מוזיקליים קצרים מתוך שירים. האקורד אותו עליכם לזהות יהיה האקורד הראשון בכל קטע. הוא ינוגן בשנית בסוף הקטע המוזיקלי. עליכם לזהות אותו וללחוץ על סוג האקורד במהירות האפשרית. ניתן ללחוץ על לחצן הרמקול בכדי להאזין לאקורד שוב (עד פעמיים נוספות).</p>;
    }
    else {
      info = <p>בחלק זה יושמעו קטעים מוזיקליים קצרים מתוך שירים. האקורד אותו עליכם לזהות יהיה האקורד הראשון בכל קטע. הוא ינוגן בשנית בסוף הקטע המוזיקלי. עליכם לזהות אותו וללחוץ על סוג האקורד במהירות האפשרית.</p>;
    }
    break;
  case 2:
    if (is_free) {
      info = <p>מיד תשמעו צמדי אקורדים. לפני כל צמד אקורדים תשמעו סולם עולה ויורד (צלילים שמנוגנים בזה אחר זה, בניגוד לאקורדים עצמם, שבהם הצלילים מנוגנים יחד). לאחר מכן, בכל צמד אקורדים שתשמעו, האקורד הראשון יהיה האקורד המשמעותי, אליו עליכם להתייחס. עליכם לזהות את סוג האקורד הראשון שמושמע מתוך הצמד, וללחוץ עליו במהירות האפשרית. ניתן ללחוץ על לחצן הרמקול בכדי להאזין לאקורד שוב (עד פעמיים נוספות).</p>;
    }
    else {
      info = <p>מיד תשמעו צמדי אקורדים. לפני כל צמד אקורדים תשמעו סולם עולה ויורד (צלילים שמנוגנים בזה אחר זה, בניגוד לאקורדים עצמם, שבהם הצלילים מנוגנים יחד). לאחר מכן, בכל צמד אקורדים שתשמעו, האקורד הראשון יהיה האקורד המשמעותי, אליו עליכם להתייחס. עליכם לזהות את סוג האקורד הראשון שמושמע מתוך הצמד, וללחוץ עליו במהירות האפשרית.</p>;
    }
    break;
  }

  const info_div = <div>{info}</div>;
  return <InfoScreen info={info_div} next={next} />;
};

class TestBlock extends React.Component {
  trial_num = 16

  state = {
    trial_idx: 0,
    show_info: true,
    loading: true,
    replay_count: 2,
    is_playing: true,
  }

  constructor({test_num, test_idx, is_free, chord_button_labels, next, data}) {
    super();
    this.test_num = test_num;
    this.test_idx = test_idx;
    this.is_free = is_free;
    this.chord_button_labels = chord_button_labels;
    this.next = next;
    this.data = data;
    this.ls_prefix = "test_subtests_" + (is_free ? "free" : "fast") + "_testblock" + test_num + "_";

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

    console.log("Trial sequence:");
    console.log(this.sequence);

    const that = this;
    const doneLoadingAudio = () => {
      that.setState({loading: false});
    };

    const donePlaying = () => {
      that.setState({is_playing: false});
    };

    this.audioController = new AudioController(this.sequence.map(d => d[0]), doneLoadingAudio, donePlaying);

    //console.log("Starting subtest " + this.test_num + ". sequence:");
    //console.log(this.sequence);

    if (!this.state.show_info) {
      this.audioController.play(this.sequence[this.state.trial_idx][0]);
      this.response_start = new Date();
    }
  }

  make_test_sequence = (test_num) => {
    switch (test_num) {
    case 0:
      return this.make_subtest_a_seq();
    case 1:
      return shuffleArray(this.test_data);
    case 2:       
      return this.make_subtest_c_seq();
    default:
      return null;
    }
  }
  
  make_subtest_a_seq = () => {
    let sequence = [];    
    let timbres = shuffleArray([...repeatArray([Timbres.PIANO], 8), 
                                ...repeatArray([Timbres.GUITAR], 8)]);
    let cur_timbre = 0;
    for (let c in Chords) {
      for (let trnsp=0; trnsp<4; trnsp++) {
        sequence.push(this.test_data[test_a_indexing(Chords[c], trnsp, timbres[cur_timbre])]);
        cur_timbre++;
      }
    }

    return shuffleArray(sequence);
  }

  make_subtest_c_seq = () => {
    let sequence = [];
    let timbres = shuffleArray([...repeatArray([Timbres.PIANO], 8), 
                                ...repeatArray([Timbres.GUITAR], 8)]);
    let trnsps = shuffleArray(repeatArray([0,1,2,3], 16));
    let i = 0;

    for (let c in Chords) {
      for (let type=0; type<4; type++) {
        sequence.push(this.test_data[test_c_indexing(Chords[c], trnsps[i], timbres[i], type)]);
        i++;
      }
    }
    return shuffleArray(sequence);
  }
  
  get_transposition_play_count = () => { 
    const idx = this.state.trial_idx;
    const trial = this.sequence[idx];
    return this.sequence.slice(0, idx)
      .filter(t => t[1] === trial[1] && t[2] === trial[2]).length + 1;
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
      this.setState({trial_idx: trial_idx + 1,
                     answer_received: false,
                     replay_count: 2,
                     is_playing: true});
      ls.set(this.ls_prefix + "trial_idx", trial_idx + 1);
      ls.set("test_data", this.data);

      this.audioController.play(this.sequence[trial_idx+1][0]);
      this.response_start = new Date();
    }
  }

  processAnswer = (answer) => {
    const { trial_idx } = this.state;

    // collect data
    const trial_info = this.sequence[trial_idx];
    const td = {
      time: new Date().toString(),
      subtest: this.test_num + 1,
      audio_index: trial_info[0],
      chord_number: this.trial_num * this.test_idx + this.state.trial_idx + 1,
      chord_type: trial_info[1],
      transposition: trial_info[2] + 1,
      transposition_play_count: this.get_transposition_play_count(),
      timbre: trial_info[3] + 1,
      is_free: this.is_free ? 1 : 2,
      selected_chord_type: answer,
      correct: answer === trial_info[1],
      response_time: new Date() - this.response_start,
    };

    this.data.trials.push(td);

    this.setState({answer_received: true,
                   replay_count: 0});
  }

  replay = () => {
    const { trial_idx, replay_count } = this.state;
    this.setState({replay_count: replay_count-1,
                   is_playing: true});
    this.audioController.play(this.sequence[trial_idx][0]);
  }

  render() {
    const { trial_idx, show_info, loading, answer_received, is_playing, replay_count } = this.state;
    if (loading)
      return <LoadingScreen />;
    else if (show_info) {
      return <SubtestInfo test_num={this.test_num} next={this.startTrials} is_free={this.is_free} />;
    }
    else {
      let next_trial_button = null;
      let replay_button = null;
      
      if (answer_received && !is_playing) {
        next_trial_button = (
          <div className="center-trial-btn">
            <ContinueButton next={this.nextTrial} className="btn-secondary"/>
          </div>
        );
      }
      else if (this.is_free && !answer_received && replay_count > 0 && !is_playing) {
        replay_button = (
          <div className="center-trial-btn">
            <ReplayButton onClick={this.replay} />
          </div>
        );
      }
            
      return (
        <div className="container">
          <div className="row">          
            <ButtonTable labels={this.chord_button_labels} values={this.chord_button_labels} next={this.processAnswer} disabled={answer_received} key={trial_idx} />
          </div>
          {next_trial_button}
          {replay_button}
        </div>
      );
    }
  }
}

export class SubtestsBlock extends React.Component {
  subtests_count = 3;

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

  constructor({data, next, is_free, button_labels}) {
    super();
    this.data = data;
    this.next = next;
    this.is_free = is_free;
    this.chord_button_labels = button_labels;
    this.ls_prefix = "test_subtests_" + (is_free ? "free_" : "fast_");

    const cont_test_order = ls.get(this.ls_prefix + "test_order");
    if (cont_test_order !== null) {
      this.test_order = cont_test_order;
      
      const cont_test_idx = ls.get(this.ls_prefix + "test_idx");
      if (cont_test_idx) this.state.test_idx = cont_test_idx;
    }
    else {
      this.test_order = shuffleArray([0, 1, 2]);

      ls.set(this.ls_prefix + "test_order", this.test_order);
      ls.set(this.ls_prefix + "test_idx", this.state.test_idx);
    }

    console.log("Test order: " + this.test_order);    
  }

  render() {
    const { test_idx } = this.state;
    const test_num = this.test_order[test_idx];
    
    return <TestBlock test_num={test_num} test_idx={test_idx} is_free={this.is_free}
                      chord_button_labels={this.chord_button_labels} 
                      next={this.nextTest} 
                      data={this.data}
                      key={test_num} />;
  }
}
