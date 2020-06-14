import get from 'lodash/get';
import docCookies from '../Cookies';
import queryString, { ParsedQuery } from 'query-string';
import {
    ClientWsMessage,
    ClientChatMessage,
    ClientActionType,
    ClientWsMessageRequest,
    BootPlayerRequest,
    AddAdminRequest,
    RemoveAdminRequest,
} from '../shared/models/api/api';
import { ClientUUID, GameInstanceUUID, PlayerUUID } from '../shared/models/system/uuid';

import { CONFIGS, Config, ENVIRONMENT } from '../shared/models/config/config';

const clientUUIDCookieID = 'jp-client-uuid';
const ONE_DAY = 60 * 60 * 24;

const config: Config = process.env.REACT_APP_ENVIRONMENT === ENVIRONMENT.PROD ? CONFIGS.PROD : CONFIGS.DEV;

export class WsServer {
    static clientUUID: ClientUUID | null = null;
    static ws: WebSocket;
    static subscriptions: { [key: string]: any } = {};

    static openWs(gameInstanceUUID: GameInstanceUUID) {
        console.log('opening ws...');
        const wsURL = `ws${config.SECURE_WS ? 's' : ''}://${config.SERVER_URL}${
            config.CLIENT_NEED_PORT ? `:${config.SERVER_PORT}` : ''
        }`;
        const wsURI = {
            url: wsURL,
            query: {
                clientUUID: docCookies.getItem(clientUUIDCookieID) || null,
                gameInstanceUUID: gameInstanceUUID || null,
            } as ParsedQuery,
        };

        WsServer.ws = new WebSocket(queryString.stringifyUrl(wsURI), []);
        WsServer.ws.onmessage = WsServer.onGameMessage;
        WsServer.ws.onclose = WsServer.onWSClose;

        return true;
    }

    private static onWSClose() {
        const key = 'onclose';
        WsServer.subscriptions[key].forEach((func) => func());
    }

    // TODO redesign dataCommunications and create general websocket data object so we
    // can add types here.
    private static onGameMessage(msg: MessageEvent) {
        const jsonData = JSON.parse(get(msg, 'data', {}));
        console.log(jsonData);
        if (jsonData.clientUUID) {
            docCookies.setItem(clientUUIDCookieID, jsonData.clientUUID, ONE_DAY);
            WsServer.clientUUID = jsonData.clientUUID;
        }
        Object.keys(WsServer.subscriptions).forEach((key) => {
            if (jsonData[key]) {
                WsServer.subscriptions[key].forEach((func) => func(jsonData[key]));
            }
        });
    }

    // TODO make this private, and expose a helper method to each component.
    static send(message: ClientWsMessage) {
        WsServer.ws.send(JSON.stringify(message));
    }

    static ping(){
        if (!WsServer.ws){
            return;
        }
        const pingMessage = {
            actionType: ClientActionType.PINGSTATE,
            request: {}
        } as ClientWsMessage;
        WsServer.ws.send(JSON.stringify(pingMessage));
    }

    static sendChatMessage(content: string) {
        const chatMessage: ClientChatMessage = { content };
        const clientWsMessage: ClientWsMessage = {
            actionType: ClientActionType.CHAT,
            request: (chatMessage as ClientChatMessage) as ClientWsMessageRequest,
        };
        WsServer.ws.send(JSON.stringify(clientWsMessage));
    }

    static sendBootPlayerMessage(playerUUID: PlayerUUID) {
        const clientWsMessage: ClientWsMessage = {
            actionType: ClientActionType.BOOTPLAYER,
            request: ({ playerUUID } as BootPlayerRequest) as ClientWsMessageRequest,
        };
        WsServer.ws.send(JSON.stringify(clientWsMessage));
    }

    static sendAddAdminMessage(playerUUID: PlayerUUID) {
        const clientWsMessage: ClientWsMessage = {
            actionType: ClientActionType.ADDADMIN,
            request: ({ playerUUID } as AddAdminRequest) as ClientWsMessageRequest,
        };
        WsServer.ws.send(JSON.stringify(clientWsMessage));
    }

    static sendRemoveAdminMessage(playerUUID: PlayerUUID) {
        const clientWsMessage: ClientWsMessage = {
            actionType: ClientActionType.REMOVEADMIN,
            request: ({ playerUUID } as RemoveAdminRequest) as ClientWsMessageRequest,
        };
        WsServer.ws.send(JSON.stringify(clientWsMessage));
    }

    static subscribe(key: string, onMessage) {
        if (WsServer.subscriptions[key]) {
            WsServer.subscriptions[key].push(onMessage);
        } else {
            WsServer.subscriptions[key] = [onMessage];
        }
    }
}
