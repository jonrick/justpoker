import React, { useEffect, useRef } from 'react';
import CountUp from 'react-countup';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import TablePositionIndicator from './TablePositionIndicator';
import PlayerAvatar from './PlayerAvatar';
import Animoji from './Animoji';
import { Fade } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    stackCont: {
        width: '100%',
        marginTop: '-1vmin',
        position: 'relative',
        display: 'flex',
        height: '6vmin',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background-color 1s',
        ...theme.custom.STACK,
    },
    outOfHand: {
        boxShadow: theme.shadows[3],
    },
    toAct: {
        ...theme.custom.STACK_TO_ACT,
    },
    winner: {
        transition: 'all 1s',
        ...theme.custom.STACK_WINNER,
    },
    '@keyframes grad': {
        '0%': {
            backgroundPosition: '0% 0%',
        },
        '100%': {
            backgroundPosition: '200% -200%',
        },
    },
    nameStackCont: {
        width: '60%',
    },
    name: {
        paddingBottom: '0.8vmin',

        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',

        fontSize: '1.3vmin',
    },
    stack: {
        paddingTop: '0.8vmin',
        fontWeight: 'bold',
        fontSize: '1.7vmin',
    },
    buttonR: {
        fontWeight: 'bold',
        fontSize: '1.7vmin',
        paddingTop: '0.3vmin',
        paddingRight: '0.3vmin',
        float: 'right',
        height: '2vmin',
        width: '2vmin',
    },
    act: {
        backgroundColor: 'rgba(0, 236, 255, 1)',
    },
    winnerAnimojiCont: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    winnerAnimoji: {
        width: `100%`,
        height: '20vmin',
        position: 'absolute',
        opacity: 0,
        transition: 'opacity 0.4s',
    },
    showWinnerAnimoji: {
        transition: 'opacity 0.4s',
        opacity: 1,
    },
}));

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function PlayerStack(props) {
    const classes = useStyles();
    const { player, onClickStack } = props;
    const { stack, name, toAct, winner, positionIndicator, folded, uuid, sittingOut, avatarKey, position } = player;
    const outOfHand = sittingOut || folded;
    const prevStack = usePrevious(stack);

    return (
        <div
            onClick={onClickStack}
            className={classnames(classes.stackCont, {
                [classes.toAct]: toAct,
                [classes.winner]: winner,
                [classes.outOfHand]: outOfHand,
            })}
        >
            <div className={classes.winnerAnimojiCont}>
                {/* TODO is there performance concern of having mounted on every player with opaticty zero? */}
                <Animoji
                    reaction={'winner'}
                    className={classnames(classes.winnerAnimoji, { [classes.showWinnerAnimoji]: winner })}
                    animated
                />
            </div>
            <PlayerAvatar position={position} playerUUID={uuid} avatarKey={avatarKey} />
            {positionIndicator ? <TablePositionIndicator type="button" positionIndicator={positionIndicator} /> : null}
            <div className={classes.nameStackCont}>
                <Typography variant="h4" className={classes.stack}>
                    {winner ? <CountUp start={prevStack} end={stack} separator="," /> : stack.toLocaleString()}
                </Typography>
                <Typography variant="body1" className={classes.name}>
                    {name}
                </Typography>
            </div>
        </div>
    );
}

export default PlayerStack;
