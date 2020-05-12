import 'reflect-metadata';
import { Service, Container } from 'typedi';

import util from 'util';
import * as http from 'http';
import * as WebSocket from 'ws';
import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import cookie from 'cookie';

import { AddressInfo } from 'net';
import { MessageService } from '../service/messageService';
import { GameState, ServerStateKey, ALL_STATE_KEYS } from '../../../ui/src/shared/models/gameState';
import { GameStateManager } from '../service/gameStateManager';
import { StateConverter } from '../service/stateConverter';
import { generateUUID, logGameState, printObj } from '../../../ui/src/shared/util/util';
import { AudioService } from '../service/audioService';
import { AnimationService } from '../service/animationService';

import { ChatService } from '../service/chatService';
import { StateGraphManager } from '../service/stateGraphManager';
import { NewGameForm } from '../../../ui/src/shared/models/table';

declare interface PerformanceMetrics {
    // sum, count (used for average)
    snippets: { [key in ExecutionSnippet]: [number, number] };
}

const enum ExecutionSnippet {
    PROCESS_MSG = 'MESSAGE_SERVICE_PROCESS_MESSAGE',
    SEND_UPDATES = 'SEND_UPDATES_WITH_TRANSFORM_FOR_ALL',
    TOTAL_WS_MESSAGE_PROCESS = 'TOTAL_WS_MESSAGE_PROCESS',
}

@Service()
class Server {
    app: express.Application;
    server: http.Server;
    defaultPort = 8080;
    wss: WebSocket.Server;
    tableInitialized = false;
    performanceMetrics: PerformanceMetrics = {
        snippets: {
            MESSAGE_SERVICE_PROCESS_MESSAGE: [0, 0],
            SEND_UPDATES_WITH_TRANSFORM_FOR_ALL: [0, 0],
            TOTAL_WS_MESSAGE_PROCESS: [0, 0],
        },
    };

    constructor(
        private messageService: MessageService,
        private gsm: GameStateManager,
        private stateConverter: StateConverter,
        private stateGraphManager: StateGraphManager,
        private readonly chatService: ChatService,
        private readonly audioService: AudioService,
        private readonly animationService: AnimationService,
    ) {}

    updateSnippet(snippet: ExecutionSnippet, ms: number) {
        this.performanceMetrics.snippets[snippet][0] += ms;
        this.performanceMetrics.snippets[snippet][1] += 1;
    }

    logAverages() {
        Object.entries(this.performanceMetrics.snippets).forEach(([snippet, [sum, count]]) => {
            if (count === 0) {
                return;
            }
            // dont flood the console
            if (count % 10 === 0) {
                console.log(`${snippet}: Average over ${count} samples: ${sum / count}`);
            }
        });
    }

    private initRoutes(): void {
        const router = express.Router();

        router.get('/', (req, res) => {
            res.send('Poker Web.');
        });

        router.post('/createGame', (req, res) => {
            const newGameForm: NewGameForm = {
                smallBlind: req.body.smallBlind,
                bigBlind: req.body.bigBlind,
                gameType: req.body.gameType,
                maxBuyin: req.body.maxBuyin,
                password: req.body.password,
                timeToAct: req.body.timeToAct,
            };
            const tableId = this.gsm.initGame(newGameForm);
            this.initWSSListeners();
            this.chatService.clearMessages();
            this.tableInitialized = true;
            console.log(tableId);
            res.send(JSON.stringify({ tableId: tableId }));
        });

        this.app.use(bodyParser.json());

        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        );
        this.app.use('/', router);
    }

    sendUpdatesToClients() {
        for (const client of this.gsm.getConnectedClients()) {
            const res = this.stateConverter.getUIState(client.uuid);
            const jsonRes = JSON.stringify(res);
            client.ws.send(jsonRes);

            continue;
            /* Debug Logging */
            const playerName = client.playerUUID ? this.gsm.getPlayer(client.playerUUID).name : 'Anonymous Client';
            console.log(`\n\nServer is sending following ui state to ${playerName} ${client.uuid}:\n'`);
            console.log(util.inspect(res, false, null, true));
            /* -------------- */
        }
    }

    //refactor this mess of a function
    initWSSListeners() {
        this.wss.removeAllListeners();
        this.wss.on('connection', (ws: WebSocket, req) => {
            const ip = req.connection.remoteAddress;
            console.log('connected to ip:', ip);

            let clientID = '';
            // try to get clientID from url (frontend)
            if (!clientID) {
                const regEx = /clientID\=(\w+)/g;
                clientID = Array.from(req.url.matchAll(regEx), (m) => m[1])[0];
            }
            if (!clientID) {
                clientID = generateUUID();
            }

            console.log('clientID: ', clientID);

            // TODO server shouldnt be communicating with the gameStateManager, but with some
            // other intermediary that will handle WS robustness
            this.gsm.initConnectedClient(clientID, ws);

            ws.send(JSON.stringify({ clientID }));
            ws.send(JSON.stringify(this.stateConverter.getUIState(clientID)));

            ws.on('message', (data: WebSocket.Data) => {
                console.log('Incoming data:');
                printObj(data);
                if (typeof data === 'string') {
                    try {
                        const receivedMessageTime = Date.now();
                        const action = JSON.parse(data);
                        this.messageService.processMessage(action, clientID);
                        const msgServiceProcessMsgTime = Date.now() - receivedMessageTime;
                        this.updateSnippet(ExecutionSnippet.PROCESS_MSG, msgServiceProcessMsgTime);

                        this.logAverages();
                    } catch (e) {
                        logGameState(this.gsm.getGameState());
                        throw e;
                    }
                } else {
                    const unsupportedMsg = 'Received data of unsupported type.';
                    console.log(unsupportedMsg);
                    ws.send(JSON.stringify({ error: unsupportedMsg }));
                }
            });
        });
    }

    init() {
        this.app = express();
        this.initRoutes();
        this.server = http.createServer(this.app);
        this.wss = new WebSocket.Server({ server: this.server });

        this.stateGraphManager.observeUpdates().subscribe(() => {
            this.sendUpdatesToClients();
            this.audioService.reset();
            this.animationService.reset();
            this.chatService.clearLastMessage();
        });

        this.server.listen(process.env.PORT || this.defaultPort, () => {
            const port = this.server.address() as AddressInfo;
            console.log(`Server started on address ${JSON.stringify(port)} :)`);
        });
    }
}

const server = Container.get(Server);
server.init();
