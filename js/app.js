var hh = "PokerStars Hand #156701873519:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:25:01 CET [2016/07/31 18:25:01 ET]\nTable 'Aletheia' 6-max Seat #1 is the button\nSeat 1: charlybumbum ($100 in chips) \nSeat 2: zocker jo433 ($416.52 in chips) \nSeat 3: Yoo4 ($347.17 in chips) \nSeat 5: falco_lucky7 ($108.80 in chips) \nSeat 6: reppinR1 ($116.08 in chips) \nzocker jo433: posts small blind $0.50\nYoo4: posts big blind $1\n*** HOLE CARDS ***\nDealt to reppinR1 [7s 4c Ac Kh]\nfalco_lucky7: folds \nreppinR1: raises $2 to $3\ncharlybumbum: folds \nzocker jo433: calls $2.50\nYoo4: calls $2\n*** FLOP *** [Jd Tc 2c]\nzocker jo433: checks \nYoo4: bets $6\nreppinR1: calls $6\nzocker jo433: folds \n*** TURN *** [Jd Tc 2c] [Qh]\nYoo4: checks \nreppinR1: bets $18\nYoo4: calls $18\n*** RIVER *** [Jd Tc 2c Qh] [Th]\nYoo4: bets $42\nreppinR1: folds \nUncalled bet ($42) returned to Yoo4\nYoo4 collected $54.50 from pot\nYoo4: doesn't show hand \n*** SUMMARY ***\nTotal pot $57 | Rake $2.50 \nBoard [Jd Tc 2c]\nSeat 1: charlybumbum (button) folded before Flop (didn't bet)\nSeat 2: zocker jo433 (small blind) folded on the Flop\nSeat 3: Yoo4 (big blind) collected ($54.50)\nSeat 5: falco_lucky7 folded before Flop (didn't bet)\nSeat 6: reppinR1 folded on the River\n";
var HandHistory = (function () {
    function HandHistory(hh) {
        this._hh = hh;
        this.parseHH(hh);
    }
    HandHistory.prototype.parseHH = function (hh) {
    };
    HandHistory.prototype.runRegex = function (regExString) {
        var regExp = new RegExp(regExString);
        return this._hh.match(regExp);
    };
    return HandHistory;
}());
var stakes = '/\(([^\/]+)\/([^\)]+)\)/';
var stakess = /\(([^\/]+)\/([^\)]+)\)/;
var heroAndCards = /Dealt to (\w+) \[([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])/;
var board = /Board \[([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?/;
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
function runRegex(regExString) {
    var regExp = new RegExp(regExString);
    return this._hh.match(regExp);
}
console.log(runRegex(board));
