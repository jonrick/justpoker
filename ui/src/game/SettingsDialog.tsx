import React, { useState, useContext } from 'react';
import { ThemePreferences } from '../shared/models/ui/userPreferences';
import { ThemeSetter } from '../root/App';
import InputLabel from '@mui/material/InputLabel';
import capitalize from 'lodash/capitalize';

import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Select, MenuItem, Paper, ClickAwayListener, Checkbox } from '@mui/material';
import { Background } from '../style/colors';
import { ChromePicker } from 'react-color';

const useStyles = makeStyles()((theme: Theme) => ({
        content: {
            display: 'flex',
            flexDirection: 'row',
        },
        radioGroup: {
            display: 'flex',
            flexDirection: 'row',
        },
        field: {
            width: 200,
            margin: '0px 12px',
        },
        menuRow: {
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            width: '100%',
        },
        sample: {
            marginLeft: 'auto',
            height: '2vmin',
            width: '2vmin',
            boxShadow: theme.shadows[3],
            borderRadius: '0.4vmin',
        },
        pickerCont: {
            zIndex: 1400,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
        },
    }),
);

function SettingsDialog(props) {
    const { classes } = useStyles();
    const { open, handleClose } = props;
    const { curPrefs: curfPrefs, themeSetter } = useContext(ThemeSetter);
    const [background, SET_background] = useState(curfPrefs.backgroundColor);
    const [twoColor, SET_twoColor] = React.useState(curfPrefs.twoColor);

    const isBackgroundADefault = Object.values(Background).some((bg) => bg === background);

    const [showColorPicker, SET_showColorPicker] = React.useState(false);
    const [customColor, SET_customColor] = React.useState(isBackgroundADefault ? '#FFFFFF' : background);

    const [coloredCardBackground, SET_coloredCardBackground] = React.useState(curfPrefs.coloredCardBackground);

    function createThemePreferences(): ThemePreferences {
        const prefs = {
            twoColor,
            backgroundColor: background as any,
            coloredCardBackground,
        };
        return prefs;
    }
    const onSave = () => {
        const p = createThemePreferences();
        themeSetter(p);
        handleClose();
    };

    const onClickCustomColor = () => {
        SET_showColorPicker(true);
    };
    const onSelectColor = (event) => {
        SET_background(event.target.value);
    };

    const renderColorPicker = () => {
        return (
            <ClickAwayListener
                onClickAway={() => {
                    SET_showColorPicker(false);
                }}
            >
                <Paper className={classes.pickerCont}>
                    <ChromePicker
                        color={customColor}
                        disableAlpha
                        onChange={(color) => {
                            SET_customColor(color.hex);
                            SET_background(color.hex);
                        }}
                    />
                </Paper>
            </ClickAwayListener>
        );
    };

    const renderUserSettingsDialog = () => {
        return (
            <Dialog open={open} maxWidth="md" fullWidth>
                <DialogTitle>{`User Settings`}</DialogTitle>
                <DialogContent className={classes.content}>
                    <FormControl>
                        <FormLabel>Suit Color</FormLabel>
                        <RadioGroup
                            className={classes.radioGroup}
                            value={twoColor}
                            onChange={(_, v) => SET_twoColor(v === 'true')}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Two Color" />
                            <FormControlLabel value={false} control={<Radio />} label="Four Color" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl className={classes.field}>
                        <InputLabel>Background Color</InputLabel>
                        <Select value={background} onChange={onSelectColor}>
                            {Object.entries(Background).map(([k, v]) => (
                                <MenuItem key={k} value={v}>
                                    <div className={classes.menuRow}>
                                        {capitalize(k)}
                                        <div className={classes.sample} style={{ backgroundColor: v }} />
                                    </div>
                                </MenuItem>
                            ))}

                            <MenuItem key={'customColor'} value={customColor}>
                                <div className={classes.menuRow} onClick={onClickCustomColor}>
                                    Custom Color
                                    <div className={classes.sample} style={{ backgroundColor: customColor }} />
                                </div>
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        className={classes.field}
                        control={
                            <Checkbox
                                checked={coloredCardBackground}
                                onChange={() => SET_coloredCardBackground(!coloredCardBackground)}
                                name="coloredCardBackgroundCheckbox"
                                color="secondary"
                            />
                        }
                        label="Colored Cards"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return (
        <>
            {showColorPicker ? renderColorPicker() : null}
            {renderUserSettingsDialog()}
        </>
    );
}

export default SettingsDialog;
