"use strict";
const app_1 = require("./app");
let hhraw = `PokerStars Hand #156700709632:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:00:04 CET [2016/07/31 18:00:04 ET]
Table 'Aletheia' 6-max Seat #1 is the button
Seat 1: Phil ($149.08 in chips) 
Seat 6: reppinR1 ($246.97 in chips) 
Teiti14: posts small blind $0.50
reppinR1: posts big blind $1
*** HOLE CARDS ***
Dealt to reppinR1 [3s 9c Ac Td]`;
let hh = new app_1.default({ hh: hhraw, options: { setHeroName: true, setPlayers: true, setHeroPosition: true } });
//# sourceMappingURL=debug.js.map