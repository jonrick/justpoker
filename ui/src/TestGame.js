export const TestGame = {
  controller: {
    toAct: true,
    unsetCheckCall: true,
    min: 25,
    max: 43000,
    pot: 12000,
    sizingButtons: [
      {
        label: "1/2",
        value: 6000,
      },
      {
        label: "3/4",
        value: 9000,
      },
      {
        label: "Pot",
        value: 12000,
      },
      {
        label: "All In",
        value: 43000,
      },
    ],
    actionButtons: [
      {
        action: "FOLD",
        label: "Fold",
      },
      {
        action: "CHECK",
        label: "Check",
      },
      {
        action: "BET",
        label: "Bet",
      },
    ],
  },
  table: {
    spots: 9,
    pot: 12000,
    communityCards: [
      {
        suit: "CLUBS",
        rank: "T",
      },
      {
        suit: "SPADES",
        rank: "K",
      },
      {
        suit: "HEARTS",
        rank: "Q",
      },
      {
        suit: "DIAMONDS",
        rank: 4,
      },
      {
        suit: "CLUBS",
        rank: 2,
      },
    ],
    players: [
      {
        name: "Rick Dolo",
        position: 0,
        stack: 5500,
        toAct: true,
        bet: 100,
        hand: {
          cards: [
            {
              suit: "CLUBS",
              rank: 11,
            },
            {
              suit: "CLUBS",
              rank: 10,
            },
          ],
        },
      },
      {
        name: "Marty Shakus",
        position: 1,
        stack: 425323,
        bet: 999900,
        hand: {
          cards: [
            {
              suit: "HEARTS",
              rank: 4,
            },
            {
              suit: "CLUBS",
              rank: 2,
            },
          ],
        },
      },
      {
        name: "Dean Markus",
        position: 2,
        stack: 323,
        bet: 239,
        hand: {
          cards: [
            {
              suit: "DIAMONDS",
              rank: 11,
            },
            {
              suit: "CLUBS",
              rank: 12,
            },
          ],
        },
      },
      {
        name: "Tommy Bones",
        position: 3,
        stack: 1,
        bet: 1,
        hand: {
          cards: [
            {
              suit: "DIAMONDS",
              rank: 1,
            },
            {
              suit: "DIAMONDS",
              rank: 2,
            },
          ],
        },
      },
      {
        button: true,
        name: "Langus Yanger",
        position: 4,
        stack: 323,
        bet: 1000000000,

        hand: {
          cards: [
            {
              suit: "HEARTS",
              rank: 6,
            },
            {
              suit: "HEARTS",
              rank: 1,
            },
          ],
        },
      },
      // {
      //   name: "Don Chiko",
      //   position: 5,
      //   stack: 923423,
      //   bet: 4500,
      //   hand: {
      //     cards: [
      //       {
      //         suit: "SPADES",
      //         rank: 3,
      //       },
      //       {
      //         suit: "SPADES",
      //         rank: 12,
      //       },
      //     ],
      //   },
      // },
      {
        hero: true,
        name: "Jimmy Dean",
        position: 6,
        stack: 43020,
        bet: 12345,
        hand: {
          cards: [
            {
              suit: "DIAMONDS",
              rank: 1,
            },
            {
              suit: "CLUBS",
              rank: 6,
            },
          ],
        },
      },
      {
        name: "Nicki Lam",
        stack: 20499,
        position: 7,
        bet: 450,
        hand: {
          cards: [
            {
              suit: "HEARTS",
              rank: 11,
            },
            {
              suit: "HEARTS",
              rank: 12,
            },
          ],
        },
      },
      // {
      //   name: "Mhumngus",
      //   stack: 9175423,
      //   position: 8,
      //   bet: 999999,
      //   hand: {
      //     cards: [
      //       {
      //         suit: "HEARTS",
      //         rank: 11,
      //       },
      //       {
      //         suit: "HEARTS",
      //         rank: 12,
      //       },
      //     ],
      //   },
      // },
    ],
  },
};

export const CleanGame = {
  controller: {
    toAct: false,
    unsetCheckCall: true,
    min: 0,
    max: 0,
    pot: 0,
    sizingButtons: [],
    actionButtons: [],
  },
  table: {
    spots: 9,
    pot: 0,
    communityCards: [],
    players: [],
  },
};

export default CleanGame;
