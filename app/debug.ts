import HandHistory from "./app";

let hhraw = `PokerStars Hand #156700709632:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:00:04 CET [2016/07/31 18:00:04 ET]
Table 'Aletheia' 6-max Seat #4 is the button
Seat 1: Phil ($149.08 in chips) 
Seat 2: marquim1980 ($117.77 in chips) 
Seat 3: Yoo4 ($100 in chips) 
Seat 4: Teiti14 ($27.49 in chips) 
Seat 5: MiPwnYa ($107.49 in chips) 
Seat 6: reppinR1 ($246.97 in chips) 
Teiti14: posts small blind $0.50
reppinR1: posts big blind $1
*** HOLE CARDS ***
  Dealt to reppinR1 [3s 9c Ac Td]`

let hh = new HandHistory({ hh:hhraw, options: { setHeroName:true, setPlayers: true, setHeroPosition: true } } )