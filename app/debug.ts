import HandHistory from "./app";

let hhraw = `PokerStars Hand #156700726476:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:00:32 CET [2016/07/31 18:00:32 ET]
Table 'Castor III' 6-max Seat #2 is the button
Seat 1: Magnestad ($355.23 in chips) 
Seat 2: afmaynard ($298.34 in chips) 
Seat 3: PushMeSlowly ($126.60 in chips) 
Seat 4: falco_lucky7 ($226.31 in chips) 
Seat 5: reppinR1 ($178.51 in chips) 
Seat 6: KABAN020276 ($118.23 in chips) 
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
Board [4h Jc Kc 9s 7s]`

let hh = new HandHistory({ hh:hhraw, options: { setBoard: true, setStakes: true, setHandAction: true } } )