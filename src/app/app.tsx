// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './style.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import ConfirmationModal from './components/confirmation-modal/ConfirmationModal';
import CreateGame from './components/create-game/CreateGame';
import EmptyState from './components/empty-state/EmptyState';
import ScoreBoardContainer from './components/score-board/ScoreBoardContainer';
import TopBar from './components/top-bar/TopBar';
import { BoardConfig } from './models/board-config.model';


const App = (): JSX.Element => {
  const queryClient = new QueryClient();

  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [config, setConfig] = useState<BoardConfig>(JSON.parse(localStorage.getItem('board-config') ?? '{}'));

  const handleNewGame = () => {
    setIsConfirmationModalOpen(true);
  }

  const handleCreateGame = (isClosed: boolean) => {
    if (isClosed) {
      setIsNewGameModalOpen(false);
      return;
    }

    const newConfig = JSON.parse(localStorage.getItem('board-config') ?? '{}');

    setConfig({ ...newConfig });
    setIsNewGameModalOpen(false);
    handleRefresh();
  }

  const handleConfirmation = (isClosed: boolean) => {
    if (isClosed) {
      setIsConfirmationModalOpen(false);
      return;
    }

    setIsConfirmationModalOpen(false);
    setIsNewGameModalOpen(true);
  }

  const handleRefresh = () => {
    const newConfig: BoardConfig = JSON.parse(localStorage.getItem('board-config') ?? '{}');

    setConfig(newConfig);
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TopBar onNewGameClick={handleNewGame} />

        {
          config.Title ?
            <ScoreBoardContainer config={config} refresh={handleRefresh} /> :
            <Box sx={{ height: '60vh' }}>
              <EmptyState header={'Empty Game'} body={'Create a game to get started. Have FUN!!'} />
            </Box>
        }

        <CreateGame open={isNewGameModalOpen} onClose={handleCreateGame} />

        <ConfirmationModal open={isConfirmationModalOpen}
          headerText={'Attention!'}
          bodyText={'Are you sure you want to create a new game? This will discard any game that is in-progress.'}
          onClose={handleConfirmation} />
      </QueryClientProvider >
    </>
  );
}

export default App;
