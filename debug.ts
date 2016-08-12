import HandHistory from "./scripts/app";


let hhraw = `*** SUMMARY ***
Total pot $7.50 | Rake $0.38 
Board [7d 4d Jd 6d 5h]
Seat 10: Leader188 (button) mucked [9h 4s 7s As]
Seat 2: reppinR1 (small blind) folded before Flop
Seat 3: Royal Lacky (big blind) folded on the Flop
Seat 11: Mitonas90 showed [Ac 3h 9c 5d] and won ($7.12) with a straight, Three to Seven
Seat 5: afmaynard folded before Flop (didn't bet)
Seat 6: 1round4fun folded before Flop (didn't bet)`

let hh = new HandHistory(hhraw, { setTableComposition: true });