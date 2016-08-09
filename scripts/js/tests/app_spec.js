/// <reference path="../scripts/app" />
define(["require", "exports", '../scripts/app'], function (require, exports, app) {
    "use strict";
    describe('Hand History', () => {
        describe('setBoard', () => {
            describe('with five cards specified', () => {
                let hh;
                beforeEach(() => {
                    let hhraw = `Total pot $57 | Rake $2.50 Board [Js Tc 2d 4s 5s] Seat 1:`;
                    hh = new app.HandHistory(hhraw, { setBoard: true });
                });
                it('should create board with flop turn and river', () => {
                    expect(hh.board.flop).toBeDefined();
                    expect(hh.board.turn).toBeDefined();
                    expect(hh.board.river).toBeDefined();
                });
                describe('when creating flop', () => {
                    it('should have 3 elements', () => {
                        expect(hh.board.flop.length).toEqual(3);
                    });
                    it('should create correct card value for first element', () => {
                        expect(hh.board.flop[0].value).toEqual(11);
                    });
                    it('should create correct card value for second element', () => {
                        expect(hh.board.flop[1].value).toEqual(10);
                    });
                    it('should create correct card value for third element', () => {
                        expect(hh.board.flop[2].value).toEqual(2);
                    });
                    it('should create correct card suit for first element', () => {
                        expect(hh.board.flop[0].suit).toEqual('s');
                    });
                    it('should create correct card suit for second element', () => {
                        expect(hh.board.flop[1].suit).toEqual('c');
                    });
                    it('should create correct card suit for third element', () => {
                        expect(hh.board.flop[2].suit).toEqual('d');
                    });
                });
                describe('when creating turn', () => {
                    it('should create correct card value', () => {
                        expect(hh.board.turn.value).toEqual(4);
                    });
                    it('should create correct card suit ', () => {
                        expect(hh.board.turn.suit).toEqual('s');
                    });
                });
                describe('when creating river', () => {
                    it('should create correct card value', () => {
                        expect(hh.board.river.value).toEqual(5);
                    });
                    it('should create correct card suit ', () => {
                        expect(hh.board.river.suit).toEqual('s');
                    });
                });
            });
            describe('with four cards specified', () => {
                let hh;
                beforeEach(() => {
                    let hhraw = `Total pot $57 | Rake $2.50 Board [Ad Ks 4s 4d] Seat 1:`;
                    hh = new app.HandHistory(hhraw, { setBoard: true });
                });
                it('should create board with just flop and turn', () => {
                    expect(hh.board.flop).toBeDefined();
                    expect(hh.board.turn).toBeDefined();
                    expect(hh.board.river).not.toBeDefined();
                });
            });
            describe('with three cards specified', () => {
                let hh;
                beforeEach(() => {
                    let hhraw = `Total pot $57 | Rake $2.50 Board [Ad Ks 4s] Seat 1:`;
                    hh = new app.HandHistory(hhraw, { setBoard: true });
                });
                it('should create board with just flop', () => {
                    expect(hh.board.flop).toBeDefined();
                    expect(hh.board.turn).not.toBeDefined();
                    expect(hh.board.river).not.toBeDefined();
                });
            });
        });
        describe('setStakes', () => {
            let hh;
            it('should create stakes object with correct properties', () => {
                let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01`;
                hh = new app.HandHistory(hhraw, { setStakes: true });
                expect(hh.stakes).toBeDefined;
                expect(hh.stakes.sb).toBeDefined();
                expect(hh.stakes.bb).toBeDefined();
            });
            describe('for $0.02/$0.05', () => {
                beforeEach(() => {
                    let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.02/$0.05 USD) - 2016/08/01`;
                    hh = new app.HandHistory(hhraw, { setStakes: true });
                });
                it('should create correct sb ', () => {
                    expect(hh.stakes.sb).toEqual(0.02);
                });
                it('should create correct bb', () => {
                    expect(hh.stakes.bb).toEqual(0.05);
                });
            });
            describe('for $0.05/$0.10', () => {
                beforeEach(() => {
                    let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.05/$0.10 USD) - 2016/08/01`;
                    hh = new app.HandHistory(hhraw, { setStakes: true });
                });
                it('should create correct sb ', () => {
                    expect(hh.stakes.sb).toEqual(0.05);
                });
                it('should create correct bb', () => {
                    expect(hh.stakes.bb).toEqual(0.1);
                });
            });
            describe('for $0.1/$0.25', () => {
                beforeEach(() => {
                    let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.10/$0.25 USD) - 2016/08/01`;
                    hh = new app.HandHistory(hhraw, { setStakes: true });
                });
                it('should create correct sb ', () => {
                    expect(hh.stakes.sb).toEqual(0.10);
                });
                it('should create correct bb', () => {
                    expect(hh.stakes.bb).toEqual(0.25);
                });
            });
            describe('for $0.25/$0.50', () => {
                beforeEach(() => {
                    let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.25/$0.50 USD) - 2016/08/01`;
                    hh = new app.HandHistory(hhraw, { setStakes: true });
                });
                it('should create correct sb ', () => {
                    expect(hh.stakes.sb).toEqual(0.25);
                });
                it('should create correct bb', () => {
                    expect(hh.stakes.bb).toEqual(0.50);
                });
            });
            describe('for $0.5/$1.0', () => {
                beforeEach(() => {
                    let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01`;
                    hh = new app.HandHistory(hhraw, { setStakes: true });
                });
                it('should create correct sb ', () => {
                    expect(hh.stakes.sb).toEqual(0.5);
                });
                it('should create correct bb', () => {
                    expect(hh.stakes.bb).toEqual(1);
                });
            });
            describe('for $1/$2', () => {
                beforeEach(() => {
                    let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($1/$2 USD) - 2016/08/01`;
                    hh = new app.HandHistory(hhraw, { setStakes: true });
                });
                it('should create correct sb ', () => {
                    expect(hh.stakes.sb).toEqual(1);
                });
                it('should create correct bb', () => {
                    expect(hh.stakes.bb).toEqual(2);
                });
            });
            describe('for $2/$4', () => {
                beforeEach(() => {
                    let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($2/$4 USD) - 2016/08/01`;
                    hh = new app.HandHistory(hhraw, { setStakes: true });
                });
                it('should create correct sb ', () => {
                    expect(hh.stakes.sb).toEqual(2);
                });
                it('should create correct bb', () => {
                    expect(hh.stakes.bb).toEqual(4);
                });
            });
            describe('for $3/$6', () => {
                beforeEach(() => {
                    let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($3/$6 USD) - 2016/08/01`;
                    hh = new app.HandHistory(hhraw, { setStakes: true });
                });
                it('should create correct sb ', () => {
                    expect(hh.stakes.sb).toEqual(3);
                });
                it('should create correct bb', () => {
                    expect(hh.stakes.bb).toEqual(6);
                });
            });
        });
        describe('setHeroName', () => {
            let hh;
            describe('when setting hero name', () => {
                it('should capture names with alphanumeric characters', () => {
                    let hhraw = `Dealt to reppinR1 [Js 8c]`;
                    hh = new app.HandHistory(hhraw, { setHeroName: true });
                    expect(hh.hero.name).toEqual('reppinR1');
                });
                it('should capture names with spaces', () => {
                    let hhraw = `Dealt to Donald J Trump [As 4c]`;
                    hh = new app.HandHistory(hhraw, { setHeroName: true });
                    expect(hh.hero.name).toEqual('Donald J Trump');
                });
                it('should capture names with squarebarkets characters', () => {
                    let hhraw = `Dealt to Donald J [As] [As 4c]`;
                    hh = new app.HandHistory(hhraw, { setHeroName: true });
                    expect(hh.hero.name).toEqual('Donald J [As]');
                });
                it('should capture names with special characters', () => {
                    let hhraw = `Dealt to *&^%$@#A SD<>?:"{} [As 4c]`;
                    hh = new app.HandHistory(hhraw, { setHeroName: true });
                    expect(hh.hero.name).toEqual('*&^%$@#A SD<>?:"{}');
                });
            });
        });
    });
});
//# sourceMappingURL=app_spec.js.map