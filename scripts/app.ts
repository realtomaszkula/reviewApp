interface Card {
  suit: string;
  value: number
}

interface Stakes {
  sb: number,
  bb: number
}

interface Hero {
  name: string;
  hand: Card[];
  position: 'BTN' | 'CO' | 'UTG' | 'MP' | 'SB' | 'BB' | '' ;
}

interface Board {
  flop?: Card[],
  turn?: Card,
  river?: Card
}

// 
export default class HandHistory {

  private _hh: string;

  // meta
  private _time:  number;
  private _stakes: Stakes;
  private _gameType: "Omaha" | "Holdem" ;

  // hero 
  private _hero: Hero;

  // action
  private _numOfPlayers: number;
  private _potSize: number;
  private _board: Board = {};
  private _lastStreetPlayed: 'preflop' | 'flop' | 'turn' | 'river';

  constructor(hh:string, opts = {}) {
    this._hh = hh;
    this.parseHH(opts);
  }

  private parseHH(opts) {
    if (opts.setBoard) this.setBoard();
    if (opts.setStakes) this.setStakes();
    if (opts.setTime) this.setTime();
    if (opts.setHeroName) this.setHeroName();
    if (opts.setHeroCards) this.setHeroCards();
    if (opts.setHeroPosition) this.setHeroPosition();

  }

  get board() { return  this._board}
  get hero() { return  this._hero}
  get time() { return  this._time}
  get stakes() { return  this._stakes}
  get gameType() { return  this._gameType}
  get lastStreetPlayed() { return  this._lastStreetPlayed }

  private setStakes() {
    this._stakes = { sb: 0, bb: 0 }
    let regEx = /\(([^\/]+)\/([^\)]+)\)/
    let result = this.runRegex(regEx);

    let step1 = result[0].split(' ');
    let step2 = step1[0].split('/');

    this._stakes.sb = parseFloat(step2[0].substr(2));
    this._stakes.bb = parseFloat(step2[1].substr(1));
  }

  private setTime () {
    let yr, mth, day, h, m, s;
    let regEx = 
      /\[(\d\d\d\d)[/](\d\d)[/](\d\d)\s(\d\d?):(\d\d):(\d\d)/
    let result = this.runRegex(regEx);

    Array.prototype.shift.call(result);

    [yr, mth, day, h, m, s] = result
    this._time = Date.UTC(yr, mth, day, h, m, s)
  }

  setBoard() {
      let regEx = /Board \[([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?/;
      let result = this.runRegex(regEx);
      if (result) {
          Array.prototype.shift.call(result);
          this._board.flop = [
            this.convertToCard(result[0]),
            this.convertToCard(result[1]),
            this.convertToCard(result[2])
          ]
          this._lastStreetPlayed = 'flop'
          if (result[3]) {
              this._board.turn = this.convertToCard(result[3]);
              this._lastStreetPlayed = 'turn'
              if (result[4]) {
                  this._board.river = this.convertToCard(result[4]);
                  this._lastStreetPlayed = 'river'

              }
          }
      }
      
      else {
          this._lastStreetPlayed = 'preflop';
      }

  }

  private setHeroName () {
    this._hero = this._hero || { name : '', position: '', hand: [] }
    let regEx = 
      /Dealt to (.+?(?=[[][2-9|T|J|Q|K|A][s|c|d|h]\s[2-9|T|J|Q|K|A][s|c|d|h]))/;
    let result = this.runRegex(regEx)
    this._hero.name = result[1].trim();

  }
  private setHeroCards() {
    this._hero = this._hero || { name : '', position: '', hand: [] }
    let regEx = 
      /[[]([2-9|T|J|Q|K|A][s|c|d|h](?:\s[2-9|T|J|Q|K|A][s|c|d|h]){1,3})/;
      let regExResult = this.runRegex(regEx)[1]
      let result = regExResult.split(' ');

        this._hero.hand = [ 
          this.convertToCard(result[0]), 
          this.convertToCard(result[1]), 
        ]
        
        if (result[2] && result[3]) {
          this._gameType = "Omaha";
          this._hero.hand.push(this.convertToCard(result[2]));
          this._hero.hand.push(this.convertToCard(result[3]));
        } else {
          this._gameType = "Holdem";
        }
  }

  private setHeroPosition () {
    this._hero = this._hero || { name : '', position: '', hand: [] }
    let regEx = /Seat #(\d) is the button/;
    let buttonPosition = parseInt(this.runRegex(regEx)[1])

  }

  private convertToCard(card: string): Card {
    let value;
    switch (card[0]) {
      case 'T' : 
        value = 10;
        break;
      case 'J' : 
        value = 11;
        break;
      case 'Q' : 
        value = 12;
        break;
      case 'K' : 
        value = 13;
        break;
      case 'A' : 
        value = 14;
        break;
      default: value = parseInt(card[0])
    }
      
    return {
      suit: card[1],
      value: value
    }
  }

  private runRegex(regExString) {
    let regExp = new RegExp(regExString)
    return this._hh.match(regExp)
  }
}

function benchmark (func, times = 10000 ) {
  let t1 = Date.now() / 1000
  for (let i = 0; i < times; i++) {
    func();
  }
  let t2 = Date.now() / 1000
  console.log(t2-t1)
}
