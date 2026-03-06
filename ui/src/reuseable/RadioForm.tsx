import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function RadioForm(props) {
    const { className, value, label, onChange, options, radioGroupProps } = props;

    return (
        <FormControl className={className} component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup value={value} onChange={onChange} {...radioGroupProps}>
                {options.map((option, index) => (
                    <FormControlLabel
                        key={option.label + index}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                        {...option.props}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}

export default RadioForm;
