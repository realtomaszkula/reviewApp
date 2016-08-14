/// <reference path="/home/tomasz/Sites/finerReview/scripts/app.ts" />
import HandHistory from "../ts/app";

describe('HandHistory', () => {
  describe('setPot', () => {
      describe('when setting pot size', () => {
        it('should capture decimal numbers', () => {
          let hhraw = `*** SUMMARY ***
          Total pot $10.50 | Rake $0.52 
          Board [7c 9h Ks]`
          let hh = new HandHistory({ hh: hhraw, options: { setPot: true } } );
        
          expect(hh.potSize).toEqual(10.5);
        });

        it('should capture round nubers', () => {
          let hhraw = `*** SUMMARY ***
          Total pot $10 | Rake $0.52 
          Board [7c 9h Ks]`
          let hh = new HandHistory({ hh: hhraw, options: { setPot: true } } );

          expect(hh.potSize).toEqual(10);
        });

      });
    });
});