import React, { useEffect } from 'react';
import classnames from 'classnames';
import Bet from './Bet';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { animateAwardPot } from '../game/AnimiationModule';

const useStyles = makeStyles()((theme: Theme) => ({
        root: {
            zIndex: 5,
            margin: '2vmin',
        },
    }),
);

function PotAward(props) {
    const { classes } = useStyles();
    const { index, awardPot } = props;
    const { winnerUUID, value } = awardPot;
    const potId = `ani_awardPot_${index}`;
    useEffect(() => {
        animateAwardPot(winnerUUID, potId);
    }, [winnerUUID, potId]);

    return <Bet className={classnames(classes.root)} amount={value} id={potId} />;
}

export default PotAward;
