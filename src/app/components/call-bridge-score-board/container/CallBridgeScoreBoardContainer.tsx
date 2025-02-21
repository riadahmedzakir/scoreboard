import { Refresh } from "@mui/icons-material";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { Avatar, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import EmptyState from "../../empty-state/EmptyState";
import CreateCall from "../create-call/CreateCall";
import FinishRound from "../finish-round/FinishRound";
import CallBridgeBoard from "./CallBridgeBoard";
import { CallBridgeScoreBoardRootProps } from "./CallBridgeScoreBoardContainer.props";
import ConfirmationModal from "../../confirmation-modal/ConfirmationModal";

const CallBridgeScoreBoardContainer = (props: CallBridgeScoreBoardRootProps) => {
    const { config, scores, refresh, roundType } = props;

    const [isFinishRoundModalOpen, setIsFinishRoundModalOpen] = useState<boolean>(false);
    const [isCreateCallModalOpen, setIsCreateCallModalOpen] = useState<boolean>(false);
    const [isClearBoardModalOpen, setIsClearBoardModalOpen] = useState<boolean>(false);

    const handleFinishRound = (isClosed: boolean) => {
        if (isClosed) {
            setIsFinishRoundModalOpen(false);
            return;
        }

        refresh();
        setIsFinishRoundModalOpen(false);
    }

    const handleCreateCall = (isClosed: boolean) => {
        if (isClosed) {
            setIsCreateCallModalOpen(false);
            return;
        }

        refresh();
        setIsCreateCallModalOpen(false);
    }

    const handleClearBoardClose = (isClosed: boolean) => {
        if (isClosed) {
            setIsClearBoardModalOpen(false);
            return;
        }

        setIsClearBoardModalOpen(false);
        localStorage.removeItem('call-bridge-scores');
        refresh();
    }

    return (
        <Grid container sx={{ p: 2 }}>
            <Grid item xs={12}>
                <Grid container justifyContent={"space-between"} alignContent={"center"}>
                    <Grid item>
                        <Typography variant="h4">
                            {config?.Title}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <IconButton
                            size="large"
                            edge="start"
                            color="default"
                            aria-label="menu"
                            onClick={() => setIsClearBoardModalOpen(true)}
                        >
                            <Tooltip title="Clear board">
                                <Refresh />
                            </Tooltip>
                        </IconButton>

                        {
                            roundType == 'Call' ?
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="info"
                                    aria-label="menu"
                                    onClick={() => { setIsCreateCallModalOpen(true) }}
                                >
                                    <Tooltip title="Add calls for the round">
                                        <DataSaverOnIcon />
                                    </Tooltip>
                                </IconButton> :
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="warning"
                                    aria-label="menu"
                                    onClick={() => { setIsFinishRoundModalOpen(true) }}
                                >
                                    <Tooltip title="Finsh the round">
                                        <DownloadDoneIcon />
                                    </Tooltip>
                                </IconButton>
                        }

                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>

                <Grid container justifyContent={'space-between'} alignItems={'center'} spacing={'10px'} sx={{ mt: 2 }}>
                    {
                        config.Players.map(player =>
                            <Grid item key={player.Id} xs={3}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={`./${player.Id}.jpg`}
                                        />

                                        <CardContent>
                                            <Grid container justifyContent={'space-between'} alignItems={'center'}>
                                                <Grid item xs={10}>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {player.Name}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                        <b>Current Call</b> : {player.Call ? player.Call : 'Free Call'}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Avatar
                                                        children={player.Total ?? 0}
                                                        variant="circular"
                                                        sx={{ bgcolor: `#ffedee`, color: '#000', height: '50px', width: '50px', fontSize: '28px' }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    }
                </Grid>

                {
                    scores.length ?
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <CallBridgeBoard config={config} scores={scores} />
                        </Grid> :
                        <Grid item xs={12} sx={{ height: '50vh' }}>
                            <EmptyState header={'Empty Scoreboard'} body={'Still no round played. Play some round and get started with the scoreboard'} />
                        </Grid>
                }

            </Grid>

            <CreateCall open={isCreateCallModalOpen} onClose={handleCreateCall} config={config} />
            <FinishRound open={isFinishRoundModalOpen} onClose={handleFinishRound} config={config} />
            <ConfirmationModal open={isClearBoardModalOpen} headerText={'Attention!'} bodyText={'Are you sure you want to reset scores?. Confirming will reset the scores and start a new game with same configurations'} onClose={handleClearBoardClose} />
        </Grid>
    );
};

export default CallBridgeScoreBoardContainer;