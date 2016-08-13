import HandHistory from "./scripts/app";


let hhraw = `Table 'Admete III' 6-max Seat #5 is the button
Seat 10: Phil ($149.08 in chips) 
Seat 2: marquim1980 ($117.77 in chips) 
Seat 3: Yoo4 ($100 in chips) `

let hh = new HandHistory(hhraw, { setTableComposition: true });