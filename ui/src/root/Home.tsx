import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MakeGame from './MakeGame';
import { indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: `radial-gradient(circle, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 150%)`,
        overflow: 'auto',
    },
    title: {
        marginTop: 12,
        marginBottom: 0,
        height: '28vmin',
        color: 'black',
    },
    left: {
        position: 'absolute',
        left: 0,
        width: '25%',
        top: -12,
        margin: 6,
        lineHeight: '100%',
    },
    supportButtons: {
        display: 'grid',
        gap: '0.5em',
        position: 'absolute',
        margin: 12,
        left: '0',
        bottom: '0',
        color: 'black',
    },
    beta: {
        position: 'absolute',
        color: indigo[900],
        fontStyle: 'bold',
        top: 18,
        right: 36,
        fontSize: '4.5vmin',
        padding: '0.5vmin 1.5vmin',
        backgroundColor: 'rgba(0,0,0,0.35)',
        borderRadius: '1vmin',
    },
}));

function Home(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* <LandingLogo className={classnames(classes.title, { [classes.left]: smallHeight })} />
            <Typography className={classes.beta}>BETA!</Typography> */ }
            <MakeGame />
            {/* <div className={classes.supportButtons}>
                <Button variant="outlined" color="inherit" onClick={() => SET_openEmail(true)}>
                    Contact Us
                </Button>
                <Button variant="outlined" color="inherit" href={donationLink} target="_blank">
                    Donate
                </Button>
            </div>
            <EmailDialog open={openEmail} onClose={() => SET_openEmail(false)} />*/ }
        </div>
    );
}

export default Home;
