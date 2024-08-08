import { Share } from '@mui/icons-material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { Player } from 'src/app/models/player.model';
import CreateRound from "../create-round/CreateRound";
import EmptyState from '../empty-state/EmptyState';
import ListPlayer from '../list-player/ListPlayer';
import ModifyPlayers from '../modify-player/ModifyPlayers';
import PlayerMilestone from '../player-milestone/PlayerMilestone';
import PlayerStatus from './../../enums/player-status.enum';
import ScoreBoard from './ScoreBoard';
import { ScoreBoardContainerProps } from "./ScoreBoardContainer.props";
import ScoreShareModal from './ScoreShareModal';

const ScoreBoardContainer = (props: ScoreBoardContainerProps): JSX.Element => {
    const { config, refresh } = props;

    const [isNewRoundModalOpen, setIsNewRoundModalOpen] = useState<boolean>(false);
    const [isAddNewPlayerModalOpen, setIsAddNewPlayerModalOpen] = useState<boolean>(false);
    const [isScoreShareModalOpen, setIsScoreShareModalOpen] = useState<boolean>(false);
    const [scores, setScores] = useState<Array<FieldValues>>(JSON.parse(localStorage.getItem('scores') ?? '[]'));
    const [total, setTotal] = useState<FieldValues>({});
    const [players, setPlayers] = useState<Array<Player>>(config.Players);

    const handleCreateRound = (isClosed: boolean) => {
        if (isClosed) {
            setIsNewRoundModalOpen(false);
            return;
        }

        const newScores = JSON.parse(localStorage.getItem('scores') ?? '[]');

        setScores(newScores);
        setIsNewRoundModalOpen(false);
    }

    const handleModifyPlayer = (isClosed: boolean) => {
        if (isClosed) {
            setIsAddNewPlayerModalOpen(false);
            return;
        }

        setIsAddNewPlayerModalOpen(false);
        refresh();
    }

    const handleScoreShareModalClose = () => {
        setIsScoreShareModalOpen(prev => !prev);
    }

    const sortPlayers = () => {
        const playerKeys = Object.keys(scores[0]);

        const orderMap: { [key: string]: number } = config.Players.reduce((acc, item) => {
            acc[item.Id] = item.Order;
            return acc;
        }, {} as { [key: string]: number });

        return playerKeys.sort((a, b) => {
            const aOrder = orderMap[a] !== undefined ? orderMap[a] : Infinity;
            const bOrder = orderMap[b] !== undefined ? orderMap[b] : Infinity;
            return aOrder - bOrder;
        });
    }

    const calculateTotal = () => {
        const total: FieldValues = {};
        const playerKeys = sortPlayers();

        scores.forEach(obj => {
            playerKeys.forEach(key => {
                total[key] = (total[key] || 0) + parseInt(obj[key], 10);
            });
        });


        playerKeys.forEach(key => {
            config.Players.forEach(player => {
                if (player.Id === key) {
                    if (total[key] < 100) {
                        player.Status = PlayerStatus.BelowMaxPoint
                    }

                    if (total[key] === 100) {
                        player.Status = PlayerStatus.MaxPoint
                    }

                    if (total[key] > 100) {
                        player.Status = PlayerStatus.AboveMaxPoint
                    }
                }
            });
        });

        localStorage.setItem('board-config', JSON.stringify(config));

        setPlayers([...config.Players]);
        setTotal(total);
    }

    useEffect(() => {
        if (scores.length) {
            calculateTotal();
        }
    }, [scores]);

    useEffect(() => {
        const newScores = JSON.parse(localStorage.getItem('scores') ?? '[]');

        setPlayers([...config.Players]);
        setScores(newScores);
    }, [config]);

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
                            onClick={handleScoreShareModalClose}
                        >
                            <Tooltip title="Share current board">
                                <Share />
                            </Tooltip>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="start"
                            color="success"
                            aria-label="menu"
                            onClick={() => setIsAddNewPlayerModalOpen(true)}
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
                            onClick={() => setIsNewRoundModalOpen(true)}
                        >
                            <Tooltip title="Add round">
                                <AddBoxIcon />
                            </Tooltip>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
                <Divider />
            </Grid>

            <Grid item xs={12}>
                <Grid container alignItems={'center'}>
                    <Grid item xs={3}>
                        <Typography variant='subtitle2'>
                            Player list
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <ListPlayer players={players} refresh={refresh} />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                {
                    scores.length ?
                        <PlayerMilestone items={total} maxPoint={config.MaxPoint} players={players} />
                        : <></>
                }
            </Grid>

            {
                scores.length ?
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <ScoreBoard scores={scores} config={config} total={total} refresh={refresh} />
                    </Grid> :
                    <Grid item xs={12} sx={{ height: '50vh' }}>
                        <EmptyState header={'Empty Scoreboard'} body={'Still no round played. Play some round and get started with the scoreboard'} />
                    </Grid>
            }

            <CreateRound players={config.Players} open={isNewRoundModalOpen} onClose={handleCreateRound} total={total} />
            <ModifyPlayers open={isAddNewPlayerModalOpen} onClose={handleModifyPlayer} />
            <ScoreShareModal open={isScoreShareModalOpen} onClose={handleScoreShareModalClose} scores={scores} config={config} />
        </Grid >
    );
}

export default ScoreBoardContainer;
