"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const playerService_1 = require("./playerService");
let TableService = 
// maybe this can be renamed to RoomService :)
// or more accurately, TableService
class TableService {
    constructor(playerService) {
        this.playerService = playerService;
    }
    newGame(newGameForm) {
        const player = this.playerService.newPlayer(newGameForm.hostName);
    }
};
TableService = __decorate([
    typedi_1.Service()
    // maybe this can be renamed to RoomService :)
    // or more accurately, TableService
    ,
    __metadata("design:paramtypes", [playerService_1.PlayerService])
], TableService);
exports.TableService = TableService;
//# sourceMappingURL=gameService.js.map