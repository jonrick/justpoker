import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardSmall from './CardSmall';
import classnames from 'classnames';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
    folded: {
        opacity: 0,
        transition: 'opacity 0.1s ease-in-out',
    },
    heroCard: {
        transform: 'scale(1.25)',
    },
}));

function Hand(props) {
    const classes = useStyles();
    const { hand, hero, className } = props;
    const { cards } = hand;

    return (
        <div className={classnames(classes.root, className, { [classes.heroCard]: hero })}>
            {cards.map((c, i) => (
                <CardSmall
                    {...c}
                    size="small"
                    className={`ani_playerCard_${i}`}
                    shouldFlex={cards.length > 2}
                    hero={hero}
                />
            ))}
        </div>
    );
}

export default Hand;
