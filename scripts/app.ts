interface Card {
  suit: string;
  value: number
}

interface Stakes {
  sb: number,
  bb: number
}

interface Position {
  position: 'BTN' | 'CO' | 'UTG' | 'MP' | 'SB' | 'BB'
}

interface PlayerParams {
  name: string,
  position:  Position
}

interface HeroParams extends PlayerParams{
  hand: Card[]
}

interface Options {
  setPot?: boolean;
  setBoard?: boolean;
  setStakes?: boolean;
  setTime?: boolean;
  setHeroName?: boolean;
  setHeroCards?: boolean;
  setHeroPosition?: boolean;
  setTableComposition?: boolean;
}

interface HHParams {
  hh: string,
  options: Options
}

class Player {
  public name: string;
  public position: Position ;

  constructor( params: PlayerParams ) {
    this.name = params.name
    this.position = params.position
  }
}

class Hero extends Player {
  public hand: Card[]

  constructor( params: HeroParams ) { 
    super(params);
    this.hand = params.hand
  }
}

interface Board {
  flop?: Card[],
  turn?: Card,
  river?: Card
}

export default class HandHistory {

  private _hh: string;

  // meta
  private _time:  number;
  private _stakes: Stakes;
  private _gameType: "Omaha" | "Holdem" ;

  // hero 
  private _hero: Hero;

  // action
  private _potSize: number;
  private _board: Board = {};
  private _lastStreetPlayed: 'preflop' | 'flop' | 'turn' | 'river';

  // table composition
  private _players: Player[];

  constructor(params:HHParams) {
    this._hh = params.hh;
    this.parseHH(params.options);
  }

  private parseHH(options:Options) {
    if (options.setPot) this.setPot();
    if (options.setBoard) this.setBoard();
    if (options.setStakes) this.setStakes();
    if (options.setTime) this.setTime();
    if (options.setHeroName) this.setHeroName();
    if (options.setHeroCards) this.setHeroCards();
    if (options.setHeroPosition) this.setHeroPosition();
    if (options.setTableComposition) this.setTableComposition();
  }

  get board() { return  this._board}
  get hero() { return  this._hero}
  get time() { return  this._time}
  get stakes() { return  this._stakes}
  get gameType() { return  this._gameType}
  get lastStreetPlayed() { return  this._lastStreetPlayed }
  get potSize() { return  this._potSize }
  get players() { return  this._players }


  private findButtonSeat():string {
    let regEx =  /Seat #(\d) is the button/
    let result = this.runRegex(regEx);
    return result[1]
  }

  private captureSeats(): string[] {
    // two first lines are hand nr and date, followed by up to 6 seatss
    return  this._hh.split('\n').slice(2,8)
  }

  private getPossiblePositions(numOfPlayers): Position[] {
    let result;
   if (numOfPlayers > 2) {
     result = ['BTN' , 'SB' , 'BB' , 'MP' , 'CO' , 'BTN' ].slice(0, numOfPlayers)
   }  else {
    result =  ['BTN' , 'BB']
   }
   return result
  }

  private setTableComposition () {

    let btnSeat:string = this.findButtonSeat()
    let seatedPlayers:string[] = this.captureSeats();

    // fetching possible positions, starting with btn
    let possiblePositions: Position[] = this.getPossiblePositions(seatedPlayers.length)

    let btnIdx = seatedPlayers.findIndex( str => str.includes(`Seat ${btnSeat}`))
    
    // rearanging seats so the seats array starts with the button position
    let firstHalf = seatedPlayers.slice(0,btnIdx)
    let secondHalf = seatedPlayers.slice(btnIdx)
    let rearangedSeats = secondHalf.concat(firstHalf)

    // extracting player nicknames
    let regEx = /(^.+?)(?=\(\$\d+)/
    let playerNames:string[] = rearangedSeats.map( p =>{
      // remove 'Seat x: '
      p = p.slice(8)

      //match until ($123)
      return p.match(regEx)[0]
    })

    // matching players nameswith position and pushing
    this._players = []
    playerNames.forEach( playerName => {
      this._players.push( 
          new Player({
          name: playerName.trim(), 
            position: possiblePositions.shift() 
          })
      )
    });
    

  }

  private setPot() {
    let regEx = 
      /Total pot \$((\d+)(\.\d+)?)/
    let result = this.runRegex(regEx);
    this._potSize = parseFloat(result[1]);
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
    let regEx = 
      /Dealt to (.+?(?=[[][2-9|T|J|Q|K|A][s|c|d|h]\s[2-9|T|J|Q|K|A][s|c|d|h]))/;
    let result = this.runRegex(regEx)
    this._hero.name = result[1].trim();

  }
  private setHeroCards() {
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

  private runRegex(regExString, flag = '') {
    let regExp = new RegExp(regExString, flag)

    if (flag) {
      let result = [], match;

      while (match = regExp.exec(this._hh)) {
        result.push(match)
      }
      return result
    } else {
      return this._hh.match(regExp)
    }
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


