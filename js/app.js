let hh = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:25:01 CET [2016/07/31 18:25:01 ET]
Table 'Aletheia' 6-max Seat #1 is the button
Seat 1: charlybumbum ($100 in chips) 
Seat 2: zocker jo433 ($416.52 in chips) 
Seat 3: Yoo4 ($347.17 in chips) 
Seat 5: falco_lucky7 ($108.80 in chips) 
Seat 6: reppinR1 ($116.08 in chips) 
zocker jo433: posts small blind $0.50
Yoo4: posts big blind $1
*** HOLE CARDS ***
Dealt to reppinR1 [7s 4c Ac Kh]
falco_lucky7: folds 
reppinR1: raises $2 to $3
charlybumbum: folds 
zocker jo433: calls $2.50
Yoo4: calls $2
*** FLOP *** [Jd Tc 2c]
zocker jo433: checks 
Yoo4: bets $6
reppinR1: calls $6
zocker jo433: folds 
*** TURN *** [Jd Tc 2c] [Qh]
Yoo4: checks 
reppinR1: bets $18
Yoo4: calls $18
*** RIVER *** [Jd Tc 2c Qh] [Th]
Yoo4: bets $42
reppinR1: folds 
Uncalled bet ($42) returned to Yoo4
Yoo4 collected $54.50 from pot
Yoo4: doesn't show hand 
*** SUMMARY ***
Total pot $57 | Rake $2.50 
Board [Jd Tc 2c]
Seat 1: charlybumbum (button) folded before Flop (didn't bet)
Seat 2: zocker jo433 (small blind) folded on the Flop
Seat 3: Yoo4 (big blind) collected ($54.50)
Seat 5: falco_lucky7 folded before Flop (didn't bet)
Seat 6: reppinR1 folded on the River
`;
class HandHistory {
    constructor(hh) {
        this._hh = hh;
        this.parseHH(hh);
    }
    get board() { return this._board; }
    get hero() { return this._hero; }
    parseHH(hh) {
        this.setBoard();
        this.setHero();
    }
    setBoard() {
        let regEx = /Board \[([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?/;
        // this._board = runRegex(regEx)
    }
    setHero() {
        this._hero = { hand: [], position: '', name: '' };
        let heroAndCards = /Dealt to (\w+) \[([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])/;
        let result = runRegex(heroAndCards);
        this._hero.name = result[1];
        this._hero.hand = [result[2], result[3], result[4], result[5]];
    }
    runRegex(regExString) {
        let regExp = new RegExp(regExString);
        return this._hh.match(regExp);
    }
}
function benchmark(func, times = 10000) {
    let t1 = Date.now() / 1000;
    for (let i = 0; i < times; i++) {
        func();
    }
    let t2 = Date.now() / 1000;
    console.log(t2 - t1);
}
benchmark(() => { new HandHistory(hh); }, 200);
let stakes = '/\(([^\/]+)\/([^\)]+)\)/';
let stakess = /\(([^\/]+)\/([^\)]+)\)/;
let heroAndCards = /Dealt to (\w+) \[([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])/;
let board = /Board \[([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?/;
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
function runRegex(regExString) {
    let regExp = new RegExp(regExString);
    return hh.match(regExp);
}
// console.log(  runRegex(board) )
