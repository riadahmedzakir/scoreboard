import { Refresh } from "@mui/icons-material";
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Avatar, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import CreateCall from "../create-call/CreateCall";
import FinishRound from "../finish-round/FinishRound";
import { CallBridgeScoreBoardRootProps } from "./CallBridgeScoreBoardContainer.props";
import CallBridgeBoard from "./CallBridgeBoard";

const CallBridgeScoreBoardContainer = (props: CallBridgeScoreBoardRootProps) => {
    const { config, scores } = props;

    const [isFinishRoundModalOpen, setIsFinishRoundModalOpen] = useState<boolean>(false);
    const [isCreateCallModalOpen, setIsCreateCallModalOpen] = useState<boolean>(false);

    const handleFinishRound = (isClosed: boolean) => {
        if (isClosed) {
            setIsFinishRoundModalOpen(false);
            return;
        }

        setIsFinishRoundModalOpen(false);
    }

    const handleCreateCall = (isClosed: boolean) => {
        if (isClosed) {
            setIsCreateCallModalOpen(false);
            return;
        }

        setIsCreateCallModalOpen(false);
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
                        >
                            <Tooltip title="Clear board">
                                <Refresh />
                            </Tooltip>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="start"
                            color="success"
                            aria-label="menu"
                        >
                            <Tooltip title="Modify players">
                                <ManageAccountsIcon />
                            </Tooltip>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="start"
                            color="info"
                            aria-label="menu"
                            onClick={() => { setIsCreateCallModalOpen(true) }}
                        >
                            <Tooltip title="Add calls for the round">
                                <PersonAddAltIcon />
                            </Tooltip>
                        </IconButton>

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
                                            image={`${player.Id}.jpg`}
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

                <Grid item xs={12} sx={{ mt: 3 }}>
                    <CallBridgeBoard config={config} scores={scores} />
                </Grid>
            </Grid>

            <CreateCall open={isCreateCallModalOpen} onClose={handleCreateCall} config={config} />
            <FinishRound open={isFinishRoundModalOpen} onClose={handleFinishRound} config={config} />
        </Grid>
    );
};

export default CallBridgeScoreBoardContainer;