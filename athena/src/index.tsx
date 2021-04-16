import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { blue, grey } from '@material-ui/core/colors';

import App from './App';
import './App.css';

import styles from './App.module.css';

const Theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: blue,
        secondary: grey,
    }
});

const mount = document.createElement('div');

mount.id = styles["app-mount"];

document.body.prepend(mount);

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <HelmetProvider>
                <ThemeProvider theme={Theme}>
                    <App />
                </ThemeProvider>
            </HelmetProvider>
        </BrowserRouter>
    </React.StrictMode>
    , document.getElementById(styles["app-mount"])
);
