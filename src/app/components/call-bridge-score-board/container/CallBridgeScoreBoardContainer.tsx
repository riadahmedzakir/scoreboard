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
                        <Typography sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}>
                            {config?.Title}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <IconButton
                            edge="start"
                            color="default"
                            aria-label="menu"
                            onClick={() => setIsClearBoardModalOpen(true)}
                            sx={{
                                fontSize: { xs: "1rem", sm: "1.5rem" },
                                padding: { xs: "6px", sm: "12px" },
                            }}
                        >
                            <Tooltip title="Clear board">
                                <Refresh sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
                            </Tooltip>
                        </IconButton>

                        {
                            roundType == 'Call' ?
                                <IconButton
                                    edge="start"
                                    color="primary"
                                    aria-label="menu"
                                    onClick={() => setIsCreateCallModalOpen(true)}
                                    sx={{
                                        fontSize: { xs: "1rem", sm: "1.5rem" },
                                        padding: { xs: "6px", sm: "12px" },
                                    }}>
                                    <Tooltip title="Add calls for the round">
                                        <DataSaverOnIcon />
                                    </Tooltip>
                                </IconButton> :
                                <IconButton
                                    edge="start"
                                    color="warning"
                                    aria-label="menu"
                                    onClick={() => setIsFinishRoundModalOpen(true)}
                                    sx={{
                                        fontSize: { xs: "16px", sm: "24px", md: '30px' },
                                        padding: { xs: "6px", sm: "12px" },
                                    }}>
                                    <Tooltip title="Add calls for the round">
                                        <DownloadDoneIcon />
                                    </Tooltip>
                                </IconButton>
                        }

                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>

                <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                    {config.Players.map((player) => (
                        <Grid item key={player.Id} xs={12} sm={6} md={3}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            height: { xs: 80, sm: 80, md: 150 },
                                            objectFit: "cover"
                                        }}
                                        image={`./${import.meta.env.BASE_URL}/${player.Id}.jpg`}
                                        alt={player.Name}
                                    />
                                    <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                                        <Grid container justifyContent="space-between" alignItems="center">
                                            <Grid item xs={8}>
                                                <Typography
                                                    gutterBottom
                                                    variant="h6"
                                                    component="div"
                                                    sx={{ fontSize: { xs: "16px", sm: "20px", md: "24px" } }}
                                                >
                                                    {player.Name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        fontSize: { xs: "12px", sm: "14px", md: "16px" }
                                                    }}
                                                >
                                                    <b>Current Call</b>: {player.Call || 'Free Call'}
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={4} display="flex" justifyContent="flex-end">
                                                <Avatar
                                                    sx={{
                                                        bgcolor: '#ffedee',
                                                        color: '#000',
                                                        height: { xs: 40, sm: 50 }, // Smaller avatar on mobile
                                                        width: { xs: 40, sm: 50 },
                                                        fontSize: { xs: "16px", sm: "20px", md: "24px" },
                                                    }}
                                                >
                                                    {player.Total ?? 0}
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
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