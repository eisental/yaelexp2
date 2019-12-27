import React from 'react';

export class AudioController extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
    this.src = props.src;
  }

  audioLoaded(player) {
    console.log("loaded audio:" + player.current.src);
  }

  componentDidMount() {
    console.log(this.player);
    let player = this.player.current;
    player.src = this.src;
    player.addEventListener('canplaythrough', (e => {this.audioLoaded(this.player)}), false);
  }

  render() {
    return <audio ref={this.player} />;
  }
}
