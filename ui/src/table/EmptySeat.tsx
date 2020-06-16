import React from 'react';
import classnames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const size = 5;

const useStyles = makeStyles((theme) => ({
    hoverZone: {
        width: `${size*2}vmin`,
        height: `${size*4}vmin`,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover button': {
            visibility: 'visible',
        },
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        clipPath: `circle(${size}vmin at ${size}vmin ${size}vmin)`
    },
    button: {
        borderRadius: 'unset',
        width: `${size*2}vmin`,
        height: `${size}vmin`,
        visibility: 'hidden',
    },
    topButtonText: {
        marginTop: '1vmin'
    },
    text: {
        fontSize: '1.2vmin',
    },
}));



function EmptySeat(props) {
    const classes = useStyles();
    const { className, style, setHeroRotation, virtualPositon } = props;

    function handleRotationButtonClick() {
        setHeroRotation(virtualPositon);
    };

    function handleSeatChangeClick() {
        // TODO implementing 
    }

    return (
        <div className={classnames(classes.hoverZone, className)} style={style}>
            <div className={classes.container}>
                <IconButton className={classnames(classes.button)} onClick={handleRotationButtonClick}>
                    <Typography className={classnames(classes.text,classes.topButtonText)}>Rotate Here</Typography>
                </IconButton>
                <IconButton className={classnames(classes.button)} onClick={handleSeatChangeClick}>
                    <Typography className={classes.text}>Sit Here</Typography>
                </IconButton>
            </div>
            
        </div>
    );
}

export default EmptySeat;
