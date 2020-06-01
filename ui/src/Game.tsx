import React, { useState } from 'react';

import Table from './Table';
import Controller from './Controller';
import AudioModule from './AudioModule';
import AnimiationModule from './AnimiationModule';
import ChatLog from './ChatLog';
import GameMenu from './GameMenu';
import GameLabel from './GameLabel';
import ControllerTimer from './ControllerTimer';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
    },
    gameTableCont: {
        height: '100%',
        position: 'relative',
        flex: '1 1 100%',
        overflow: 'hidden',
    },
    table: {
        height: '85%',
    },
    chatlog: {},
    controller: {
        height: '15%',
        width: '100%',
    },
}));

function Game(props) {
    const [mute, SET_mute] = useState(false);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GameMenu mute={mute} SET_mute={SET_mute} />
            <div className={classes.gameTableCont}>
                <GameLabel />
                <Table className={classes.table} />
                <ControllerTimer />
                <Controller className={classes.controller} />
            </div>
            <ChatLog className={classes.chatlog} />

            <AudioModule mute={mute} />
            <AnimiationModule />
        </div>
    );
}

export default Game;
