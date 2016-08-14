/// <reference path="/home/tomasz/Sites/finerReview/app/app.ts" />
import HandHistory from "../app/app";

describe('HandHistory', () => {
  describe('setStakes', () => {
      let hh;

      it ('should create stakes object with correct properties', () => {
        let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01`;
        hh = new HandHistory({ hh: hhraw, options: { setStakes: true } });
        expect(hh.stakes).toBeDefined
        expect(hh.stakes.sb).toBeDefined();
        expect(hh.stakes.bb).toBeDefined();
      })

      describe('for $0.02/$0.05', () => {
        beforeEach(() => {
          let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.02/$0.05 USD) - 2016/08/01`;
        hh = new HandHistory({ hh: hhraw, options: { setStakes: true } });
        })

        it ('should create correct sb ', () => {
          expect(hh.stakes.sb).toEqual(0.02)
        })

        it ('should create correct bb', () => {
          expect(hh.stakes.bb).toEqual(0.05)
        })
      });

      describe('for $0.05/$0.10', () => {
        beforeEach(() => {
          let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.05/$0.10 USD) - 2016/08/01`;
        hh = new HandHistory({ hh: hhraw, options: { setStakes: true } });
        })

        it ('should create correct sb ', () => {
          expect(hh.stakes.sb).toEqual(0.05)
        })

        it ('should create correct bb', () => {
          expect(hh.stakes.bb).toEqual(0.1)
        })
      });


      describe('for $0.1/$0.25', () => {
        beforeEach(() => {
          let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.10/$0.25 USD) - 2016/08/01`;
        hh = new HandHistory({ hh: hhraw, options: { setStakes: true } });
        })

        it ('should create correct sb ', () => {
          expect(hh.stakes.sb).toEqual(0.10)
        })

        it ('should create correct bb', () => {
          expect(hh.stakes.bb).toEqual(0.25)
        })
      });

      describe('for $0.25/$0.50', () => {
        beforeEach(() => {
          let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.25/$0.50 USD) - 2016/08/01`;
        hh = new HandHistory({ hh: hhraw, options: { setStakes: true } });
        })

        it ('should create correct sb ', () => {
          expect(hh.stakes.sb).toEqual(0.25)
        })

        it ('should create correct bb', () => {
          expect(hh.stakes.bb).toEqual(0.50)
        })
      });

      describe('for $0.5/$1.0', () => {
        beforeEach(() => {
          let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01`;
        hh = new HandHistory({ hh: hhraw, options: { setStakes: true } });
        })

        it ('should create correct sb ', () => {
          expect(hh.stakes.sb).toEqual(0.5)
        })

        it ('should create correct bb', () => {
          expect(hh.stakes.bb).toEqual(1)
        })
      });

      describe('for $1/$2', () => {
        beforeEach(() => {
          let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($1/$2 USD) - 2016/08/01`;
        hh = new HandHistory({ hh: hhraw, options: { setStakes: true } });
        })

        it ('should create correct sb ', () => {
          expect(hh.stakes.sb).toEqual(1)
        })

        it ('should create correct bb', () => {
          expect(hh.stakes.bb).toEqual(2)
        })
      });

      describe('for $2/$4', () => {
        beforeEach(() => {
          let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($2/$4 USD) - 2016/08/01`;
        hh = new HandHistory({ hh: hhraw, options: { setStakes: true } });
        })

        it ('should create correct sb ', () => {
          expect(hh.stakes.sb).toEqual(2)
        })

        it ('should create correct bb', () => {
          expect(hh.stakes.bb).toEqual(4)
        })
      });

      describe('for $3/$6', () => {
        beforeEach(() => {
          let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($3/$6 USD) - 2016/08/01`;
        hh = new HandHistory({ hh: hhraw, options: { setStakes: true } });
        })

        it ('should create correct sb ', () => {
          expect(hh.stakes.sb).toEqual(3)
        })

        it ('should create correct bb', () => {
          expect(hh.stakes.bb).toEqual(6)
        })
      });

    });
});