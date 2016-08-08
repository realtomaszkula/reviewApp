let hh = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:25:01 CET [2016/07/31 18:25:01 ET]
Table 'Aletheia' 6-max Seat #1 is the button
Seat 1: charlybumbum ($100 in chips) 
Seat 2: zocker jo433 ($416.52 in chips) 
Seat 3: Yoo4 ($347.17 in chips) 
Seat 5: falco_lucky7 ($108.80 in chips) 
Seat 6: reppinR1 ($116.08 in chips) 
zocker jo433: posts small blind $0.50
Yoo4: posts big blind $1
*** HOLE CARDS ***
Dealt to reppinR1 [7s 4c Ac Kh]
falco_lucky7: folds 
reppinR1: raises $2 to $3
charlybumbum: folds 
zocker jo433: calls $2.50
Yoo4: calls $2
*** FLOP *** [Jd Tc 2c]
zocker jo433: checks 
Yoo4: bets $6
reppinR1: calls $6
zocker jo433: folds 
*** TURN *** [Jd Tc 2c] [Qh]
Yoo4: checks 
reppinR1: bets $18
Yoo4: calls $18
*** RIVER *** [Jd Tc 2c Qh] [Th]
Yoo4: bets $42
reppinR1: folds 
Uncalled bet ($42) returned to Yoo4
Yoo4 collected $54.50 from pot
Yoo4: doesn't show hand 
*** SUMMARY ***
Total pot $57 | Rake $2.50 
Board [Jd Tc 2c]
Seat 1: charlybumbum (button) folded before Flop (didn't bet)
Seat 2: zocker jo433 (small blind) folded on the Flop
Seat 3: Yoo4 (big blind) collected ($54.50)
Seat 5: falco_lucky7 folded before Flop (didn't bet)
Seat 6: reppinR1 folded on the River
`;

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
  position: string;
}

interface Board {
  flop: Card[],
  turn: Card,
  river: Card
}

class HandHistory {

  private _hh: string;

  // meta
  private _time:  number;
  private _stakes: Stakes;

  // hero 
  private _hero: Hero;

  // action
  private _numOfPlayers: number;
  private _potSize: number;
  private _board: string;

  constructor(hh:string) {
    this._hh = hh;
    this.parseHH(hh);
  }

  get board() { return  this._board}
  get hero() { return  this._hero}
  get time() { return  this._time}
  get stakes() { return  this._stakes}

  private parseHH(hh) {
    this.setBoard()
    this.setHero()
    this.setStakes();
    this.setTime();
  }

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

  private setBoard() {
    let regEx  = 
      /Board \[([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?/
    // this._board = runRegex(regEx)
  }

  private setHero () {
    this._hero = { hand: [], position: '', name: '' }

    let heroAndCards = 
      /Dealt to (\w+) \[([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])/;
    let result = this.runRegex(heroAndCards)

    this._hero.name = result[1]
    this._hero.hand = [ 
      this.convertToCard(result[2]), 
      this.convertToCard(result[3]), 
      this.convertToCard(result[4]), 
      this.convertToCard(result[5])
      ]
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

// benchmark( () => { new HandHistory(hh) } )

debugger
let hhobj = new HandHistory(hh);
// console.log(hhobj.time)


let stakes = '/\(([^\/]+)\/([^\)]+)\)/';
let stakess = /\(([^\/]+)\/([^\)]+)\)/
let heroAndCards = 
  /Dealt to (\w+) \[([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])/;
let board  = 
  /Board \[([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?/

