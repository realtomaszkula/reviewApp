/// <reference path="/home/tomasz/Sites/finerReview/scripts/app.ts" />

import HandHistory from "../ts/app";

describe('setBoard', () => {
    describe('with five cards specified', () => {
      let hh;

      beforeEach(() => {
        let hhraw = `Total pot $57 | Rake $2.50 Board [Js Tc 2d 4s 5s] Seat 1:`;
        hh = new HandHistory({ hh: hhraw, options: { setBoard: true } } );
      })

      it('should create board with flop turn and river', () => {
        expect(hh.board.flop).toBeDefined();
        expect(hh.board.turn).toBeDefined();
        expect(hh.board.river).toBeDefined();
      });

      it('should correctly set last street played', () => {
        expect(hh.lastStreetPlayed).toEqual('river');
      });

      describe('when creating flop', () => {
        it('should have 3 elements', () => {
          expect(hh.board.flop.length).toEqual(3);
        })
        it('should create correct card value for first element', () => {
          expect(hh.board.flop[0].value).toEqual(11);
        })
        it('should create correct card value for second element', () => {
          expect(hh.board.flop[1].value).toEqual(10);
        })
        it('should create correct card value for third element', () => {
          expect(hh.board.flop[2].value).toEqual(2);
        })
        it('should create correct card suit for first element', () => {
          expect(hh.board.flop[0].suit).toEqual('s');
        })
        it('should create correct card suit for second element', () => {
          expect(hh.board.flop[1].suit).toEqual('c');
        })
        it('should create correct card suit for third element', () => {
          expect(hh.board.flop[2].suit).toEqual('d');
        });
      });

      describe('when creating turn', () => {
        it('should create correct card value', () => {
          expect(hh.board.turn.value).toEqual(4);
        });
        it('should create correct card suit ', () => {
          expect(hh.board.turn.suit).toEqual('s');
        });
      });

      describe('when creating river', () => {
        it('should create correct card value', () => {
          expect(hh.board.river.value).toEqual(5);
        });
        it('should create correct card suit ', () => {
          expect(hh.board.river.suit).toEqual('s');
        });
      });

    });

    describe('with four cards specified', () => {
      let hh;
      beforeEach(() => {
        let hhraw = `Total pot $57 | Rake $2.50 Board [Ad Ks 4s 4d] Seat 1:`;
        hh = new HandHistory({ hh: hhraw, options: { setBoard: true } } );
      });

      it('should create board with just flop and turn', () => {
        expect(hh.board.flop).toBeDefined();
        expect(hh.board.turn).toBeDefined();
        expect(hh.board.river).not.toBeDefined();
      });

      it('should correctly set last street played', () => {
        expect(hh.lastStreetPlayed).toEqual('turn');
      });
    });

    describe('with three cards specified', () => {
      let hh;
      beforeEach(() => {
        let hhraw = `Total pot $57 | Rake $2.50 Board [Ad Ks 4s] Seat 1:`;
        hh = new HandHistory({ hh: hhraw, options: { setBoard: true } } );
      });

      it('should create board with just flop', () => {
        expect(hh.board.flop).toBeDefined();
        expect(hh.board.turn).not.toBeDefined();
        expect(hh.board.river).not.toBeDefined();
      });

      it('should correctly set last street played', () => {
        expect(hh.lastStreetPlayed).toEqual('flop');
      })
    });

    describe('without board', () => {
      it('should correctly set last street played', () => {
        let hhraw = 'Total pot $2.50 | Rake $0 '
        let hh = new HandHistory({ hh: hhraw, options: { setBoard: true } } );
        expect(hh.lastStreetPlayed).toEqual('preflop');
      })
    });
  });