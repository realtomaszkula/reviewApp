import app = require('../scripts/app')
import exampleHH = require('../scripts/handhistories/handhistories') 

describe('Hand History', () => {
  describe('setBoard', () => {
    describe('with five cards specified', () => {
      let hh;

      beforeEach(() => {
        let hhraw = `Total pot $57 | Rake $2.50 Board [Js Tc 2d 4s 5s] Seat 1:`;
        hh = new app.HandHistory(hhraw, { setBoard: true });
      })

      it('should create board with flop turn and river', () => {
        expect(hh.board.flop).toBeDefined();
        expect(hh.board.turn).toBeDefined();
        expect(hh.board.river).toBeDefined();
      });

      describe('when creating flop', () => {
        it('should have 3 elements', () {
          expect(hh.board.flop.length).toEqual(3);
        })
        it('should create correct card value for first element', () {
          expect(hh.board.flop[0]).toEqual('J');
        })
        it('should create correct card value for second element', () {
          expect(hh.board.flop[0]).toEqual('T');
        })
        it('should create correct card value for third element', () {
          expect(hh.board.flop[1]).toEqual('2');
        })
        it('should create correct card suit for first element', () {
          expect(hh.board.flop[1]).toEqual('s');
        })
        it('should create correct card suit for second element', () {
          expect(hh.board.flop[2]).toEqual('c');
        })
        it('should create correct card suit for third element', () {
          expect(hh.board.flop[2]).toEqual('d');
        });
      });

      describe('when creating turn', () => {
        it('should create correct card value', () {
          expect(hh.board.turn).toEqual('4');
        });
        it('should create correct card suit ', () {
          expect(hh.board.turn).toEqual('s');
        });
      });

      describe('when creating river', () => {
        it('should create correct card value', () {
          expect(hh.board.turn).toEqual('5');
        });
        it('should create correct card suit ', () {
          expect(hh.board.turn).toEqual('s');
        });
      });
    });

    describe('with four cards specified', () => {
      let hh;
      beforeEach(() => {
        let hhraw = `Total pot $57 | Rake $2.50 Board [Ad, Ks, 4s, 4d] Seat 1:`;
        hh = new app.HandHistory(hhraw, { setBoard: true });
      });

      it('should create board with just flop and turn', () => {
        expect(hh.board.flop).toBeDefined();
        expect(hh.board.turn).toBeDefined();
        expect(hh.board.river).not.toBeDefined();
      });
    });

    describe('with three cards specified', () => {
      let hh;
      beforeEach(() => {
        let hhraw = `Total pot $57 | Rake $2.50 Board [Ad, Ks, 4s, 4d] Seat 1:`;
        hh = new app.HandHistory(hhraw, { setBoard: true });
      });

      it('should create board with just flop', () => {
        expect(hh.board.flop).toBeDefined();
        expect(hh.board.turn).not.toBeDefined();
        expect(hh.board.river).not.toBeDefined();
      });
    });
  });
});