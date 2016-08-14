/// <reference path="/home/tomasz/Sites/finerReview/scripts/modules/regExp.ts" />

interface Card {
  suit: string;
  value: number
}

interface Stakes {
  sb: number,
  bb: number
}

interface Position {
  position: 'BTN' | 'CO' | 'UTG' | 'MP' | 'SB' | 'BB' | ''
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
  setPlayers?: boolean;
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

  private _rgx = {
      buttonSeat:  /Seat #(\d) is the button/,
      playerNicks:  /(^.+?)(?=\(\$\d+)/,
      pot: /Total pot \$((\d+)(\.\d+)?)/,
      stakes: /\(([^\/]+)\/([^\)]+)\)/,
      time:  /\[(\d\d\d\d)[/](\d\d)[/](\d\d)\s(\d\d?):(\d\d):(\d\d)/,
      board: /Board \[([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?/,
      heroName: /Dealt to (.+?(?=[[][2-9|T|J|Q|K|A][s|c|d|h]\s[2-9|T|J|Q|K|A][s|c|d|h]))/,
      heroCards: /[[]([2-9|T|J|Q|K|A][s|c|d|h](?:\s[2-9|T|J|Q|K|A][s|c|d|h]){1,3})/
    }

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
    this._hero = new Hero( { name: '', position: { position: ''} , hand: []} )
    this.parseHH(params.options);
  }

  private parseHH(options:Options) {
    if (options.setHeroName) this.setHeroName();
    if (options.setPlayers) this.setPlayers();
    if (options.setPot) this.setPot();
    if (options.setBoard) this.setBoard();
    if (options.setStakes) this.setStakes();
    if (options.setTime) this.setTime();
    if (options.setHeroCards) this.setHeroCards();
    if (options.setHeroPosition) this.setHeroPosition();
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
    let result = this.runRegex(this._rgx.buttonSeat);
    return result[1]
  }

  private captureSeats(): string[] {
    // two first lines are hand nr and date, followed by up to 6 seatss
    return  this._hh.split('\n').slice(2,8)
  }

  private getPossiblePositions(numOfPlayers): Position[] {
    let result;
   if (numOfPlayers > 2) {
     result = ['BTN', 'SB' , 'BB' , 'UTG' ,'MP' , 'CO'].slice(0, numOfPlayers)
   }  else {
    result =  ['BTN' , 'BB']
   }
   return result
  }

  private setPlayers () {
    let btnSeat:string = this.findButtonSeat()
    let seatedPlayers:string[] = this.captureSeats();

    let btnIdx = seatedPlayers.findIndex( str => str.includes(`Seat ${btnSeat}`))
    
    // rearanging seats so the seats array starts with the button position
    let firstHalf = seatedPlayers.slice(0,btnIdx)
    let secondHalf = seatedPlayers.slice(btnIdx)
    let rearangedSeats = secondHalf.concat(firstHalf)

    // remove 'Seat x: '
    let stripSeat:string[] = rearangedSeats.map( s => s = s.slice(8) )

    // keep only strings with player nicks (will end with '($\d\d)' which is stack size)
    let playerNames: string[] = [];
    stripSeat.forEach( s =>  {
      let result = s.match(this._rgx.playerNicks);
      if (result) playerNames.push(result[0])
    })


    // fetching possible positions
    let possiblePositions: Position[] = this.getPossiblePositions(playerNames.length)

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
    let result = this.runRegex(this._rgx.pot);
    this._potSize = parseFloat(result[1]);
  }

  private setStakes() {
    this._stakes = { sb: 0, bb: 0 }
    const regEx = /\(([^\/]+)\/([^\)]+)\)/
    let result = this.runRegex(regEx);

    let step1 = result[0].split(' ');
    let step2 = step1[0].split('/');

    this._stakes.sb = parseFloat(step2[0].substr(2));
    this._stakes.bb = parseFloat(step2[1].substr(1));
  }

  private setTime () {
    let yr, mth, day, h, m, s;

    let result = this.runRegex(this._rgx.time);

    Array.prototype.shift.call(result);

    [yr, mth, day, h, m, s] = result
    this._time = Date.UTC(yr, mth, day, h, m, s)
  }

  private setBoard() {
    let result = this.runRegex(this._rgx.board);
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

  private setHeroPosition() {
     this._hero.position = this._players.find( p =>  p.name === this._hero.name ).position
  }

  private setHeroName () {
    let result = this.runRegex(this._rgx.heroName)
    this._hero.name = result[1].trim();
  }

  private setHeroCards() {
    const regExResult = this.runRegex(this._rgx.heroCards)[1]
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
    const regExp = new RegExp(regExString, flag)

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


