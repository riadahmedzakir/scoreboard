import { Box } from "@mui/material";
import { useEffect, useState } from "react";
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
  const [roundType, setRoundType] = useState<'Call' | 'Trick'>('Trick');
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

  const handleRefresh = () => {
    const score = JSON.parse(localStorage.getItem('call-bridge-scores') ?? '[]');
    const config = JSON.parse(localStorage.getItem('call-bridge-board-config') ?? '{}');
    const total: FieldValues = calculateTotalScores(score);
    const newConfig = mapScoresToPlayers(config, total, score);

    toggleRoundType(score);

    setConfig(newConfig);
    setScores(score);
  }

  const toggleRoundType = (score: Array<Array<FieldValues>>) => {
    const roundType = score.length == 0 ? 'Trick' : score[score.length - 1]?.length == 1 ? 'Trick' : 'Call';
    setRoundType(roundType);
  }

  const mapScoresToPlayers = (gameData: CallBridgeBoardConfig, totalScores: FieldValues, score: Array<Array<FieldValues>>) => {
    const lastCall = score[score.length - 1][0];

    const updatedPlayers = gameData.Players.map((player) => ({
      ...player,
      Total: totalScores[player.Id] ?? 0,
      Call: lastCall[player.Id] ?? 0,
    }));

    return { ...gameData, Players: updatedPlayers };
  };

  const calculateTotalScores = (rounds: any) => {
    const totalScores: any = {};

    rounds.forEach((round: any, index: number) => {
      if (round.length < 2) return;

      const call = round[0];
      const gained = round[1];

      Object.keys(gained).forEach((player) => {
        const achieved = Number(gained[player]);

        if (!(player in totalScores)) { totalScores[player] = 0 };

        if (index === 0) {
          totalScores[player] += achieved;
        } else {
          const called = Number(call[player]);

          if (achieved === called || achieved === called + 1) {
            totalScores[player] += called;
          } else if (achieved === called - 1 || achieved >= called + 2) {
            totalScores[player] -= called;
          }
        }
      });
    });

    return totalScores;
  };

  useEffect(() => {
    if (scores.length) {
      const total = calculateTotalScores(scores);
      const newConfig = mapScoresToPlayers(config, total, scores);

      toggleRoundType(scores);
      setConfig(newConfig);
    }
  }, [scores]);

  return (
    <>
      <TopBar onNewGameClick={handleNewGame} />

      {
        config.Title ?
          <CallBridgeScoreBoardContainer config={config} scores={scores} refresh={handleRefresh} roundType={roundType} /> :
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
