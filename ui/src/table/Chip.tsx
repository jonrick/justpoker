import React from 'react';
import { MAX_VALUES } from '../shared/util/consts';

import { purple } from '@mui/material/colors';
import { pink } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import { lightGreen } from '@mui/material/colors';
import { cyan } from '@mui/material/colors';
import { lime } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';
import { deepOrange } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { deepPurple } from '@mui/material/colors';

import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
    svgCircle: {
        strokeWidth: '5%',
        r: '28%',
    },
    svgInnerCircle: {
        strokeWidth: '2.5%',
        r: '10%',
    },
}));

function Chip(props) {
    const { classes } = useStyles();
    const { yPos = '50%', xPos = '50%', amount } = props;

    function getChipHueFromAmount(amount) {
        if (MAX_VALUES.PLAYER_STACK < amount) {
            return grey;
        }
        const hues = [cyan, deepOrange, green, purple, lightGreen, pink, yellow, deepPurple, lime, red];
        const hueIndex = Math.floor(Math.log10(amount));
        return hues[hueIndex];
    }

    const hue = getChipHueFromAmount(amount);

    return (
        <g>
            <circle className={classes.svgCircle} stroke={hue[100]} fill={hue.A400} cy={yPos} cx={xPos} />
            <circle
                className={classes.svgCircle}
                fill={'none'}
                stroke={hue[700]}
                strokeDasharray="15%, 15%"
                cy={yPos}
                cx={xPos}
            />
            <circle className={classes.svgInnerCircle} stroke={'white'} cy={yPos} cx={xPos} />
            <circle
                className={classes.svgInnerCircle}
                stroke={'black'}
                fill={'white'}
                strokeDasharray="6%"
                cy={yPos}
                cx={xPos}
            />
        </g>
    );
}

export default Chip;
