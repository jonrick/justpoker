import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TextField, Typography } from '@mui/material';
import { sendMail } from '../api/http';
import { EmailMessage } from '../shared/models/system/email';
import { useClientIp } from '../utils';

const useStyles = makeStyles()({
    dialog: {
        width: '60vw',
        height: '60vh',
    },
    field: {
        width: '100%',
        marginBottom: 24,
    },
});

function EmailDialog(props) {
    const { classes } = useStyles();
    const { onClose, open } = props;
    const [msgType, SET_msgType] = useState('');
    const [body, SET_body] = useState('');
    const [email, SET_email] = useState('');
    const clientIp = useClientIp();

    const [mailResponse, SET_mailResponse] = useState('none');

    function canSend() {
        return body !== '' && msgType !== '';
    }

    function onCancel() {
        onClose();
    }

    function onMailSuccess() {
        SET_mailResponse('success');
    }

    function onMailFailure() {
        SET_mailResponse('failure');
    }

    function onConfirm() {
        const message: EmailMessage = {
            email: email,
            body: body,
            subject: msgType,
            metadata: {
                ip: clientIp,
                date: new Date().toUTCString(),
            },
        };
        sendMail(message, onMailSuccess, onMailFailure);
    }

    function generateMailResponse() {
        switch (mailResponse) {
            case 'none':
                return null;
            case 'success':
                return <Typography>Thank you for your message :)</Typography>;
            case 'failure':
                return <Typography>Could not send message, please try again later</Typography>;

            default:
                return null;
        }
    }

    function generateMailInput() {
        return (
            <>
                <FormControl className={classes.field}>
                    <InputLabel>Subject</InputLabel>
                    <Select value={msgType} onChange={(event) => SET_msgType(event.target.value as string)}>
                        <MenuItem value={'Bug'}>Bug</MenuItem>
                        <MenuItem value={'Feature Request'}>Feature Request</MenuItem>
                        <MenuItem value={'Friendly Message'}>Friendly Message :)</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Your Email"
                    className={classes.field}
                    value={email}
                    onChange={(event) => SET_email(event.target.value)}
                    placeholder="If you want a response..."
                    variant="filled"
                />
                <TextField
                    label="Body"
                    className={classes.field}
                    multiline
                    value={body}
                    onChange={(event) => SET_body(event.target.value)}
                    rows={8}
                    placeholder="Your message..."
                    variant="filled"
                />
            </>
        );
    }

    if (!open) return null;
    return (
        <Dialog open={open} maxWidth={false}>
            <DialogTitle>Feedback</DialogTitle>
            <DialogContent className={classes.dialog}>
                {mailResponse === 'none' ? generateMailInput() : generateMailResponse()}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Close</Button>
                {mailResponse === 'none' ? (
                    <Button onClick={onConfirm} color="primary" disabled={!canSend()}>
                        Send
                    </Button>
                ) : null}
            </DialogActions>
        </Dialog>
    );
}

export default EmailDialog;
