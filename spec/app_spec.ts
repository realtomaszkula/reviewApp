/// <reference path="../scripts/app" />

import HandHistory from "../scripts/app";

describe('Hand History', () => {

  xdescribe('when creating 10 000 elements', () => {
    it('should finish in less than 5s', () => {
        let hhRaw= `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01 0:25:01 CET [2016/07/31 18:25:01 ET]
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
Board [Js Tc 2c 4s 5s]
Seat 1: charlybumbum (button) folded before Flop (didn't bet)
Seat 2: zocker jo433 (small blind) folded on the Flop
Seat 3: Yoo4 (big blind) collected ($54.50)
Seat 5: falco_lucky7 folded before Flop (didn't bet)
Seat 6: reppinR1 folded on the River`;
        let opts = {
          setBoard: true,
          setStakes: true,
          setTime: true,
          setHeroName: true,
          setHeroCards: true,
          setHeroPosition: true,
        };

        let t1 = Date.now() / 1000
        for (let i = 0; i < 10000; i++) {
          let x = new HandHistory(hhRaw, opts);
        }
        let t2 = Date.now() / 1000
        expect(t2 - t1).toBeLessThan(5);        
        console.log(t2- t1)
    });
  });

  describe('setBoard', () => {
    describe('with five cards specified', () => {
      let hh;

      beforeEach(() => {
        let hhraw = `Total pot $57 | Rake $2.50 Board [Js Tc 2d 4s 5s] Seat 1:`;
        hh = new HandHistory(hhraw, { setBoard: true });
      })

      it('should create board with flop turn and river', () => {
        expect(hh.board.flop).toBeDefined();
        expect(hh.board.turn).toBeDefined();
        expect(hh.board.river).toBeDefined();
      });

      describe('when creating flop', () => {
        it('should have 3 elements', () => {
          expect(hh.board.flop.length).toEqual(3);
        })
        it('should create correct card value for first element', () => {
          expect(hh.board.flop[0].value).toEqual(11);
        })
        it('should create correct card value for second element', () => {
          expect(hh.board.flop[1].value).toEqual(10);
        })
        it('should create correct card value for third element', () => {
          expect(hh.board.flop[2].value).toEqual(2);
        })
        it('should create correct card suit for first element', () => {
          expect(hh.board.flop[0].suit).toEqual('s');
        })
        it('should create correct card suit for second element', () => {
          expect(hh.board.flop[1].suit).toEqual('c');
        })
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
        hh = new HandHistory(hhraw, { setBoard: true });
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
        hh = new HandHistory(hhraw, { setBoard: true });
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

    it ('should create stakes object with correct properties', () => {
      let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01`;
      hh = new HandHistory(hhraw, { setStakes: true });
      expect(hh.stakes).toBeDefined
      expect(hh.stakes.sb).toBeDefined();
      expect(hh.stakes.bb).toBeDefined();
    })

    describe('for $0.02/$0.05', () => {
      beforeEach(() => {
        let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.02/$0.05 USD) - 2016/08/01`;
       hh = new HandHistory(hhraw, { setStakes: true });
      })

      it ('should create correct sb ', () => {
        expect(hh.stakes.sb).toEqual(0.02)
      })

      it ('should create correct bb', () => {
        expect(hh.stakes.bb).toEqual(0.05)
      })
    });

    describe('for $0.05/$0.10', () => {
      beforeEach(() => {
        let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.05/$0.10 USD) - 2016/08/01`;
       hh = new HandHistory(hhraw, { setStakes: true });
      })

      it ('should create correct sb ', () => {
        expect(hh.stakes.sb).toEqual(0.05)
      })

      it ('should create correct bb', () => {
        expect(hh.stakes.bb).toEqual(0.1)
      })
    });


    describe('for $0.1/$0.25', () => {
      beforeEach(() => {
        let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.10/$0.25 USD) - 2016/08/01`;
       hh = new HandHistory(hhraw, { setStakes: true });
      })

      it ('should create correct sb ', () => {
        expect(hh.stakes.sb).toEqual(0.10)
      })

      it ('should create correct bb', () => {
        expect(hh.stakes.bb).toEqual(0.25)
      })
    });

    describe('for $0.25/$0.50', () => {
      beforeEach(() => {
        let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.25/$0.50 USD) - 2016/08/01`;
       hh = new HandHistory(hhraw, { setStakes: true });
      })

      it ('should create correct sb ', () => {
        expect(hh.stakes.sb).toEqual(0.25)
      })

      it ('should create correct bb', () => {
        expect(hh.stakes.bb).toEqual(0.50)
      })
    });

    describe('for $0.5/$1.0', () => {
      beforeEach(() => {
        let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($0.50/$1.00 USD) - 2016/08/01`;
       hh = new HandHistory(hhraw, { setStakes: true });
      })

      it ('should create correct sb ', () => {
        expect(hh.stakes.sb).toEqual(0.5)
      })

      it ('should create correct bb', () => {
        expect(hh.stakes.bb).toEqual(1)
      })
    });

    describe('for $1/$2', () => {
      beforeEach(() => {
        let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($1/$2 USD) - 2016/08/01`;
       hh = new HandHistory(hhraw, { setStakes: true });
      })

      it ('should create correct sb ', () => {
        expect(hh.stakes.sb).toEqual(1)
      })

      it ('should create correct bb', () => {
        expect(hh.stakes.bb).toEqual(2)
      })
    });

    describe('for $2/$4', () => {
      beforeEach(() => {
        let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($2/$4 USD) - 2016/08/01`;
       hh = new HandHistory(hhraw, { setStakes: true });
      })

      it ('should create correct sb ', () => {
        expect(hh.stakes.sb).toEqual(2)
      })

      it ('should create correct bb', () => {
        expect(hh.stakes.bb).toEqual(4)
      })
    });

    describe('for $3/$6', () => {
      beforeEach(() => {
        let hhraw = `PokerStars Hand #156701873519:  Omaha Pot Limit ($3/$6 USD) - 2016/08/01`;
       hh = new HandHistory(hhraw, { setStakes: true });
      })

      it ('should create correct sb ', () => {
        expect(hh.stakes.sb).toEqual(3)
      })

      it ('should create correct bb', () => {
        expect(hh.stakes.bb).toEqual(6)
      })
    });

  });

  describe('setHeroName', () => {
    let hh;
    describe('when setting hero name', () => {
      it('should capture names with alphanumeric characters', () => {
        let hhraw = `Dealt to reppinR1 [Js 8c]`;
        hh = new HandHistory(hhraw, { setHeroName: true });
        expect(hh.hero.name).toEqual('reppinR1');
      });

      it('should capture names with spaces', () => {
        let hhraw = `Dealt to Donald J Trump [As 4c]`;
        hh = new HandHistory(hhraw, { setHeroName: true });
        expect(hh.hero.name).toEqual('Donald J Trump');
      });

      it('should capture names with squarebarkets characters', () => {
        let hhraw = `Dealt to Donald J [As] [As 4c]`;
        hh = new HandHistory(hhraw, { setHeroName: true });
        expect(hh.hero.name).toEqual('Donald J [As]');
      });

      it('should capture names with special characters', () => {
        let hhraw = `Dealt to *&^%$@#A SD<>?:"{} [As 4c]`;
        hh = new HandHistory(hhraw, { setHeroName: true });
        expect(hh.hero.name).toEqual('*&^%$@#A SD<>?:"{}');
      });
    });
  });

  describe('setHeroCards', () => {

    describe('when setting hero cards', () => {

      describe('when dealt two cards', () => {
      let hh;

        beforeEach(() => {
          let hhraw = `Dealt to reppinR1 [Js 8c]`;
          hh = new HandHistory(hhraw, { setHeroCards: true });
        });

        it('should set game type as holdem', () => {
          expect(hh.gameType).toEqual('Holdem');
        });

        it('should define two cards', () => {
          expect(hh.hero.hand[0]).toBeDefined();
          expect(hh.hero.hand[1]).toBeDefined();
          expect(hh.hero.hand[2]).not.toBeDefined();
          expect(hh.hero.hand[3]).not.toBeDefined();
        });


        it('should set correct value for first card', () => {
          expect(hh.hero.hand[0].value).toEqual(11);
        });

        it('should set correct suit for first card', () => {
          expect(hh.hero.hand[0].suit).toEqual('s');
        });

        it('should set correct value for second card', () => {
          expect(hh.hero.hand[1].value).toEqual(8);
        });

        it('should set correct suit for second card', () => {
          expect(hh.hero.hand[1].suit).toEqual('c');
        });
      })

      describe('when dealt four cards', () => {
      let hh;

        beforeEach(() => {
          let hhraw = `Dealt to reppinR1 [As Kd Qh 4c]`;
          hh = new HandHistory(hhraw, { setHeroCards: true });
        });

        it('should set game type as omaha', () => {
          expect(hh.gameType).toEqual('Omaha');
        });

        it('should define two cards', () => {
          expect(hh.hero.hand[0]).toBeDefined();
          expect(hh.hero.hand[1]).toBeDefined();
          expect(hh.hero.hand[2]).toBeDefined();
          expect(hh.hero.hand[3]).toBeDefined();
        });

        it('should set correct value for first card', () => {
          expect(hh.hero.hand[0].value).toEqual(14);
        });

        it('should set correct suit for first card', () => {
          expect(hh.hero.hand[0].suit).toEqual('s');
        });

        it('should set correct value for second card', () => {
          expect(hh.hero.hand[1].value).toEqual(13);
        });

        it('should set correct suit for second card', () => {
          expect(hh.hero.hand[1].suit).toEqual('d');
        });

        it('should set correct value for first card', () => {
          expect(hh.hero.hand[2].value).toEqual(12);
        });

        it('should set correct suit for first card', () => {
          expect(hh.hero.hand[2].suit).toEqual('h');
        });

        it('should set correct value for second card', () => {
          expect(hh.hero.hand[3].value).toEqual(4);
        });

        it('should set correct suit for second card', () => {
          expect(hh.hero.hand[3].suit).toEqual('c');
        });
      })

    });
  });

  describe('setPosition', () => {
    describe('on 6 max table with 6 players', () => {
      it('should recognize BTN position', () => {
          let hhraw = `Table 'Aletheia' 6-max Seat #1 is the button
          Seat 1: reppinR1 ($116.08 in chips)
          Seat 2: zocker jo433 ($416.52 in chips) 
          Seat 3: Yoo4 ($347.17 in chips) 
          Seat 4: Zecik11 ($322.14 in chips) 
          Seat 5: falco_lucky7 ($108.80 in chips) 
          Seat 6: charlybumbum ($100 in chips)
`
          let hh = new HandHistory(hhraw, { setHeroPosition: true });
          expect(hh.hero.position).toEqual('BTN')
      })
    });
  });
});


`Table 'Aletheia' 6-max Seat #1 is the button
Seat 1: charlybumbum ($100 in chips) 
Seat 2: zocker jo433 ($416.52 in chips) 
Seat 3: Yoo4 ($347.17 in chips) 
Seat 4: Zecik11 ($322.14 in chips) 
Seat 5: falco_lucky7 ($108.80 in chips) 
Seat 6: reppinR1 ($116.08 in chips) `