import { green } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import { teal } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';
import { indigo } from '@mui/material/colors';
import { orange } from '@mui/material/colors';
import { pink } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { deepPurple } from '@mui/material/colors';
import { brown, lime } from '@mui/material/colors';
import { Suit } from '../shared/models/game/cards';
import { makeStyles } from '@mui/styles';

export const Background = {
    blue: blue[600],
    indigo: indigo[800],
    purple: deepPurple[600],
    red: red[700],
    orange: orange[600],
    yellow: yellow[700],
    green: green[700],
    brown: brown[400],
    grey: grey[500],
};

export const PlayerColors: { [color: string]: string } = {
    blue: blue[500],
    purple: deepPurple[400],
    teal: teal[300],
    yellow: yellow[300],
    indigo: indigo[400],
    red: red[400],
    green: green[400],
    orange: orange[300],
    pink: pink[300],
    brown: brown[400],
    lime: lime[400],
};

const playerColorKeys = Object.keys(PlayerColors);

export function getPlayerNameColor(seatNumber: number) {
    if (seatNumber >= 0 || seatNumber < playerColorKeys.length) {
        return PlayerColors[playerColorKeys[seatNumber]];
    } else return grey[400];
}

export const useColoredCardBackgroundStyles =  makeStyles((theme) => ({
    base: {
        color: 'rgb(242, 240, 237)',
    },
    [Suit.HEARTS]: {
        backgroundColor: theme.custom.HEARTS
    },
    [Suit.SPADES]: {
        backgroundColor: theme.custom.SPADES,
    },
    [Suit.CLUBS]: {
        backgroundColor: theme.custom.CLUBS,
    },
    [Suit.DIAMONDS]: {
        backgroundColor: theme.custom.DIAMONDS,
    },
}));

export const useWhiteCardBackgroundStyles =  makeStyles((theme) => ({
    base: {
        backgroundColor: 'rgb(242, 240, 237)',
    },
    [Suit.HEARTS]: {
        color: theme.custom.HEARTS
    },
    [Suit.SPADES]: {
        color: theme.custom.SPADES,
    },
    [Suit.CLUBS]: {
        color: theme.custom.CLUBS,
    },
    [Suit.DIAMONDS]: {
        color: theme.custom.DIAMONDS,
    },
}));

