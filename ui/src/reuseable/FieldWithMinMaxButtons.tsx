import React from 'react';
import classnames from 'classnames';
import TextFieldWrap from './TextFieldWrap';

import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useChipFormatter } from '../game/ChipFormatter';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        amtCont: {
            display: 'flex',
            alignItems: 'stretch', // ensures both children take same height
        },
        field: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            flexGrow: 1, // field takes remaining width
        },
        minMaxButtonCont: {
            display: 'flex',
            flexDirection: 'column',
        },
        minMaxButton: {
            minWidth: 80,
            height: '100%',
            fontSize: 12.8,
            padding: '0 8px',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
        },
    }),
);

function FieldWithMinMaxButtons(props) {
    const classes = useStyles();
    const { onChange, className, min, max, ...rest } = props;
    const ChipFormatter = useChipFormatter();

    const onClickMin = (event) => {
        if (typeof onChange === 'function') {
            onChange({ target: { value: min } });
        }
    };

    const onClickMax = (event) => {
        if (typeof onChange === 'function') {
            onChange({ target: { value: max } });
        }
    };
    return (
        <div className={classnames(classes.amtCont, className)}>
            <TextFieldWrap
                className={classes.field}
                variant="filled"
                onChange={onChange}
                min={min}
                max={max}
                type="number"
                chipsField
                {...rest}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    className: classes.field,
                }}
            />
            <ButtonGroup orientation="vertical" variant="contained" className={classes.minMaxButtonCont}>
                <Button className={classes.minMaxButton} onClick={onClickMax}>{`Max ${ChipFormatter(max)}`}</Button>
                <Button className={classes.minMaxButton} onClick={onClickMin}>{`Min ${ChipFormatter(min)}`}</Button>
            </ButtonGroup>
        </div>
    );
}

export default FieldWithMinMaxButtons;
