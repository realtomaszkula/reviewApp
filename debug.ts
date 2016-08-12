import HandHistory from "./scripts/app";


let hhraw = `*** SUMMARY ***
Total pot $10.50 | Rake $0.52 
Board [7c 9h Ks]`

let hh = new HandHistory(hhraw, { setPot: true });