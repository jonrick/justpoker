import React from 'react';
import classnames from 'classnames';

import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { ReactComponent as LogoA } from '../assets/logo/landingLogoA.svg';
import { ReactComponent as LogoB } from '../assets/logo/landingLogoB.svg';
import { genRandomInt } from '../shared/util/util';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        svg: {
            // filter: `drop-shadow(0px 0px 3px rgba(0, 0, 0, .7))`,
        },
        use: {},
    }),
);

function LandingLogo(props) {
    const classes = useStyles();
    const { className } = props;

    return genRandomInt(0, 1) === 1 ? (
        <LogoA className={classnames(classes.svg, className)} />
    ) : (
        <LogoB className={classnames(classes.svg, className)} />
    );
}

export default LandingLogo;
