import { Box } from "@mui/material";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { CallBridgeBoardConfig } from "src/app/models/call-bridge-board-config.model";
import ConfirmationModal from "../../confirmation-modal/ConfirmationModal";
import EmptyState from "../../empty-state/EmptyState";
import TopBar from "../../top-bar/TopBar";
import CallBridgeCreateGame from "../create-game/CallBridgeCreateGame";
import CallBridgeScoreBoardContainer from "./CallBridgeScoreBoardContainer";

const CallBridgeScoreBoardRoot = (): JSX.Element => {
  const [config, setConfig] = useState<CallBridgeBoardConfig>(JSON.parse(localStorage.getItem('call-bridge-board-config') ?? '{}'));
  const [scores, setScores] = useState<Array<Array<FieldValues>>>(JSON.parse(localStorage.getItem('call-bridge-scores') ?? '[]'));
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);

  const handleCreateGame = (isClosed: boolean) => {
    if (isClosed) {
      setIsNewGameModalOpen(false);
      return;
    }

    const newConfig = JSON.parse(localStorage.getItem('call-bridge-board-config') ?? '{}');

    setConfig({ ...newConfig });
    setIsNewGameModalOpen(false);
  }

  const handleConfirmation = (isClosed: boolean) => {
    if (isClosed) {
      setIsConfirmationModalOpen(false);
      return;
    }

    setIsConfirmationModalOpen(false);
    setIsNewGameModalOpen(true);
  }

  const handleNewGame = () => {
    setIsConfirmationModalOpen(true);
  }

  return (
    <>
      <TopBar onNewGameClick={handleNewGame} />

      {
        config.Title ?
          <CallBridgeScoreBoardContainer config={config} scores={scores} /> :
          <Box sx={{ height: '60vh' }}>
            <EmptyState header={'Empty Game'} body={'Create a game to get started. Have FUN!!'} />
          </Box>
      }

      <CallBridgeCreateGame open={isNewGameModalOpen} onClose={handleCreateGame} />
      <ConfirmationModal open={isConfirmationModalOpen}
        headerText={'Attention!'}
        bodyText={'Are you sure you want to create a new game? This will discard any game that is in-progress.'}
        onClose={handleConfirmation} />
    </>
  );
};

export default CallBridgeScoreBoardRoot;
