import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemePreferences, DEFAULT_PREFERENCES } from './shared/models/userPreferences';
import cloneDeep from 'lodash/cloneDeep';
import { CUSTOM_THEME } from './Theme';
import { ThemeProvider } from '@material-ui/core/styles';
import GameContainer from './GameContainer';
import { createMuiTheme, Theme } from '@material-ui/core/styles';

import Home from './Home';

function loadPreferencesIntoTheme(curTheme, prefs: ThemePreferences) {
    const newTheme = cloneDeep(curTheme);
    newTheme.custom.BACKGROUND.background = prefs.background;

    if (prefs.twoColor) {
        newTheme.custom.DIAMONDS = newTheme.custom.HEARTS as any;
        newTheme.custom.CLUBS = newTheme.custom.SPADES as any;
    } else {
        newTheme.custom.DIAMONDS = CUSTOM_THEME.custom.DIAMONDS as any;
        newTheme.custom.CLUBS = CUSTOM_THEME.custom.CLUBS as any;
    }
    return newTheme;
}
export const ThemeSetter = React.createContext({ curTheme: CUSTOM_THEME, themeSetter: (tp: ThemePreferences) => null });

const initTheme = loadPreferencesIntoTheme(CUSTOM_THEME, DEFAULT_PREFERENCES.theme);
function App() {
    const [theme, setTheme] = useState(initTheme);

    function setNewTheme(tp: ThemePreferences) {
        setTheme((oldTheme) => loadPreferencesIntoTheme(oldTheme, tp));
        return null;
    }

    return (
        <ThemeSetter.Provider value={{ curTheme: theme, themeSetter: setNewTheme }}>
            <ThemeProvider theme={createMuiTheme(theme)}>
                <Router>
                    <Switch>
                        <Route exact path="/game/test" render={(props) => <GameContainer useTestGame />} />
                        <Route path="/game" component={GameContainer} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </ThemeSetter.Provider>
    );
}

export default App;
