import React from 'react';
import { LessonType } from './defs.js';
import { AudioController } from '../audio_controller.js';


const ChordSelection = props => {
  let { chords } = props;
  return (
    <div className="songDisplayWrapper">
      <div className="row">
        <div className="col-sm-2 offset-sm-1">
          <button className="chordBtn">
            מז'ור גדול
            <br />
            Imagine
          </button>
        </div>
        <div className="col-sm-5">
          &nbsp;
        </div>
        <div className="col-sm-2">
          <button className="chordBtn">
              מז'ור גדול
              <br />
              Imagine
            </button>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-sm-6 offset-sm-3">
          <span className="plusSign">  + </span>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-2 offset-sm-1">
          <button className="chordBtn">
            מז'ור גדול
            <br />
            Imagine
          </button>
        </div>
        <div className="col-sm-5">
          &nbsp;
        </div>
        <div className="col-sm-2">
          <button className="chordBtn">
              מז'ור גדול
              <br />
              Imagine
            </button>
        </div>
      </div>
    </div>
  );
}



export class TrainingBlock extends React.Component {
  constructor({data, lesson_type, next}) {
    super();
    this.data = data;
    this.lesson_type = lesson_type;
    this.next = next;
    this.audioController = React.createRef();
  }

  render() {
    let currentAudio = 2;
    let srcs = [0,1,2,3].map(i => "/audio/" + (i+1) + ".mp3");
    return (
      <div>
        <AudioController 
          srcs={srcs} id="audio" 
          onDoneLoading={() => console.log("finished loading audio sources.")}
          onAudioEnded={(i) => console.log("finished playing audio " + i)}
          ref={this.audioController} />
        <button onClick={(e) => this.audioController.current.play(currentAudio)}>Click</button>
        TrainingBlock type={this.lesson_type}
      </div>
    );
  }
}
