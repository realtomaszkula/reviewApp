/// <reference path="/home/tomasz/Sites/finerReview/app/app.ts" />
import HandHistory from "../app/app";

xdescribe('Hand History', () => {
  describe('setAction', () => {
      let hh;
      beforeEach(() => {
        let hhraw = `PushMeSlowly: posts small blind $0.50
falco_lucky7: posts big blind $1
*** HOLE CARDS ***
Dealt to reppinR1 [2c 3d 4d 3c]
reppinR1 has timed out
reppinR1: folds 
KABAN020276: calls $1
Magnestad: raises $2 to $3
afmaynard: calls $3
PushMeSlowly: folds 
falco_lucky7: calls $2
KABAN020276: calls $2
*** FLOP *** [4h Jc Kc]
falco_lucky7: checks 
KABAN020276: checks 
Magnestad: checks 
afmaynard: checks 
*** TURN *** [4h Jc Kc] [9s]
falco_lucky7: checks 
KABAN020276: bets $6
Magnestad: folds 
afmaynard: calls $6
falco_lucky7: folds 
*** RIVER *** [4h Jc Kc 9s] [7s]
KABAN020276: checks 
afmaynard: checks 
*** SHOW DOWN ***
KABAN020276: shows [Kh Qh 5d 9h] (two pair, Kings and Nines)
afmaynard: mucks hand 
KABAN020276 collected $23.28 from pot
*** SUMMARY ***
Total pot $24.50 | Rake $1.22 
Board [4h Jc Kc 9s 7s]`;

      hh = new HandHistory({ hh: hhraw, options: { setBoard: true } } );
      })

    describe('when setting preflop action', () => {
        it('should set number of players', () => {
            expect(hh.handAction.preflop.numOfPlayers).toEqual(4);
        });

        it('should set action', () => {
            expect(hh.handAction.preflop.action).toEqual(['call', 'raise', 'call', 'call', 'call']);
        });

        it('should set pot size', () => {
            expect(hh.handAction.preflop.potSize).toEqual(12.5);
        });
    });

    describe('when setting flop action', () => {
        it('should set number of players', () => {
            expect(hh.handAction.flop.numOfPlayers).toEqual(4);
        });

        it('should set action', () => {
            expect(hh.handAction.flop.action).toEqual(['check','check','check', 'check']);
        });

        it('should set pot size', () => {
            expect(hh.handAction.flop.potSize).toEqual(12.5);
        });
    });

    describe('when setting turn action', () => {
        it('should set number of players', () => {
            expect(hh.handAction.turn.numOfPlayers).toEqual(2);
        });

        it('should set action', () => {
            expect(hh.handAction.turn.action).toEqual(['checks','bet','fold', 'call', 'fold']);
        });

        it('should set pot size', () => {
            expect(hh.handAction.turn.potSize).toEqual(24.5);
        });
    });
    describe('when setting river action', () => {
        it('should set number of players', () => {
            expect(hh.handAction.river.numOfPlayers).toEqual(2);
        });

        it('should set action', () => {
            expect(hh.handAction.river.action).toEqual(['check','check']);
        });

        it('should set pot size', () => {
            expect(hh.handAction.river.potSize).toEqual(24.5);
        });
    });
  });
});