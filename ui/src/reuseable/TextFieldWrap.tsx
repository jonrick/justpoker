import React from 'react';
import TextField from '@mui/material/TextField';
import { NumericFormat } from 'react-number-format';
import { useSelector } from 'react-redux';
import { selectUseCents } from '../store/selectors';

function TextFieldWrap(props) {
    const {
        onChange,
        type,
        min,
        max,
        minStrict,
        maxStrict = true,
        maxChars = 250,
        chipsField,
        divideBy100,
        InputProps,
        ...rest
    } = props;

    const useCents = useSelector(selectUseCents);

    function getReturnValue(current) {
        if (current.length > maxChars) {
            return current.substring(0, current.length - 1);
        }
        if (type === 'number') {
            if (current === '') {
                return 0;
            }
            let val = parseFloat(current);
            if (Number.isNaN(val) || val <= 0) {
                return 0;
            } else {
                if (useCents || divideBy100) {
                    val = Math.round(val * 100);
                }
                if (!Number.isNaN(max) && maxStrict) {
                    val = Math.min(val, max);
                }
                if (!Number.isNaN(min) && minStrict) {
                    val = Math.max(val, min);
                }
                return val;
            }
        }
        return current;
    }
    const onChangeWrap = (event) => {
        const current = event.target.value;
        const returnVal = getReturnValue(current);

        if (typeof onChange === 'function') {
            onChange({ target: { value: returnVal } });
        }
    };

    function getRenderValue() {
        const value = props.value;
        if (type === 'number') {
            if (value === 0 || value === undefined || value === null) {
                return '';
            }
            if (useCents || divideBy100) {
                return (value / 100).toString();
            }
        }
        return value;
    }

    return (
        <TextField
            variant="outlined"
            {...rest}
            onChange={onChangeWrap}
            value={getRenderValue()}
            type="text"
            InputProps={
                (chipsField && useCents) || divideBy100
                    ? {
                          inputComponent: DivideBy100Formatter as any,
                          ...InputProps,
                          inputProps: {
                              max: max,
                              maxStrict: maxStrict,
                          },
                      }
                    : { ...InputProps }
            }
        />
    );
}

const DivideBy100Formatter = React.forwardRef(function DivideBy100Formatter(props: any, ref) {
    const { onChange, max, maxStrict, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            valueIsNumericString
            thousandSeparator=","
            decimalScale={2}
            fixedDecimalScale
            type="tel"
        />
    );
});

export default TextFieldWrap;
