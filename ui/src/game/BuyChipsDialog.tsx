import React, { useState } from 'react';
import FieldWithMinMaxButtons from '../reuseable/FieldWithMinMaxButtons';
import { selectGameParameters, globalGameStateSelector, heroPlayerUUIDSelector } from '../store/selectors';
import { useSelector } from 'react-redux';

import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { Typography } from '@mui/material';

import { WsServer } from '../api/ws';
import { useChipFormatter } from './ChipFormatter';

const useStyles = makeStyles()((theme: Theme) => ({
        content: {},
        amtCont: {
            display: 'flex',
        },
        field: {
            marginBottom: 24,
        },
        minMaxButtonCont: {
            display: 'flex',
            flexDirection: 'column',
        },
        minMaxButton: {
            width: 150,
        },
        note: {
            marginTop: 12,
            fontSize: 12,
        },
    }),
);

function BuyChipsDialog(props) {
    const { classes } = useStyles();
    const { open, handleBuy, handleCancel } = props;

    const { heroTotalChips, isHeroInHand, computedMaxBuyin } = useSelector(globalGameStateSelector);
    const { minBuyin } = useSelector(selectGameParameters);
    const heroPlayerUUID = useSelector(heroPlayerUUIDSelector);
    const [chipAmt, SET_ChipAmt] = useState(computeMax());
    const ChipFormatter = useChipFormatter();

    function onSubmit() {
        WsServer.sendBuyChipsMessage(heroPlayerUUID, chipAmt);
        handleBuy();
    }

    function computeMax() {
        return Math.max(computedMaxBuyin - heroTotalChips, 0);
    }

    function computeMin() {
        return Math.max(minBuyin - heroTotalChips, 0);
    }

    function validBuy() {
        return chipAmt >= computeMin() && chipAmt <= computeMax() && chipAmt !== 0;
    }

    function onPressEnter(event: any) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (validBuy()) onSubmit();
        }
    }

    if (!open) return null;

    return (
        <Dialog open={open} maxWidth="sm" fullWidth onKeyPress={(event) => onPressEnter(event)}>
            <DialogTitle>{`Buy Chips`}</DialogTitle>
            <DialogContent className={classes.content}>
                <FieldWithMinMaxButtons
                    className={classes.field}
                    label="Amount"
                    onChange={(event) => SET_ChipAmt(event.target.value)}
                    value={chipAmt}
                    min={computeMin()}
                    max={computeMax()}
                    type="number"
                    autoFocus
                />
                <Typography>{`Current Chips: ${ChipFormatter(heroTotalChips)}`}</Typography>
                {isHeroInHand ? (
                    <Typography className={classes.note}>
                        You are currently particpating in a hand. The chips will be added to your stack upon completion.
                        If you win the hand, chips will be added up to the amount indicated, but not exceeding the
                        maximum buyin.
                    </Typography>
                ) : null}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={onSubmit} color="primary" disabled={!validBuy()}>
                    Buy
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default BuyChipsDialog;
