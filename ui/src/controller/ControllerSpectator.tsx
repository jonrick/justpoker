import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { globalGameStateSelector } from '../store/selectors';

import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Button from '@mui/material/Button';

import JoinGameDialog from '../game/JoinGameDialog';
import { SELENIUM_TAGS } from '../shared/models/test/seleniumTags';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        joinGameButton: {
            height: '60%',
            width: '12vw',
            maxWidth: '250px',
            fontSize: '2.4vmin',
        },
    }),
);

// should be render when player is a spectator, gives option to join game
function ControllerSpectator(props) {
    const classes = useStyles();
    const { rootClassName } = props;
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClose = () => {
        setDialogOpen(false);
    };

    const { isSpectator } = useSelector(globalGameStateSelector);

    if (!isSpectator) return null;

    return (
        <div className={rootClassName}>
            <Button
                className={classes.joinGameButton}
                onClick={() => setDialogOpen(true)}
                variant="contained"
                color="primary"
                id={SELENIUM_TAGS.IDS.JOIN_GAME_BUTTON}
            >
                Join Game
            </Button>
            {dialogOpen ? <JoinGameDialog open={dialogOpen} handleClose={handleClose} /> : null}
        </div>
    );
}

ControllerSpectator.displayName = 'ControllerSpectator';

export default ControllerSpectator;
