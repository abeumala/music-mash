'use strict';

class Elo {
  constructor () {
    this.songBRating = 1600;
    this.songARating = 1500;
    this.kFactor = 50;
    this.gFactor = 300;
    this.expWinA = 0;
    this.expWinB = 1;
    this.winA = true;
    this.winB = false;
    // in query need to change value of winner to true
  }

  getChances () {
    let powA = Math.pow(10, ((this.songBRating - this.songARating) / this.gFactor));
    let powB = Math.pow(10, ((this.songARating - this.songBRating) / this.gFactor));
    this.expWinA = 1 / (1 + powA);
    this.expWinB = 1 / (1 + powB);
    return (this.expWinA, this.expWinB);
  }
  setRanking () {
    this.getChances();

    if (this.winA) {
      // console.log(this.songARating);
      console.log(this.songARating, this.songBRating);
      console.log();
      console.log(this.kFactor * (1 - this.expWinA));
      this.songARating = this.songARating + this.kFactor * (1 - this.expWinA);
      this.songBRating = this.songBRating - this.kFactor * (1 - this.expWinB);
      console.log(this.songARating, this.songBRating);
      //  console.log(this.songARating);
    } else {
      this.songARating = this.songARating - this.kFactor * (1 - this.expWinA);
      this.songBRating = this.songBRating + this.kFactor * (1 - this.expWinB);
    }
    return (this.songARating, this.songBRating);
  }
}

module.exports = Elo;
