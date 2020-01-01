import React from 'react';
import { LessonType } from './defs.js'
import { AudioController } from '../audio_controller.js'

export class TrainingBlock extends React.Component {
  constructor({data, lesson_type, next}) {
    super();
    this.data = data;
    this.lesson_type = lesson_type;
    this.next = next;
  }

  render() {
    return (
      <div>
        <AudioController src="/audio/1.mp3" id="audio1" />
        <AudioController src="/audio/2.mp3" id="audio2" />
        <AudioController src="/audio/3.mp3" id="audio3" />
        <AudioController src="/audio/4.mp3" id="audio4" />
        TrainingBlock type={this.lesson_type}
      </div>
    );
  }
}
