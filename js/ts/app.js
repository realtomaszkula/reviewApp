"use strict";
class Player {
    constructor(params) {
        this.name = params.name;
        this.position = params.position;
    }
}
class Hero extends Player {
    constructor(params) {
        super(params);
        this.hand = params.hand;
    }
}
class HandHistory {
    constructor(params) {
        this._rgx = {
            buttonSeat: /Seat #(\d) is the button/,
            playerNicks: /(^.+?)(?=\(\$\d+)/,
            pot: /Total pot \$((\d+)(\.\d+)?)/,
            stakes: /\(([^\/]+)\/([^\)]+)\)/,
            time: /\[(\d\d\d\d)[/](\d\d)[/](\d\d)\s(\d\d?):(\d\d):(\d\d)/,
            board: /Board \[([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?/,
            heroName: /Dealt to (.+?(?=[[][2-9|T|J|Q|K|A][s|c|d|h]\s[2-9|T|J|Q|K|A][s|c|d|h]))/,
            heroCards: /[[]([2-9|T|J|Q|K|A][s|c|d|h](?:\s[2-9|T|J|Q|K|A][s|c|d|h]){1,3})/
        };
        this._board = {};
        this._hh = params.hh;
        this._hero = new Hero({ name: '', position: { position: '' }, hand: [] });
        this.parseHH(params.options);
    }
    parseHH(options) {
        if (options.setHeroName)
            this.setHeroName();
        if (options.setPlayers)
            this.setPlayers();
        if (options.setPot)
            this.setPot();
        if (options.setBoard)
            this.setBoard();
        if (options.setStakes)
            this.setStakes();
        if (options.setTime)
            this.setTime();
        if (options.setHeroCards)
            this.setHeroCards();
        if (options.setHeroPosition)
            this.setHeroPosition();
    }
    get board() { return this._board; }
    get hero() { return this._hero; }
    get time() { return this._time; }
    get stakes() { return this._stakes; }
    get gameType() { return this._gameType; }
    get lastStreetPlayed() { return this._lastStreetPlayed; }
    get potSize() { return this._potSize; }
    get players() { return this._players; }
    findButtonSeat() {
        let result = this.runRegex(this._rgx.buttonSeat);
        return result[1];
    }
    captureSeats() {
        // two first lines are hand nr and date, followed by up to 6 seatss
        return this._hh.split('\n').slice(2, 8);
    }
    getPossiblePositions(numOfPlayers) {
        let result;
        if (numOfPlayers > 2) {
            result = ['BTN', 'SB', 'BB', 'UTG', 'MP', 'CO'].slice(0, numOfPlayers);
        }
        else {
            result = ['BTN', 'BB'];
        }
        return result;
    }
    setPlayers() {
        let btnSeat = this.findButtonSeat();
        let seatedPlayers = this.captureSeats();
        let btnIdx = seatedPlayers.findIndex(str => str.includes(`Seat ${btnSeat}`));
        // rearanging seats so the seats array starts with the button position
        let firstHalf = seatedPlayers.slice(0, btnIdx);
        let secondHalf = seatedPlayers.slice(btnIdx);
        let rearangedSeats = secondHalf.concat(firstHalf);
        // remove 'Seat x: '
        let stripSeat = rearangedSeats.map(s => s = s.slice(8));
        // keep only strings with player nicks (will end with '($\d\d)' which is stack size)
        let playerNames = [];
        stripSeat.forEach(s => {
            let result = s.match(this._rgx.playerNicks);
            if (result)
                playerNames.push(result[0]);
        });
        // fetching possible positions
        let possiblePositions = this.getPossiblePositions(playerNames.length);
        // matching players nameswith position and pushing
        this._players = [];
        playerNames.forEach(playerName => {
            this._players.push(new Player({
                name: playerName.trim(),
                position: possiblePositions.shift()
            }));
        });
    }
    setPot() {
        let result = this.runRegex(this._rgx.pot);
        this._potSize = parseFloat(result[1]);
    }
    setStakes() {
        this._stakes = { sb: 0, bb: 0 };
        const regEx = /\(([^\/]+)\/([^\)]+)\)/;
        let result = this.runRegex(regEx);
        let step1 = result[0].split(' ');
        let step2 = step1[0].split('/');
        this._stakes.sb = parseFloat(step2[0].substr(2));
        this._stakes.bb = parseFloat(step2[1].substr(1));
    }
    setTime() {
        let yr, mth, day, h, m, s;
        let result = this.runRegex(this._rgx.time);
        Array.prototype.shift.call(result);
        [yr, mth, day, h, m, s] = result;
        this._time = Date.UTC(yr, mth, day, h, m, s);
    }
    setBoard() {
        let result = this.runRegex(this._rgx.board);
        if (result) {
            Array.prototype.shift.call(result);
            this._board.flop = [
                this.convertToCard(result[0]),
                this.convertToCard(result[1]),
                this.convertToCard(result[2])
            ];
            this._lastStreetPlayed = 'flop';
            if (result[3]) {
                this._board.turn = this.convertToCard(result[3]);
                this._lastStreetPlayed = 'turn';
                if (result[4]) {
                    this._board.river = this.convertToCard(result[4]);
                    this._lastStreetPlayed = 'river';
                }
            }
        }
        else {
            this._lastStreetPlayed = 'preflop';
        }
    }
    setHeroPosition() {
        this._hero.position = this._players.find(p => p.name === this._hero.name).position;
    }
    setHeroName() {
        let result = this.runRegex(this._rgx.heroName);
        this._hero.name = result[1].trim();
    }
    setHeroCards() {
        const regExResult = this.runRegex(this._rgx.heroCards)[1];
        let result = regExResult.split(' ');
        this._hero.hand = [
            this.convertToCard(result[0]),
            this.convertToCard(result[1]),
        ];
        if (result[2] && result[3]) {
            this._gameType = "Omaha";
            this._hero.hand.push(this.convertToCard(result[2]));
            this._hero.hand.push(this.convertToCard(result[3]));
        }
        else {
            this._gameType = "Holdem";
        }
    }
    convertToCard(card) {
        let value;
        switch (card[0]) {
            case 'T':
                value = 10;
                break;
            case 'J':
                value = 11;
                break;
            case 'Q':
                value = 12;
                break;
            case 'K':
                value = 13;
                break;
            case 'A':
                value = 14;
                break;
            default: value = parseInt(card[0]);
        }
        return {
            suit: card[1],
            value: value
        };
    }
    runRegex(regExString, flag = '') {
        const regExp = new RegExp(regExString, flag);
        if (flag) {
            let result = [], match;
            while (match = regExp.exec(this._hh)) {
                result.push(match);
            }
            return result;
        }
        else {
            return this._hh.match(regExp);
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HandHistory;
//# sourceMappingURL=app.js.map