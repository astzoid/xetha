import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import App from './App';
import ScrollToTop from './shared/components/ScrollToTop';
import Theme from './shared/styles/Theme';
import './shared/styles/App.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider theme={Theme}>
          <ScrollToTop />
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app-mount'),
);
