import HandHistory from "./app";

let hhraw = `PokerStars Hand #156785388690:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/02 23:26:32 CET [2016/08/02 17:26:32 ET]
Table 'Gallia IV' 6-max Seat #5 is the button
Seat 1: Bishar_1997 ($91.88 in chips) 
Seat 2: Nunety 07 ($83.23 in chips) 
Seat 3: tomdeaix1 ($129.22 in chips) 
Seat 4: reppinR1 ($80.64 in chips) 
Seat 5: SinRichest ($100 in chips) 
Bishar_1997: posts small blind $0.50
Nunety 07: posts big blind $1
*** HOLE CARDS ***
Dealt to reppinR1 [2d 2s 7h 3d]
tomdeaix1: raises $2.50 to $3.50
reppinR1: folds 
SinRichest: folds 
Bishar_1997: folds 
Nunety 07: calls $2.50
*** FLOP *** [6s 5s Th]
Nunety 07: checks 
tomdeaix1: bets $3.56
Nunety 07: calls $3.56
*** TURN *** [6s 5s Th] [6d]
Nunety 07: checks 
tomdeaix1: checks 
*** RIVER *** [6s 5s Th 6d] [Kd]
1round4fun leaves the table
Nunety 07: checks 
tomdeaix1: checks 
*** SHOW DOWN ***
Nunety 07: shows [3s 4d Jc Ac] (a pair of Sixes)
tomdeaix1: mucks hand 
Nunety 07 collected $13.89 from pot
*** SUMMARY ***
Total pot $14.62 | Rake $0.73 
Board [6s 5s Th 6d Kd]
Seat 1: Bishar_1997 (small blind) folded before Flop
Seat 2: Nunety 07 (big blind) showed [3s 4d Jc Ac] and won ($13.89) with a pair of Sixes
Seat 3: tomdeaix1 mucked [Qc Js 2c 7s]
Seat 4: reppinR1 folded before Flop (didn't bet)
Seat 5: SinRichest (button) folded before Flop (didn't bet)`

let hh = new HandHistory({ hh:hhraw} )