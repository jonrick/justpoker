import { ClientUUID, PlayerUUID } from '../system/uuid';

export declare interface GameParameters {
    smallBlind: number;
    bigBlind: number;
    gameType: GameType;
    maxBuyin: number;
    timeToAct: number;

    // advanced params

    maxPlayers: number;
    dynamicMaxBuyin: boolean;
    maxBuyinType: MaxBuyinType;
    minBuyin: number;
    allowTimeBanks: boolean;
    timeBankReplenishIntervalMinutes: number;
    timeBankTime: number;
    numberTimeBanks: number;
    allowStraddle: boolean;
    canShowHeadsUp: boolean;
}

export enum MaxBuyinType {
    TopStack = 'TopStack',
    HalfTopStack = 'HalfTopStack',
    SecondStack = 'SecondStack',
    AverageStack = 'AverageStack',
}

export enum StraddleType {
    NoStraddle = 'NoStraddle',
    MississipiStraddle = 'MississipiStraddle',
    NormalStraddle = 'NormalStraddle',
}

export enum GameType {
    LHOLDEM = 'LHOLDEM',
    NLHOLDEM = 'NLHOLDEM',
    PLOMAHA = 'PLOMAHA',
}

export declare interface ConnectedClient {
    readonly uuid: ClientUUID;
    playerUUID: PlayerUUID;
}

export function getCleanGameParameters(): GameParameters {
    return {
        smallBlind: 0,
        bigBlind: 0,
        gameType: GameType.NLHOLDEM,
        maxBuyin: 0,
        minBuyin: 0,
        dynamicMaxBuyin: false,
        maxBuyinType: MaxBuyinType.TopStack,
        timeToAct: 0,
        maxPlayers: 0,
        timeBankTime: 0,
        numberTimeBanks: 0,
        allowTimeBanks: false,
        timeBankReplenishIntervalMinutes: 0,
        allowStraddle: false,
        canShowHeadsUp: false,
    };
}

export function getDefaultGameParameters(): GameParameters {
    return {
        smallBlind: 1,
        bigBlind: 2,
        gameType: GameType.NLHOLDEM,
        maxBuyin: 200,
        minBuyin: 50,
        dynamicMaxBuyin: false,
        maxBuyinType: MaxBuyinType.TopStack,
        timeToAct: 30,
        maxPlayers: 9,
        timeBankTime: 30,
        numberTimeBanks: 5,
        allowTimeBanks: true,
        timeBankReplenishIntervalMinutes: 15,
        allowStraddle: false,
        canShowHeadsUp: false,
    };
}

export function getTestGameParameters(): GameParameters {
    return {
        smallBlind: 100,
        bigBlind: 200,
        gameType: GameType.NLHOLDEM,
        maxBuyin: 200000,
        minBuyin: 5000,
        dynamicMaxBuyin: false,
        maxBuyinType: MaxBuyinType.TopStack,
        timeToAct: 1200,
        maxPlayers: 9,
        timeBankTime: 30,
        numberTimeBanks: 11,
        allowTimeBanks: true,
        timeBankReplenishIntervalMinutes: 15,
        allowStraddle: true,
        canShowHeadsUp: true,
    };
}
