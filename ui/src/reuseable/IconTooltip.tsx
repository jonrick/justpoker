import React from 'react';

import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Help';

const useStyles = makeStyles()((theme: Theme) => ({
        icon: {
            cursor: 'help',
        },
    }),
);

function IconTooltip(props) {
    const { classes } = useStyles();
    const { icon, ...rest } = props;

    return <Tooltip {...rest}>{icon ? icon : <InfoIcon className={classes.icon} />}</Tooltip>;
}

export default IconTooltip;
