import React from 'react';

import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { Typography, Button } from '@mui/material';

const useStyles = makeStyles()((theme: Theme) => ({
        root: {
            display: 'flex',
            position: 'absolute',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '90vh',
            zIndex: 100,
        },
        message: {
            top: 36,
            position: 'absolute',
            fontSize: '4.5vmin',
            color: 'black',

            textAlign: 'center',
        },
        button: {
            fontSize: '3.8vmin',
            fontWeight: 'bold',
            width: '22vw',
            minWidth: '300px',
            height: '16vh',
        },
    }),
);

function GameDisconnectionMessage(props) {
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <Typography className={classes.message}>You Are Disconnected.</Typography>

            <Button
                className={classes.button}
                color="primary"
                variant="contained"
                onClick={() => window.location.reload()}
            >
                Reconnect!
            </Button>
        </div>
    );
}

export default GameDisconnectionMessage;
