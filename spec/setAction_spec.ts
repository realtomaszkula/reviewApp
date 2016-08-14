/// <reference path="/home/tomasz/Sites/finerReview/app/app.ts" />
import HandHistory from "../app/app";

describe('Hand History', () => {
  describe('setAction', () => {
      let hh;
      beforeEach(() => {
        let hhraw = `*** HOLE CARDS ***
Dealt to reppinR1 [8c 7c Jh Ks]
reppinR1: folds 
Chigurovich: folds 
slainew: raises $2 to $3
BeTePaH_733: calls $3
9I_Be3yH4uk: folds 
Pedreau: calls $2
*** FLOP *** [7h 8h 3c]
Pedreau: checks 
slainew: bets $5.08
BeTePaH_733: folds 
Pedreau: calls $5.08
*** TURN *** [7h 8h 3c] [Qh]
Pedreau: checks 
slainew: checks 
*** RIVER *** [7h 8h 3c Qh] [3h]
Pedreau: bets $13.26
slainew: raises $13.26 to $26.52
Pedreau: folds 
Uncalled bet ($13.26) returned to slainew
slainew collected $45.01 from pot
slainew: doesn't show hand 
*** SUMMARY ***
Total pot $47.38 | Rake $2.37 
Board [7h 8h 3c Qh 3h]`;

      hh = new HandHistory({ hh: hhraw, options: { setBoard: true } } );
      })

    describe('when setting preflop action', () => {
        it('should set number of players', () => {
            expect(hh.handAction.flop.numOfPlayers).toEqual(3);
        });

        it('should set action', () => {
            expect(hh.handAction.flop.action).toEqual(['folds', 'folds', 'raises', 'calls', 'folds', 'calls']);
        });

        it('should set pot size', () => {
            expect(hh.handAction.flop.potSize).toEqual(10);
        });
    });

    describe('when setting flop action', () => {
        it('should set number of players', () => {
            expect(hh.handAction.flop.numOfPlayers).toEqual(3);
        });

        it('should set action', () => {
            expect(hh.handAction.flop.action).toEqual(['checks','bets','folds', 'calls']);
        });

        it('should set pot size', () => {
            expect(hh.handAction.flop.potSize).toEqual(20.16);
        });
    });

    describe('when setting turn action', () => {
        it('should set number of players', () => {
            expect(hh.handAction.flop.numOfPlayers).toEqual(2);
        });

        it('should set action', () => {
            expect(hh.handAction.flop.action).toEqual(['checks','checks']);
        });

        it('should set pot size', () => {
            expect(hh.handAction.flop.potSize).toEqual(20.16);
        });
    });
    describe('when setting river action', () => {
        it('should set number of players', () => {
            expect(hh.handAction.flop.numOfPlayers).toEqual(2);
        });

        it('should set action', () => {
            expect(hh.handAction.flop.action).toEqual(['bets', 'raises', 'folds']);
        });

        it('should set pot size', () => {
            expect(hh.handAction.flop.potSize).toEqual(11111111111);
        });
    });
  });
});