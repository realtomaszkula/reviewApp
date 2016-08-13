import HandHistory from "./scripts/app";


let hhraw = `PokerStars Hand #156700712305:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:00:08 CET [2016/07/31 18:00:08 ET]
Table 'Ascanios II' 6-max Seat #3 is the button
Seat 1: jinzo81 ($281.08 in chips) 
Seat 2: falco_lucky7 ($159.56 in chips) 
Seat 3: Royal Lacky ($41.99 in chips) 
Seat 4: reppinR1 ($116.89 in chips) `

let hh = new HandHistory({ hh:hhraw, options: { setTableComposition: true } } )