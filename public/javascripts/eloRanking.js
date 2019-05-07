'use strict';
const Song = require('../../models/song');

class Elo {
  constructor () {
    // this.songBRating = 1500;
    // this.songARating = 1500;
    this.kFactor = 50;
    this.gFactor = 300;
    this.expWinA = 0;
    this.expWinB = 1;
    this.winA = false;
    this.winB = false;

    // in query need to change value of winner to true
  }

  getChances (a, b) {
    let powA = Math.pow(10, ((b - a) / this.gFactor));
    let powB = Math.pow(10, ((a - b) / this.gFactor));
    this.expWinA = 1 / (1 + powA);
    this.expWinB = 1 / (1 + powB);
    return (this.expWinA, this.expWinB);
  }
  setRanking (songARating, songBRating, aId, bId) {
    this.getChances(songARating, songBRating);

    Song.find({ '_id': { '$in': [aId, bId] } })
      .then((result) => { // result is reversed
        let songA = result[1];
        let songB = result[0];
        if (this.winA) {
          songARating = Math.floor(songARating + this.kFactor * (1 - this.expWinA));
          songBRating = Math.floor(songBRating - this.kFactor * (1 - this.expWinB));
          songA.rating = songARating;
          songB.rating = songBRating;
          songA.save();
          songB.save();
        } else {
          songARating = Math.floor(songARating - this.kFactor * (1 - this.expWinA));
          songBRating = Math.floor(songBRating + this.kFactor * (1 - this.expWinB));
          songA.rating = songARating;
          songB.rating = songBRating;
          songA.save();
          songB.save();
        }
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Elo;
