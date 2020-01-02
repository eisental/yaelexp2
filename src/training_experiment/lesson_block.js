import React from 'react';
import { LessonType } from './defs.js'
import { AudioController } from '../audio_controller.js'

export class LessonBlock extends React.Component {
  constructor({data, lesson_type, next}) {
    super();
    this.data = data;
    this.lesson_type = lesson_type;
    this.next = next;
    this.audioController = React.createRef();
  }

  componentDidMount() {
    this.audioController.current.play(2);
  }

  render() {
    let srcs = [0,1,2,3].map(i => "/audio/" + (i+1) + ".mp3");

    return (
      <div>
        <img className="song_image" src="/song_images/song1.jpg" />
        LessonBlock type={this.lesson_type}
        <AudioController 
          srcs={srcs} id="audio" 
          onDoneLoading={() => console.log("finished loading audio sources.")}
          onAudioEnded={(i) => console.log("finished playing audio " + i)}
          ref={this.audioController} />
      </div>
    );
  }
}
