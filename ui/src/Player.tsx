import React, { useState } from 'react';
import classnames from 'classnames';

import Hand from './Hand';
import PlayerStack from './PlayerStack';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

import PlayerTimer from './PlayerTimer';
import PlayerMenu from './PlayerMenu';
import PlayerLabel from './PlayerLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        width: `${theme.custom.PLAYER_WIDTH}vmin`,
        height: `${theme.custom.PLAYER_HEIGHT}vmin`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        transform: 'translateY(-50%) translateX(-50%)',
        filter: 'drop-shadow(0 0.4vmin 0.4vmin rgba(0,0,0,0.9))',
    },
    folded: {
        opacity: 0.5,
    },

    labelText: {
        margin: '0.3vmin 0.8vmin',
        width: '9vmin',
        textAlign: 'center',
        fontSize: '1.4vmin',
    },
    disconnected: {},
    hero: {
        transform: 'translateY(-50%) translateX(-50%) scale(1.21)',
    },
    moreIcon: {
        zIndex: 10,
        position: 'absolute',
        bottom: '3%',
        right: 0,
        marginRight: '0vmin',
        color: grey[700],
        '&:hover': {
            color: 'black',
        },
    },
}));

function Player(props) {
    const classes = useStyles();
    const { className, player, style, setHeroRotation, virtualPositon } = props;
    const { stack, hand, name, playerTimer, folded, uuid, sittingOut, hero, quitting, leaving, disconnected } = player;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget as any);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function getPlayerLabelComponent() {
        if (disconnected) {
            return (
                <Typography className={classnames(classes.labelText, classes.disconnected)}>Disconnected</Typography>
            );
        }
        if (playerTimer) {
            return <PlayerTimer className={classes.labelText} playerTimer={playerTimer} hero={hero} />;
        }
        if (quitting) {
            return <Typography className={classes.labelText}>Quitting</Typography>;
        }
        if (leaving) {
            return <Typography className={classes.labelText}>Leaving</Typography>;
        }
        if (sittingOut) {
            return <Typography className={classes.labelText}>Sitting Out</Typography>;
        }
        if (folded) {
            return <Typography className={classes.labelText}>Folded</Typography>;
        }

        return undefined;
    }

    const playerLabelComponent = getPlayerLabelComponent();

    return (
        <div
            className={classnames(classes.root, className, {
                [classes.folded]: folded || sittingOut,
                [classes.hero]: hero,
            })}
            style={style}
            id={uuid}
        >
            <PlayerMenu
                handleClose={handleClose}
                anchorEl={anchorEl}
                player={player}
                setHeroRotation={setHeroRotation}
                virtualPositon={virtualPositon}
            />

            <Hand hand={hand} folded={folded} hero={hero} />

            <PlayerStack onClickStack={handleClick} player={player} />
            {playerLabelComponent ? <PlayerLabel>{playerLabelComponent}</PlayerLabel> : null}
        </div>
    );
}

export default Player;
