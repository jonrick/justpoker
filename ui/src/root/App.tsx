import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemePreferences, UserPreferences } from '../shared/models/ui/userPreferences';
import cloneDeep from 'lodash/cloneDeep';
import { CUSTOM_THEME, DEFAULT_PREFERENCES } from '../style/Theme';
import { ThemeProvider } from '@mui/styles';
import { ThemeProvider as MuiThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import GameContainer from '../game/GameContainer';
import { createTheme } from '@mui/material/styles';

import Home from './Home';
const Ledger = React.lazy(() => import('../ledger/Ledger'));
import ErrorBoundary from './ErrorBoundry';
import Color from 'color';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const USER_PREFS_LOCAL_STORAGE_KEY = 'jp-user-prefs';

function loadPreferencesIntoTheme(curTheme, prefs: ThemePreferences) {
    const newTheme = cloneDeep(curTheme);
    newTheme.custom.BACKGROUND.backgroundColor = prefs.backgroundColor;
    if (Color(prefs.backgroundColor).isDark()) {
        newTheme.custom.BACKGROUND_CONTRAST_COLOR = 'white';
    } else {
        newTheme.custom.BACKGROUND_CONTRAST_COLOR = 'black';
    }

    if (prefs.twoColor) {
        newTheme.custom.DIAMONDS = newTheme.custom.HEARTS as any;
        newTheme.custom.CLUBS = newTheme.custom.SPADES as any;
    } else {
        newTheme.custom.DIAMONDS = CUSTOM_THEME.custom.DIAMONDS as any;
        newTheme.custom.CLUBS = CUSTOM_THEME.custom.CLUBS as any;
    }
    return newTheme;
}

export const ThemeSetter = React.createContext({
    curPrefs: DEFAULT_PREFERENCES.theme,
    themeSetter: (tp: ThemePreferences) => null,
});

function loadInitUserPreferences(): UserPreferences {
    const cachedPrefs = localStorage.getItem(USER_PREFS_LOCAL_STORAGE_KEY);
    if (cachedPrefs) return JSON.parse(cachedPrefs);
    return DEFAULT_PREFERENCES;
}

const initPrefs = loadInitUserPreferences();
const initTheme = loadPreferencesIntoTheme(CUSTOM_THEME, initPrefs.theme);

function App() {
    const [theme, setTheme] = useState(initTheme);
    const [pref, setPrefs] = useState(initPrefs.theme);

    function setNewTheme(tp: ThemePreferences) {
        setPrefs(tp);
        localStorage.setItem(USER_PREFS_LOCAL_STORAGE_KEY, JSON.stringify({ theme: tp }));
        setTheme((oldTheme) => loadPreferencesIntoTheme(oldTheme, tp));
        return null;
    }

    const v5Theme = createTheme(theme);

    return (
        <ErrorBoundary>
            <ThemeSetter.Provider value={{ curPrefs: pref, themeSetter: setNewTheme }}>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={v5Theme}>
                        <MuiThemeProvider theme={v5Theme}>
                            <Router>
                                <Routes>
                                    <Route path="/table/test" element={<GameContainer useTestGame />} />
                                    <Route path="/table/:gameInstanceUUID" element={<GameContainer />} />
                                    <Route path="/ledger/:gameInstanceUUID" element={<Suspense fallback={<div>Loading...</div>}><Ledger /></Suspense>} />
                                    <Route path="/" element={<Home />} />
                                </Routes>
                            </Router>
                        </MuiThemeProvider>
                    </ThemeProvider>
                </StyledEngineProvider>
            </ThemeSetter.Provider>
        </ErrorBoundary>
    );
}

export default App;
