import React from 'react';

import { Theme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    }),
);

function RENAME_ME(props) {
    const classes = useStyles();
    const {} = props;

    return <div className={classes.root}></div>;
}

export default RENAME_ME;
