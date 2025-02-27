import { Avatar, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CallBridgePlayer } from "src/app/models/call-bridge-player.model";
import { ScoreOverviewProps } from "./ScoreOverview.props";

const ScoreOverview = (props: ScoreOverviewProps): JSX.Element => {
    const { config } = props;

    const [sortedPlayers, setSortedPlayers] = useState<Array<CallBridgePlayer>>([]);
    const [highestScore, setHighestScore] = useState<number>();

    useEffect(() => {
        const sortedPlayers = [...config.Players].sort((a, b) => b.Total - a.Total);
        setSortedPlayers(sortedPlayers);
        setHighestScore(sortedPlayers[0].Total);
    }, [config])

    return (
        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
            {sortedPlayers.map((player) => {

                return (
                    <Grid item key={player.Id} xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                boxShadow: player.Total === highestScore ? "0px 4px 16px rgba(255, 223, 0, 0.8)" : "0px 2px 6px rgba(0, 0, 0, 0.1)",
                                background: player.Total === highestScore
                                    ? "linear-gradient(135deg, #FFDF00 30%, #FFD700 100%)"
                                    : "linear-gradient(135deg, #ffffff 10%, #f0f0f0 90%)",
                                borderRadius: 2,
                                border: "none",
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.2)"
                                }
                            }}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: { xs: 80, sm: 100, md: 150 },
                                        objectFit: "cover",
                                        borderTopLeftRadius: "8px",
                                        borderTopRightRadius: "8px"
                                    }}
                                    image={`./${import.meta.env.BASE_URL}/${player.Id}.jpg`}
                                    alt={player.Name}
                                />
                                <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                                    <Grid container justifyContent="space-between" alignItems="center">
                                        <Grid item xs={8}>
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                component="div"
                                                sx={{
                                                    fontSize: { xs: "16px", sm: "20px", md: "22px" },
                                                    fontWeight: "bold",
                                                    color: "#000"
                                                }}
                                            >
                                                {player.Name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "#000",
                                                    fontSize: { xs: "12px", sm: "14px", md: "16px" }
                                                }}
                                            >
                                                <b>Current Call</b>: {player.Call || "Free Call"}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={4} display="flex" justifyContent="flex-end">
                                            <Avatar
                                                sx={{
                                                    bgcolor: player.Total === highestScore ? "#faf5f5" : "#2e2d2d",
                                                    color: player.Total === highestScore ? "#000" : "#ffff",
                                                    height: { xs: 40, sm: 50 },
                                                    width: { xs: 40, sm: 50 },
                                                    fontSize: { xs: "16px", sm: "20px", md: "24px" },
                                                    fontWeight: "bold",
                                                    boxShadow: player.Total === highestScore ? "0px 2px 10px rgba(255, 223, 0, 0.6)" : "none"
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
                );
            })}
        </Grid>
    )
}

export default ScoreOverview;