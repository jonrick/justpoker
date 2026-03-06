import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './root/App';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/rootReducer';

import './fonts/Avenir.otf';
import './fonts/Futura.ttf';
import './fonts/FuturaBold.ttf';
import './fonts/FuturaItalic.ttf';

export const store = createStore(rootReducer);

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

