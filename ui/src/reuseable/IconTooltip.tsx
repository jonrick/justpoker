import React from 'react';

import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Help';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            cursor: 'help',
        },
    }),
);

function IconTooltip(props) {
    const classes = useStyles();
    const { icon, ...rest } = props;

    return <Tooltip {...rest}>{icon ? icon : <InfoIcon className={classes.icon} />}</Tooltip>;
}

export default IconTooltip;
