import React from 'react';

export class AudioController extends React.Component {
  constructor(props) {
    super(props);
    this.srcs = props.srcs;
    this.players = props.srcs.map(s => React.createRef());
    this.loadCount = 0;
    this.onDoneLoading = props.onDoneLoading;
    this.onAudioEnded = props.onAudioEnded;
  }

  audioLoaded(player) {
    console.log("loaded audio:" + player.src);
    this.loadCount+=1;
    if (this.loadCount === this.srcs.length) {
      if (this.onDoneLoading) this.onDoneLoading();
    }
  }

  play(playerIdx) {
    console.log("playing " + playerIdx);
    this.players[playerIdx].current.play();
  }

  componentDidMount() {
    for (let i=0; i<this.srcs.length; i++) {
      let p = this.players[i].current;
      p.src = this.srcs[i];
      p.addEventListener('canplaythrough', (e => {this.audioLoaded(p)}), false);
      p.addEventListener('ended', (e => {if (this.onAudioEnded) this.onAudioEnded(i)}), false);
    }      
  }

  render() {
    return this.players.map((p, i) => <audio ref={p} key={i}/>);
  }
}
