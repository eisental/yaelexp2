import React from 'react';
import { LessonType } from './defs.js'
import { AudioController } from '../audio_controller.js'

export class LessonBlock extends React.Component {
  constructor({data, state, next}) {
    super();
    this.data = data;
    this.state = state;
    this.next = next;
  }

  render() {
    return (
      <div>
        <img className="song_image" src="/song_images/song1.jpg" />
        <AudioController src="/audio/1.mp3" id="audio1" />
        <AudioController src="/audio/2.mp3" id="audio2" />
        <AudioController src="/audio/3.mp3" id="audio3" />
        <AudioController src="/audio/4.mp3" id="audio4" />
        LessonBlock type={this.state.lesson_type}
      </div>
    );
  }
}
