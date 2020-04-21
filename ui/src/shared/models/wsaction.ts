import { BettingRoundAction } from "../models/game";

export enum ActionType {
    STARTGAME = "STARTGAME",
    STOPGAME = "STOPGAME",
    SITDOWN = "SITDOWN",
    STANDUP = "STANDUP",
    JOINTABLE = "JOINTABLE",
    JOINTABLEANDSITDOWN = "JOINTABLEANDSITDOWN",
    PINGSTATE = "PINGSTATE",
    CHECK = "CHECK",
    BET = "BET",
    FOLD = "FOLD",
    CALL = "CALL",
    CHAT = "CHAT",
    ADDCHIPS = "ADDCHIPS"
}

export declare interface SitDownRequest {
  seatNumber: number;
  // waitForBlind: boolean;
}

export declare interface JoinTableRequest {
  name: string;
  buyin: number;
  // admin: boolean;
  // sitdown: boolean;
  // password?: string;
}

export declare interface AddChipsRequest {
  chipAmount: number;
}

export declare interface ClientChatMessage {
  message: string;
}

export type ClientWsMessageRequest = 
  SitDownRequest & 
  JoinTableRequest & 
  (SitDownRequest & JoinTableRequest) 
  & BettingRoundAction & 
  AddChipsRequest &
  ClientChatMessage; 

export declare interface ClientWsMessage {
  actionType: ActionType;
  request: ClientWsMessageRequest;
}

