import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import classnames from 'classnames';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Popper from '@mui/material/Popper';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {},
        popper: {
            zIndex: 10,
        },
    }),
);

export default function EmojiPicker(props) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const { placement = 'top', className, ...rest } = props;
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => !prev);
    };
    const handleClickAway = (event) => {
        setOpen(false);
    };

    return (
        <>
            <IconButton
                className={classnames(classes.button, className)}
                onClick={handleClick}
                size="large">
                <EmojiEmotionsIcon />
            </IconButton>
            <Popper open={open} anchorEl={anchorEl} placement={placement} className={classes.popper}>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Picker {...rest} theme="dark" showPreview={false} showSkinTones={false} />
                </ClickAwayListener>
            </Popper>
        </>
    );
}
