import { Refresh } from "@mui/icons-material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { CallBridgeScoreBoardRootProps } from "./CallBridgeScoreBoardContainer.props";


const CallBridgeScoreBoardContainer = (props: CallBridgeScoreBoardRootProps) => {
    const { config } = props;

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
                            color="primary"
                            aria-label="menu"
                        >
                            <Tooltip title="Add round">
                                <AddBoxIcon />
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
                                            <Typography gutterBottom variant="h5" component="div">
                                                {player.Name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                <b>Current Call</b> : {player.Call ? player.Call : 'Free Call'}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CallBridgeScoreBoardContainer;