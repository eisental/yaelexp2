let audioIdx2File = (idx) => "audio/" + idx + ".mp3";

export class AudioController {
  constructor(srcs, onDoneLoading, onAudioEnded) {
    this.srcs = srcs;
    this.players = [];
    this.ids2players = {};
    this.players2ids = {};
    for (const id of this.srcs) {
      const playerIdx = this.players.length;
      this.ids2players[id] = playerIdx;
      this.players2ids[playerIdx] = id;
      console.log("adding:" + id + " to player " + this.players.length);
      const p = new Audio(audioIdx2File(id));
      p.addEventListener('canplaythrough', (e => {this.audioLoaded(p)}), false);
      p.addEventListener('ended', (e => {
        if (this.onAudioEnded) this.onAudioEnded(id)
      }), false);

      this.players.push(p);
    }

    this.loadCount = 0;
    this.onDoneLoading = onDoneLoading;
    this.onAudioEnded = onAudioEnded;
  }

  audioLoaded(player) {
    console.log("loaded audio:" + player.src);
    this.loadCount+=1;
    if (this.loadCount === this.players.length) {
      if (this.onDoneLoading) this.onDoneLoading();
    }
  }

  play(audio_id) {
    const playerIdx = this.ids2players[audio_id];
    console.log("playing " + audio_id + " on player " + playerIdx);
    this.players[playerIdx].play();
  }
}
