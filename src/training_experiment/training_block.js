import React from 'react';
import { AudioController } from '../audio_controller.js';
import { LessonType, Strings, StaticImages, Chords } from '../defs.js';
import { SongHeader } from '../ui.js';

const SucessIdentification = () => {
  return (
    <div className="row successScreenWrapper">
      <div className="col-sm-8 offset-sm-2">
        <span className="songTitle"> { Strings.success_identification } &nbsp;</span>
        <img src= { StaticImages.happySmiley } width="150px" height="150px"/>
      </div>
    </div>
  );
};

const ShowCorrectAnswer = props => {
  const { correctChord } = props;
  return (
    <div>
      <div className="row">
        <div className="col-sm-8 offset-sm-1">
          <span className="songTitle">{ Strings.failure_song_has_chord } </span>
          <span className="songTitle">{ correctChord }</span>
        </div>
      </div>
      <div className="row">
      &nbsp;
      </div>
      <div className="row">
        <div className="col-sm-8 offset-sm-1">
          <span className="songTitle">{ Strings.how_it_sounds }</span>
        </div>
      </div>
    </div>
  );
}

const FailedIdentification = props => {
  const { shouldShowCorrect } = props;
  const { correctChord } = props;

  let appendix = <div></div>;
  if (shouldShowCorrect === true){
    appendix = <ShowCorrectAnswer correctChord={ correctChord } />;
  }
  return (
    <div>
      <div className="row">
        <div className="col-sm-8 offset-sm-2">
            <span className="songTitle"> { Strings.failure_identification } &nbsp;</span>
            <img src= { StaticImages.sadSmiley } width="150px" height="150px"/>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-8 offset-sm-1">
          <span className="songTitle">{ Strings.how_it_sounds }</span>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-8 offset-sm-1">
          <span className="songTitle">......</span>
        </div>
      </div>
      { appendix }
    </div>
  );
};

const SongWithChords = props => {
  let { songData } = props;
  return (
    <div className="songDisplayWrapper">
      <SongHeader songData = { songData} />
      <div className="row"><div className="col-sm-12">&nbsp;</div></div>
      <div className="row"><div className="col-sm-12">&nbsp;</div></div>
      <div className="row">
        <span className="col-sm-4 offset-sm-4">
          <span className="songTitle fixToRight">
          שם האקורד:
          </span>
        </span>
      </div>
      <div className="row">
        <div className="col-sm-8 offset-sm-2 chords">
          <button className="chordBtn">מז'ור גדול</button>
          <button className="chordBtn">מז'ור קטן</button>
          <button className="chordBtn">מינור גדול</button>
          <button className="chordBtn">מינור קטן</button>
        </div>
      </div>
    </div>
  );
}

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
    this.state = {
      songData: {
        imgSrc: "/song_images/song3.jpg",
        name: "הליכה לקיסריה",
      }
    };

    // TODO: choose button order for the whole thing. read chordNames values and shuffle.
    
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
        <ChordSelection />

        TrainingBlock type={this.lesson_type}
      </div>
    );
  }
}
