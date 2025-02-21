import './styles.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { BrowserRouter, Outlet } from 'react-router-dom';
import ScoreBoardRouter from './app/score-board-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Outlet />
      <ScoreBoardRouter />
    </BrowserRouter>
  </StrictMode>
);
