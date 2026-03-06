import React, { ReactElement } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export interface SimpleDialogProps {
    open: boolean;
    nullWhenClosed?: boolean;
    title: string;
    contextText?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    contentComponent?: ReactElement;
}

function ConfirmationDialog(props: SimpleDialogProps) {
    const { onCancel, onConfirm, contextText, title, open, nullWhenClosed, contentComponent } = props;

    if (!open && nullWhenClosed) return null;
    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {contentComponent ? contentComponent : null}
                {contextText ? <DialogContentText>{contextText}</DialogContentText> : null}
            </DialogContent>
            <DialogActions>
                {onCancel ? <Button onClick={onCancel}>Cancel</Button> : null}
                {onConfirm ? (
                    <Button onClick={onConfirm} color="primary">
                        Confirm
                    </Button>
                ) : null}
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;
