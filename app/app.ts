interface Card {
  suit: string,
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
  stack: number,
  position:  Position
}

interface HeroParams extends PlayerParams{
  hand: Card[]
}

interface HandHistorySections {
  meta: string[],
  seats: string[],
  hero: string,
  action: Action,
  summary: string[]
}

interface Meta {
  format: 'Omaha' | 'Holdem',
  stakes: Stakes,
  date?: Date,
}

interface Action {
  preflop: string[],
  flop?: string[],
  turn?: string[],
  river?: string[],
}

interface Play {
  action: 'bet' | 'check' | 'fold' | 'raise' | 'all-in'
}

interface Street {
  numOfPlayers: number,
  action: Play[],
  potSize: number
}

interface HandAction {
  preflop: Street,
  flop?: Street,
  turn?: Street,
  river?: Street ,
}

interface Options {
  setPot?: boolean,
  setBoard?: boolean,
  setStakes?: boolean,
  setTime?: boolean,
  setHeroName?: boolean,
  setHeroCards?: boolean,
  setHeroPosition?: boolean,
  setPlayers?: boolean,
  setHandAction?:boolean
}

interface HHParams {
  hh: string,
  options?: Options
}

class Player {
  public name: string;
  public stack: number;
  public position: Position ;

  constructor( params: PlayerParams ) {
    this.stack = params.stack
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
  private _hhSections: HandHistorySections;

  private _rgx = {
      buttonSeat:  /Seat #(\d) is the button/,
      playerNicks:  /(^.+?)(?=\(\$\d+)/,
      playerCards: /\(\$([\d|\.]+) in chips\)$/gm,
      betSize: /\$(\d+(?:\.\d+)?)$/gm,
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
  private _handAction;

  // table composition
  private _players: Player[];

  constructor(params:HHParams) {
    this._hh = params.hh;
    this.sliceHH();
    this._hero = new Hero( { name: '', stack: 0 , position: { position: ''} , hand: []} )
    this.parseHH(params.options);
  }

  private parseHH(options:Options = {
    setHeroName: true,
    setPlayers: true,
    setPot: true,
    setBoard: true,
    setStakes: true,
    setTime: true,
    setHeroCards: true,
    setHeroPosition: true,
    setHandAction: true}) {
    if (options.setHeroName) this.setHeroName();
    if (options.setPlayers) this.setPlayers();
    if (options.setPot) this.setPot();
    if (options.setBoard) this.setBoard();
    if (options.setStakes) this.setStakes();
    if (options.setTime) this.setTime();
    if (options.setHeroCards) this.setHeroCards();
    if (options.setHeroPosition) this.setHeroPosition();
    if (options.setHandAction) this.setHandAction();
  }

  get board() { return  this._board}
  get hero() { return  this._hero}
  get time() { return  this._time}
  get stakes() { return  this._stakes}
  get gameType() { return  this._gameType}
  get lastStreetPlayed() { return  this._lastStreetPlayed }
  get potSize() { return  this._potSize }
  get players() { return  this._players }
  get handAction() { return  this._handAction }

  private sliceHH() {
    let lines:string[] = this._hh.split('\n');

    let preflopIdx, flopIdx, turnIdx, riverIdx, showdownIdx, summaryIdx;

    lines.forEach( (line, idx) => {
      if (line.includes('*** HOLE CARDS ***')) {
        preflopIdx = idx;
      } else if (line.includes('*** FLOP ***')) {
        flopIdx = idx;
      } else if (line.includes('*** TURN ***')) {
        turnIdx = idx;
      } else if (line.includes('*** RIVER ***')) {
        riverIdx = idx;
      } else if (line.includes('*** SHOW DOWN ***')) {
        showdownIdx = idx
      } else if (line.includes('*** SUMMARY ***')) {
        summaryIdx = idx
      }
    })

    this._hhSections = {
      meta: lines.slice(0, 2),
      seats: lines.slice(2, preflopIdx),
      hero: lines[preflopIdx, preflopIdx + 1],
      action: { preflop: [] },
      summary: lines.slice(summaryIdx)
    };

    let action:Action;

    if(!flopIdx) {
      this._lastStreetPlayed = 'preflop'
    } else if(!turnIdx) {
      this._lastStreetPlayed = 'flop'
    } else if(!riverIdx) {
      this._lastStreetPlayed = 'turn'
    } else {
      this._lastStreetPlayed = 'river'
    }

    if (this._lastStreetPlayed === 'preflop') {
      this._hhSections.action.preflop = lines.slice(preflopIdx + 2, showdownIdx);
    } else if (this._lastStreetPlayed === 'flop') {
      this._hhSections.action = {
        preflop: lines.slice(preflopIdx + 2, flopIdx),
        flop: lines.slice(flopIdx + 1, showdownIdx)
      }
    } else if (this._lastStreetPlayed === 'turn') {
      this._hhSections.action = {
        preflop : lines.slice(preflopIdx + 2, flopIdx),
        flop : lines.slice(flopIdx + 1, turnIdx),
        turn : lines.slice(turnIdx + 1, showdownIdx)
      }
    } else if (this._lastStreetPlayed === 'river') {
      this._hhSections.action = {
        preflop : lines.slice(preflopIdx + 2, flopIdx),
        flop : lines.slice(flopIdx + 1, turnIdx),
        turn : lines.slice(turnIdx + 1, riverIdx),
        river: (showdownIdx ? lines.slice(riverIdx + 1, showdownIdx) : lines.slice(riverIdx + 1, summaryIdx))
       }
    }
  }


  private firstMatchingGroup(rgx, str): string[] {
    let results = [], result;
    while(result = rgx.exec(str)) {
      results.push(result[1])
    }
    return results;
  }

  private setPotSize(action:HandAction) {
    let preflopBets:number[], flopBets:number[], turnBets:number[], riverBets:number[];

    preflopBets = this.firstMatchingGroup(this._rgx.betSize, this._hhSections.action.preflop.join('\n'))
                        .map( b => parseFloat(b))

    let blinds = this._stakes.sb + this._stakes.bb
    if (flopBets != []) 
      action.preflop.potSize = preflopBets.reduce((prevV, curV) => prevV + curV, blinds);
    
    if(this._lastStreetPlayed !== 'preflop') {
        flopBets = this.firstMatchingGroup(this._rgx.betSize, this._hhSections.action.flop.join('\n'))
                      .map( b => parseFloat(b))

        action.flop.potSize += action.preflop.potSize;    
        if (flopBets != []) 
          action.flop.potSize += flopBets.reduce((prevV, curV) => prevV + curV, 0)
    }

    if(this._lastStreetPlayed !== 'flop') {
        turnBets = this.firstMatchingGroup(this._rgx.betSize, this._hhSections.action.turn.join('\n'))
                      .map( b => parseFloat(b))
        
        action.turn.potSize += action.flop.potSize;    
        if (turnBets != [])  
          action.turn.potSize += turnBets.reduce((prevV, curV) => prevV + curV, 0)

    }

    if(this._lastStreetPlayed !== 'turn') {
        riverBets = this.firstMatchingGroup(this._rgx.betSize, this._hhSections.action.river.join('\n'))
                      .map( b => parseFloat(b))
        action.river.potSize += action.turn.potSize;    
        if (riverBets != []) 
           action.river.potSize += riverBets.reduce((prevV, curV) => prevV + curV, 0) 
    }
  }

  private setNumOfPlayers(action:HandAction) {

  }

  private setAction(action:HandAction) {

  }

  private setHandAction():void {
    let action:HandAction = { 
      preflop: { potSize: null, numOfPlayers: null, action: []}, 
      flop: { potSize: null, numOfPlayers: null, action: []}, 
      turn: { potSize: null, numOfPlayers: null, action: []}, 
      river: { potSize: null, numOfPlayers: null, action: []} 
    }

    this.setPotSize(action)
    this.setNumOfPlayers(action)
    this.setAction(action)

    this._handAction = action;
  }

  private findButtonSeat():string {
    let result = this.runRegex(this._rgx.buttonSeat, this._hhSections.meta.join('\n'));
    return result[1]
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
    let seatedPlayers:string[] = this._hhSections.seats

    let btnIdx = seatedPlayers.findIndex( str => str.includes(`Seat ${btnSeat}`))
    
    // rearanging seats so the seats array starts with the button position
    let firstHalf = seatedPlayers.slice(0,btnIdx)
    let secondHalf = seatedPlayers.slice(btnIdx)
    let rearangedSeats = secondHalf.concat(firstHalf)

    // remove 'Seat x: '
    let stripSeat:string[] = rearangedSeats.map( s => s = s.slice(8) )

    let playerNames: string[] = [];
    let playerStacks: number[] = [];

    stripSeat.forEach( s =>  {
      // extract player nick from string
      let nick = s.match(this._rgx.playerNicks);
      if (nick) playerNames.push(nick[0])

      // extract player stack from string
      let stack;
      while( stack = this._rgx.playerCards.exec(s.trim()) ) {
        playerStacks.push(parseFloat(stack[1]))
      }
    })


    // fetching possible positions
    let possiblePositions: Position[] = this.getPossiblePositions(playerNames.length)

    // matching players nameswith position and pushing
    this._players = []
    playerNames.forEach( playerName => {
      this._players.push( 
          new Player({
            name: playerName.trim(),
            stack: playerStacks.shift(), 
            position: possiblePositions.shift() 
          })
      )
    });
  }

  private setPot() {
    let result = this.runRegex(this._rgx.pot, this._hhSections.summary.join('\n'));
    this._potSize = parseFloat(result[1]);
  }

  private setStakes() {
    this._stakes = { sb: 0, bb: 0 }
    let result = this.runRegex(this._rgx.stakes, this._hhSections.meta.join('\n'));

    let step1 = result[0].split(' ');
    let step2 = step1[0].split('/');

    this._stakes.sb = parseFloat(step2[0].substr(2));
    this._stakes.bb = parseFloat(step2[1].substr(1));
  }

  private setTime () {
    let yr, mth, day, h, m, s;

    let result = this.runRegex(this._rgx.time, this._hhSections.meta.join('\n'));

    Array.prototype.shift.call(result);

    [yr, mth, day, h, m, s] = result
    this._time = Date.UTC(yr, mth, day, h, m, s)
  }

  private setBoard() {
    let result = this.runRegex(this._rgx.board, this._hhSections.summary.join('\n'));
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
    let result = this.runRegex(this._rgx.heroName, this._hhSections.hero)
    this._hero.name = result[1].trim();
  }

  private setHeroCards() {
    const regExResult = this.runRegex(this._rgx.heroCards, this._hhSections.hero)[1]
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

  private runRegex(regExString, stringToMatchAgainst = this._hh) {
    const regExp = new RegExp(regExString)
    return stringToMatchAgainst.match(regExp)
  }
}


