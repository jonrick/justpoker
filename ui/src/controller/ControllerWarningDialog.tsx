import React from 'react';

import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles()((theme: Theme) => ({
        text: {
            marginBottom: 24,
        },
    }),
);

// warning dialog to use which appears when they are making unnecessary fold
function ControllerWarningDialog(props) {
    const { classes } = useStyles();
    const { open, handleClose, onConfirm } = props;

    function onPressEnter(event: any) {
        if (event.key === 'Enter') {
            event.preventDefault();
            onConfirm();
        }
    }

    return (
        <Dialog open={open} maxWidth="sm" fullWidth onKeyPress={(event) => onPressEnter(event)}>
            <DialogTitle>{`Confirm Fold`}</DialogTitle>
            <DialogContent>
                <Typography className={classes.text}>
                    This is an unnecessary fold. Currently, you can stay in the hand at no cost by checking.
                </Typography>
                <Typography className={classes.text}>Are you sure?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onConfirm} color="primary">
                    Fold
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ControllerWarningDialog.displayName = 'ControllerWarningDialog';

export default ControllerWarningDialog;
