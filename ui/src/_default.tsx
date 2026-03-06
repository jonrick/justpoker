import React from 'react';

import { Theme } from '@mui/material/styles';

import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
        root: {},
    }),
);

function RENAME_ME(props) {
    const { classes } = useStyles();
    const {} = props;

    return <div className={classes.root}></div>;
}

export default RENAME_ME;
