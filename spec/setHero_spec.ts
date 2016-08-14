/// <reference path="/home/tomasz/Sites/finerReview/scripts/app.ts" />
import HandHistory from "../ts/app";

describe('HandHistory', () => {
 describe('setHeroName', () => {
    let hh;
    describe('when setting hero name', () => {
      it('should capture names with alphanumeric characters', () => {
        let hhraw = `Dealt to reppinR1 [Js 8c]`;
        hh = new HandHistory({ hh: hhraw, options: { setHeroName: true } } );
        expect(hh.hero.name).toEqual('reppinR1');
      });

      it('should capture names with spaces', () => {
        let hhraw = `Dealt to Donald J Trump [As 4c]`;
        hh = new HandHistory({ hh: hhraw, options: { setHeroName: true } } );
        expect(hh.hero.name).toEqual('Donald J Trump');
      });

      it('should capture names with squarebarkets characters', () => {
        let hhraw = `Dealt to Donald J [As] [As 4c]`;
        hh = new HandHistory({ hh: hhraw, options: { setHeroName: true } } );
        expect(hh.hero.name).toEqual('Donald J [As]');
      });

      it('should capture names with special characters', () => {
        let hhraw = `Dealt to *&^%$@#A SD<>?:"{} [As 4c]`;
        hh = new HandHistory({ hh: hhraw, options: { setHeroName: true } } );
        expect(hh.hero.name).toEqual('*&^%$@#A SD<>?:"{}');
      });
    });
  });

  describe('setHeroCards', () => {

    describe('when setting hero cards', () => {

      describe('when dealt two cards', () => {
      let hh;

        beforeEach(() => {
          let hhraw = `Dealt to reppinR1 [Js 8c]`;
          hh = new HandHistory({ hh: hhraw, options: { setHeroCards: true } });
        });

        it('should set game type as holdem', () => {
          expect(hh.gameType).toEqual('Holdem');
        });

        it('should define two cards', () => {
          expect(hh.hero.hand[0]).toBeDefined();
          expect(hh.hero.hand[1]).toBeDefined();
          expect(hh.hero.hand[2]).not.toBeDefined();
          expect(hh.hero.hand[3]).not.toBeDefined();
        });


        it('should set correct value for first card', () => {
          expect(hh.hero.hand[0].value).toEqual(11);
        });

        it('should set correct suit for first card', () => {
          expect(hh.hero.hand[0].suit).toEqual('s');
        });

        it('should set correct value for second card', () => {
          expect(hh.hero.hand[1].value).toEqual(8);
        });

        it('should set correct suit for second card', () => {
          expect(hh.hero.hand[1].suit).toEqual('c');
        });
      })

      describe('when dealt four cards', () => {
      let hh;

        beforeEach(() => {
          let hhraw = `Dealt to reppinR1 [As Kd Qh 4c]`;
          hh = new HandHistory({ hh: hhraw, options: { setHeroCards: true } });
        });

        it('should set game type as omaha', () => {
          expect(hh.gameType).toEqual('Omaha');
        });

        it('should define two cards', () => {
          expect(hh.hero.hand[0]).toBeDefined();
          expect(hh.hero.hand[1]).toBeDefined();
          expect(hh.hero.hand[2]).toBeDefined();
          expect(hh.hero.hand[3]).toBeDefined();
        });

        it('should set correct value for first card', () => {
          expect(hh.hero.hand[0].value).toEqual(14);
        });

        it('should set correct suit for first card', () => {
          expect(hh.hero.hand[0].suit).toEqual('s');
        });

        it('should set correct value for second card', () => {
          expect(hh.hero.hand[1].value).toEqual(13);
        });

        it('should set correct suit for second card', () => {
          expect(hh.hero.hand[1].suit).toEqual('d');
        });

        it('should set correct value for first card', () => {
          expect(hh.hero.hand[2].value).toEqual(12);
        });

        it('should set correct suit for first card', () => {
          expect(hh.hero.hand[2].suit).toEqual('h');
        });

        it('should set correct value for second card', () => {
          expect(hh.hero.hand[3].value).toEqual(4);
        });

        it('should set correct suit for second card', () => {
          expect(hh.hero.hand[3].suit).toEqual('c');
        });
      })

    });
  });
});