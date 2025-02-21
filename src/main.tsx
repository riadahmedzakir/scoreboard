import './styles.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CallBridgeScoreBoardRoot from './app/components/call-bridge-score-board/container/CallBridgeScoreBoardRoot';
import ScoreBoardRoot from './app/components/score-board/ScoreBoardRoot';
import { SnackbarProvider } from './app/components/snack-bar/SnackBar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <SnackbarProvider>
      <BrowserRouter basename="/scoreboard">
        <Routes>
          <Route path="/" element={<ScoreBoardRoot />} />
          <Route path="/call-bridge" element={<CallBridgeScoreBoardRoot />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  </StrictMode>
);
