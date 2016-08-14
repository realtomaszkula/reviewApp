 /// <reference path="/home/tomasz/Sites/finerReview/app/app.ts" />
import HandHistory from "../app/app";


describe('HandHistory', () => {
 describe('setPlayers', () => {
    /* implementation searches relative to the beggining of the file
        so make sure to not cut the natural beggining of the hand histories 
        in tests

        setting hero position requires hero name to be found first
    */
    describe('when first seat is the btn', () => {
      describe('and 6 players seated', () => {
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

    describe('when second seat is the btn', () => {
      // will check hero position and two other players for the sake of breviety
      let hh;
      beforeEach(() => {
      let hhraw = `PokerStars Hand #156700709632:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:00:04 CET [2016/07/31 18:00:04 ET]
Table 'Aletheia' 6-max Seat #2 is the button
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
      });
      
      // hh.player array will always start with btn players
      it('should find hero position', () => {     
        expect(hh.hero.position).toEqual('MP');
      });
      
      it('should find player on the button', () => {     
        expect(hh.players[0].name).toEqual('marquim1980');
      });
      it('should find player on CO', () => {     
        expect(hh.players[5].name).toEqual('Phil');
      });

    });

    describe('when third seat is the btn', () => {
      // will check hero position and two other players for the sake of breviety
      let hh;
      beforeEach(() => {
      let hhraw = `PokerStars Hand #156700709632:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:00:04 CET [2016/07/31 18:00:04 ET]
Table 'Aletheia' 6-max Seat #3 is the button
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
      });
      
      // hh.player array will always start with btn players
      it('should find hero position', () => {     
        expect(hh.hero.position).toEqual('UTG');
      });
      
      it('should find player on the button', () => {     
        expect(hh.players[0].name).toEqual('Yoo4');
      });
      it('should find player on CO', () => {     
        expect(hh.players[5].name).toEqual('marquim1980');
      });

    });

    describe('when fourth seat is the btn', () => {
      // will check hero position and two other players for the sake of breviety
      let hh;
      beforeEach(() => {
      let hhraw = `PokerStars Hand #156700709632:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:00:04 CET [2016/07/31 18:00:04 ET]
Table 'Aletheia' 6-max Seat #4 is the button
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
      });
      
      // hh.player array will always start with btn players
      it('should find hero position', () => {     
        expect(hh.hero.position).toEqual('BB');
      });
      
      it('should find player on the button', () => {     
        expect(hh.players[0].name).toEqual('Teiti14');
      });
      it('should find player on CO', () => {     
        expect(hh.players[5].name).toEqual('Yoo4');
      });
    });

    describe('when fith seat is the btn', () => {
      // will check hero position and two other players for the sake of breviety
      let hh;
      beforeEach(() => {
      let hhraw = `PokerStars Hand #156700709632:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:00:04 CET [2016/07/31 18:00:04 ET]
Table 'Aletheia' 6-max Seat #5 is the button
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
      });
      
      // hh.player array will always start with btn players
      it('should find hero position', () => {     
        expect(hh.hero.position).toEqual('SB');
      });
      
      it('should find player on the button', () => {     
        expect(hh.players[0].name).toEqual('MiPwnYa');
      });
      it('should find player on CO', () => {     
        expect(hh.players[5].name).toEqual('Teiti14');
      });

    });

    describe('when sixth seat is the btn', () => {
      // will check hero position and two other players for the sake of breviety
      let hh;
      beforeEach(() => {
      let hhraw = `PokerStars Hand #156700709632:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:00:04 CET [2016/07/31 18:00:04 ET]
Table 'Aletheia' 6-max Seat #6 is the button
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
      });
      
      // hh.player array will always start with btn players
      it('should find hero position', () => {     
        expect(hh.hero.position).toEqual('BTN');
      });
      
      it('should find player on the button', () => {     
        expect(hh.players[0].name).toEqual('reppinR1');
      });
      it('should find player on CO', () => {     
        expect(hh.players[5].name).toEqual('MiPwnYa');
      });

    });
  });
});