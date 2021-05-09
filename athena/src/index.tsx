import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue, grey } from '@material-ui/core/colors';

import App from './App';
import ScrollToTop from './components/ScrollToTop';
import './styles/App.css';

const Theme = createMuiTheme({
    palette: {
        common: {
            black: '#101010',
            white: '#f5f5f5',
        },
        type: 'dark',
        primary: blue,
        secondary: grey,
        text: {
            primary: '#f5f5f5',
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <ThemeProvider theme={Theme}>
                    <ScrollToTop />
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById('app-mount'),
);
