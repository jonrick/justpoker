import { Action, ActionType, SitDownRequest, JoinTableRequest } from '../models/wsaction';
import { ConnectedClient } from '../models/table';
import { GameStateManager } from './gameStateManager';
import { PlayerService } from './playerService';
import { ValidationService } from './validationService';
import { Service } from "typedi";



@Service()
export class MessageService {

    constructor(
        private readonly playerService: PlayerService,
        private readonly gameStateManager: GameStateManager,
        private readonly validationService: ValidationService,
    ) { }

    processMessage(action: Action, clientUUID: string) {

        const actionType = action.actionType;
        const data = action.data;

        this.validationService.validateClientExists(clientUUID);

        switch (actionType) {
            case ActionType.StartGame: {
                this.processStartGameMessage(clientUUID);
                break;
            }
            case ActionType.StopGame: {
                this.processStopGameMessage(clientUUID);
                break;
            }
            case ActionType.SitDown: {
                this.processSitDownMessage(clientUUID, data);
                break;
            }
            case ActionType.StandUp: {
                this.processStandUpMessage(data);
                break;
            }
            case ActionType.JoinTable: {
                this.processJoinTableMessage(clientUUID, data);
                break;
            }

            case ActionType.Check: {
                this.processCheckMessage();
                break;
            }

            case ActionType.PingState: {
                break;
            }
        }

        return this.gameStateManager.stripSensitiveFields(clientUUID);

    }

    // Preconditions: at least two players are sitting down.
    processStartGameMessage(clientUUID: string) {
        this.validationService.validateStartGameAction(clientUUID);
        this.gameStateManager.startGame(clientUUID);
    }

    // Preconditions: the game is in progress.
    processStopGameMessage(clientUUID: string) {
        this.validationService.validateStopGameAction(clientUUID);
        this.gameStateManager.startGame(clientUUID);
    }

    processSitDownMessage(clientUUID: string, request: SitDownRequest) {
        this.validationService.validateSitDownAction(clientUUID, request)
        const player = this.gameStateManager.getPlayerByClientUUID(clientUUID);
        this.gameStateManager.sitDownPlayer(player.uuid, request.seatNumber);
    }

    processStandUpMessage(clientUUID: string) {
        this.validationService.validateStandUpAction(clientUUID);
        const player = this.gameStateManager.getPlayerByClientUUID(clientUUID);
        this.gameStateManager.standUpPlayer(player.uuid);
    }

    processJoinTableMessage(clientUUID: string, request: JoinTableRequest) {
        this.validationService.validateClientIsNotInGame(clientUUID);
        const gameState = this.gameStateManager.addNewPlayerToGame(clientUUID, request.name, request.buyin);
    }

    // TODO perhaps create one actionType for a gamePlayAction, and then validate to make sure
    // that only messages from the current player to act are processed.

    processCheckMessage() {
        // const player = this.gameStateManager.getPlayerByClientID(clientUUID);
        this.gameStateManager.gamePlayActionCheck();
    }
}
