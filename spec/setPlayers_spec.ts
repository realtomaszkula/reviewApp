 /// <reference path="/home/tomasz/Sites/finerReview/scripts/app.ts" />
import HandHistory from "../ts/app";

describe('HandHistory', () => {
 describe('setPlayers', () => {
    /* implementation searches relative to the beggining of the file
        so make sure to not cut the natural beggining of the hand histories 
        in tests

        setting hero position requires hero name to be found first
    */

    describe('when 6 players seated', () => {
      let hh;
      beforeEach(() => {
let hhraw = `PokerStars Hand #156700709632:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:00:04 CET [2016/07/31 18:00:04 ET]
Table 'Aletheia' 6-max Seat #1 is the button
Seat 1: Phil ($149.08 in chips) 
Seat 2: marquim1980 ($117.77 in chips) 
Seat 3: Yoo4 ($100 in chips) 
Seat 4: Teiti14 ($27.49 in chips) 
Seat 5: MiPwnYa ($107.49 in chips) 
Seat 6: reppinR1 ($246.97 in chips) 
Teiti14: posts small blind $0.50
reppinR1: posts big blind $1
*** HOLE CARDS ***
Dealt to reppinR1 [3s 9c Ac Td]`
        hh = new HandHistory({ hh: hhraw, options: { setHeroName: true, setPlayers: true, setHeroPosition: true } } );
      })

      it('should capture hero seat', () => {     
        expect(hh.hero.position).toEqual('CO');
      });

      it('should capture numbers of players seated', () => {     
        expect(hh._players.length).toEqual(6);
      });
    })

    describe('when 5 players seated', () => {
      let hh;
      beforeEach(() => {
let hhraw = `PokerStars Hand #156700709632:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:00:04 CET [2016/07/31 18:00:04 ET]
Table 'Aletheia' 6-max Seat #1 is the button
Seat 1: Phil ($149.08 in chips) 
Seat 2: marquim1980 ($117.77 in chips) 
Seat 3: Yoo4 ($100 in chips) 
Seat 4: Teiti14 ($27.49 in chips) 
Seat 6: reppinR1 ($246.97 in chips) 
Teiti14: posts small blind $0.50
reppinR1: posts big blind $1
*** HOLE CARDS ***
Dealt to reppinR1 [3s 9c Ac Td]`
        hh = new HandHistory({ hh: hhraw, options: { setHeroName: true, setPlayers: true, setHeroPosition: true } } );
      })

      it('should capture hero seat', () => {     
        expect(hh.hero.position).toEqual('MP');
      });

      it('should capture numbers of players seated', () => {     
        expect(hh._players.length).toEqual(5);
      });
    });

    describe('when 4 players seated', () => {
      let hh;
      beforeEach(() => {
let hhraw = `PokerStars Hand #156700709632:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:00:04 CET [2016/07/31 18:00:04 ET]
Table 'Aletheia' 6-max Seat #1 is the button
Seat 1: Phil ($149.08 in chips) 
Seat 2: marquim1980 ($117.77 in chips) 
Seat 3: Yoo4 ($100 in chips) 
Seat 6: reppinR1 ($246.97 in chips) 
Teiti14: posts small blind $0.50
reppinR1: posts big blind $1
*** HOLE CARDS ***
Dealt to reppinR1 [3s 9c Ac Td]`
        hh = new HandHistory({ hh: hhraw, options: { setHeroName: true, setPlayers: true, setHeroPosition: true } } );
      })

      it('should capture hero seat', () => {     
        expect(hh.hero.position).toEqual('UTG');
      });

      it('should capture numbers of players seated', () => {     
        expect(hh._players.length).toEqual(4);
      });
    })

    describe('when 3 players seated', () => {
      let hh;
      beforeEach(() => {
let hhraw = `PokerStars Hand #156700709632:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:00:04 CET [2016/07/31 18:00:04 ET]
Table 'Aletheia' 6-max Seat #1 is the button
Seat 1: Phil ($149.08 in chips) 
Seat 2: marquim1980 ($117.77 in chips) 
Seat 6: reppinR1 ($246.97 in chips) 
Teiti14: posts small blind $0.50
reppinR1: posts big blind $1
*** HOLE CARDS ***
Dealt to reppinR1 [3s 9c Ac Td]`
        hh = new HandHistory({ hh: hhraw, options: { setHeroName: true, setPlayers: true, setHeroPosition: true } } );
      })

      it('should capture hero seat', () => {     
        expect(hh.hero.position).toEqual('BB');
      });

      it('should capture numbers of players seated', () => {     
        expect(hh._players.length).toEqual(3);
      });
    })

    describe('when 2 players seated', () => {
      let hh;
      beforeEach(() => {
let hhraw = `PokerStars Hand #156700709632:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:00:04 CET [2016/07/31 18:00:04 ET]
Table 'Aletheia' 6-max Seat #1 is the button
Seat 1: Phil ($149.08 in chips) 
Seat 6: reppinR1 ($246.97 in chips) 
Teiti14: posts small blind $0.50
reppinR1: posts big blind $1
*** HOLE CARDS ***
Dealt to reppinR1 [3s 9c Ac Td]`
        hh = new HandHistory({ hh: hhraw, options: { setHeroName: true, setPlayers: true, setHeroPosition: true } } );
      })

      it('should capture hero seat', () => {     
        expect(hh.hero.position).toEqual('BB');
      });

      it('should capture numbers of players seated', () => {     
        expect(hh._players.length).toEqual(2);
      });
    });
  });
});