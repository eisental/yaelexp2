import React from 'react';
import { LessonType, Strings, StaticImages, Chords } from './defs.js'
import { AudioController } from '../audio_controller.js'

const SucessIdentification = () => {
  return (
    <div className="row successScreenWrapper">
      <div className="col-sm-8 offset-sm-2">
        <span className="songTitle"> { Strings.success_identification } &nbsp;</span>
        <img src= { StaticImages.happySmiley } width="150px" height="150px"/>
      </div>
    </div>
  );
}

const NameOfChord = props => {
  let { chordName } = this.props;
  return (
    <div className = "row text-center successScreenWrapper">
      <div className="col-sm-8 offset-sm-2">
        <span className="chordName">
        שם האקורד הראשון :         
        <br />
        { chordName }
        </span>
      </div>
    </div>
  );
}

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

  let appendix = <div></div>
  if (shouldShowCorrect === true){
    appendix = <ShowCorrectAnswer correctChord={ correctChord } />
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
}

// Will also be used in the training
export const SongHeader = props =>{
  let { songData } = props;
  return (
    <div className="row">
      <div className="col-sm-8 offset-sm-2">
        <img className="songImage" src={ songData.imgSrc } />
        <div className="songTitleWrapper">
          <span className="songTitle"> שם השיר: </span> 
          <br />
          <span className="songTitle"> { songData.name }</span> 
        </div>
        <div className="clearBoth"></div>
      </div>
    </div>
  );
}

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

const SongWithoutChords = props => {
  let { chordName } = props;
  let { songData } = props;
  return(
    <div>
      <SongHeader songData={ songData } />
      <div className="row"><div className="col-sm-12">&nbsp;</div></div>
      <div className="row"><div className="col-sm-12">&nbsp;</div></div>
      <div className="row">
        <span className="col-sm-4 offset-sm-4">
          <span className="songTitle fixToRight">
          שם האקורד:
          </span>
        </span>
      </div>
      <div className="row text-center">
        <div className="col-sm-4 offset-sm-4">
          <span className="songTitle fixToRight">{ chordName }</span>
        </div>
      </div>
    </div>
  );
}

export class LessonBlock extends React.Component {
  songs = [
    {
      imgSrc: "/song_images/song4.jpg",
      name: "הליכה לקיסריה"
    },
    {
      imgSrc: "/song_images/song1.jpg",
      name: "Imagine"
    },
    {
      imgSrc: "/song_images/song2.jpg",
      name: "Rocket man"
    },
    {
      imgSrc: "/song_images/song3.jpg",
      name: "ברית עולם"
    },
  ]
  songNum=0;

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
    }
  }

  changeSong = () => {
    this.songNum++;
    if (this.songNum == 4)
    this.songNum = 0;

    this.setState({
      songData: this.songs[this.songNum]
    })
  }
  
  componentDidMount() {
    //this.audioController.current.play(2);
  }

  render() {
    let srcs = [0,1,2,3].map(i => "/audio/" + (i+1) + ".mp3");
    let songData = this.state.songData;    



    return (
      <div>
        LessonBlock type={this.lesson_type}
        <AudioController
          srcs={srcs} id="audio" 
          onDoneLoading={() => console.log("finished loading audio sources.")}
          onAudioEnded={(i) => console.log("finished playing audio " + i)}
          ref={this.audioController} />
        <button onClick={ this.changeSong }>Change song (Testing purposes)</button>
        <FailedIdentification shouldShowCorrect= { true } correctChord={Chords.BIG_MAJOR} />
        <SongWithChords songData={ songData }/>
        <SongWithoutChords songData={ songData } chordName={Chords.BIG_MAJOR} />
      </div>
    );
  }
}
