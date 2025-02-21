import './styles.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { HashRouter, Outlet } from 'react-router-dom';
import ScoreBoardRouter from './app/score-board-router';
import { SnackbarProvider } from './app/components/snack-bar/SnackBar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <SnackbarProvider>
      <HashRouter>
        <Outlet />
        <ScoreBoardRouter />
      </HashRouter>
    </SnackbarProvider>
  </StrictMode>
);
