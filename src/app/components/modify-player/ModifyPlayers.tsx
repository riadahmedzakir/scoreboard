import { Close, Done, LibraryAdd } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputAdornment, InputLabel, Menu, MenuItem, OutlinedInput, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { BoardConfig } from "src/app/models/board-config.model";
import { ModifyPlayersProps } from "./ModifyPlayers.props";
import { Player } from "src/app/models/player.model";
import PlayerStatus from "./../../enums/player-status.enum";

const ModifyPlayers = (props: ModifyPlayersProps): JSX.Element => {
    const { onClose, open } = props;

    const [numberOfPlayers, setNumberOfPlayers] = useState<Array<{ id: number, label: string, name: string }>>([]);
    const [addMultiplePlayerAnchor, setAddMultiplePlayerAnchor] = useState<null | HTMLElement>(null);
    const [isAddMultiplePlayerMenuOpen, setIsAddMultiplePlayerMenuOpen] = useState<boolean>(false);

    const { register, handleSubmit, reset, resetField, getValues, setValue, unregister, formState: { isDirty, isValid } } = useForm({
        mode: 'all',
        shouldUnregister: true
    });

    const handleClose = (isClosed: boolean) => {
        onClose(isClosed);
    };

    const handleAddMultiplePlayerMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAddMultiplePlayerAnchor(event.currentTarget);
        setIsAddMultiplePlayerMenuOpen(true);
    }

    const handleAddMultiplePlayerMenuClose = () => {
        setAddMultiplePlayerAnchor(null);
        setIsAddMultiplePlayerMenuOpen(false);
        resetField('numberOfPlayersToAdd');
    }

    const handleAddPlayer = () => {
        setNumberOfPlayers(prev => {
            const playerId = prev.reduce((maxObj, currentObj) => {
                return currentObj.id > maxObj.id ? currentObj : maxObj;
            }).id + 2;

            const newPlayer = { id: playerId, label: `Name - Player`, name: `playerName${playerId}` };

            return [...prev, newPlayer];
        });
    }

    const handleAddMultiplePlayer = () => {
        setNumberOfPlayers(prev => {
            const newPlayerCount = getValues()['numberOfPlayersToAdd'] as number;

            let playerId = prev.reduce((maxObj, currentObj) => {
                return currentObj.id > maxObj.id ? currentObj : maxObj;
            }).id + 1;

            const newPlayers = [];

            for (let i = 0; i < newPlayerCount; i++) {
                newPlayers.push({ id: playerId, label: `Name - Player`, name: `playerName${playerId}` });
                playerId++;
            }

            return [...prev, ...newPlayers];
        });

        setIsAddMultiplePlayerMenuOpen(false);
        resetField('numberOfPlayersToAdd');
    }

    const handlePlayerRemove = (id: number) => {
        setNumberOfPlayers(prev => {
            const playerToRemove = prev.filter(x => x.id === id);
            unregister(playerToRemove?.[0].name);

            return prev.filter(x => x.id !== id);
        });
    }

    const handleModifyPlayers = (data: FieldValues) => {
        const config: BoardConfig = JSON.parse(localStorage.getItem('board-config') ?? '{}');
        const scores: FieldValues = JSON.parse(localStorage.getItem('scores') ?? '[]');

        const keys = Object.keys(data).filter(key => key.toLowerCase().includes('playername'));
        const players: Array<Player> = keys.map((x, index) => ({
            Id: x,
            Name: data[x] as string,
            Order: index,
            Status: config.Players.find(player => player.Id === x)?.Status ?? PlayerStatus.BelowMaxPoint
        }));

        config.Players = players;

        localStorage.setItem('board-config', JSON.stringify(config));

        if (scores.length) {

            scores.forEach((row: any) => {
                const rowKeys = Object.keys(row);

                rowKeys.forEach(x => {
                    const exists = players.findIndex((player: Player) => x === player.Id) > -1;

                    if (!exists) {
                        delete row[x];
                    }
                });
            });


            players.forEach(player => {
                scores.forEach((row: any) => {
                    const rowKeys = Object.keys(row);
                    const hasPlayer = rowKeys.indexOf(player.Id) > -1;

                    if (!hasPlayer) {
                        row[player.Id] = 0;
                    }
                });
            });

            localStorage.setItem('scores', JSON.stringify(scores));
        }

        reset([]);
        unregister([]);

        handleClose(false);
    }

    useEffect(() => {
        if (open) {
            const config: BoardConfig = JSON.parse(localStorage.getItem('board-config') ?? '{}');

            const players = config.Players.map((player, index) => ({
                id: index,
                label: `Name - Player`,
                name: player.Id,
            }));

            config.Players.forEach(player => setValue(player.Id, player.Name));

            setNumberOfPlayers(players);
        }
    }, [open]);

    return (
        <Dialog onClose={handleClose} open={open} scroll="paper"
            fullWidth={true}
            maxWidth={'sm'}
        >
            <DialogTitle>
                New Player
            </DialogTitle>

            <DialogContent>
                <Grid container gap={2} sx={{ mt: 1 }}>
                    {
                        numberOfPlayers.map((player, index) => {
                            return (
                                <Grid item xs={12} key={player.name}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel htmlFor={`input-${player.name}`}>{player.label} {index + 1}</InputLabel>
                                        <OutlinedInput key={player.name} size="small"
                                            id={`input-${player.name}`}
                                            label={player.label}
                                            {...register(player.name, { required: 'Name is required' })}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton edge="end" onClick={() => handlePlayerRemove(player.id)}>
                                                        {(numberOfPlayers.length > 2) ? <Close fontSize="small" /> : null}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                            )
                        })
                    }

                    <Grid item xs={12}>
                        <Grid container justifyContent={"end"} alignItems={"center"} gap={1}>
                            <Grid item>
                                <IconButton
                                    size="small"
                                    edge="start"
                                    color="success"
                                    aria-label="menu"
                                    onClick={handleAddMultiplePlayerMenuOpen}
                                >
                                    <LibraryAdd />
                                </IconButton>

                                <Menu
                                    anchorEl={addMultiplePlayerAnchor}
                                    open={isAddMultiplePlayerMenuOpen}
                                >
                                    <MenuItem dense>
                                        <Grid container justifyContent={"space-between"} alignItems={"center"}>
                                            <Grid item>
                                                <TextField type="number" size="small" label="No. of players to add" variant="standard" fullWidth
                                                    {...register('numberOfPlayersToAdd')}
                                                    InputProps={{
                                                        inputProps: { min: 0 }
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item>
                                                <IconButton
                                                    size="small"
                                                    edge="start"
                                                    color="success"
                                                    aria-label="menu"
                                                    onClick={handleAddMultiplePlayer}
                                                >
                                                    <Done />
                                                </IconButton>
                                            </Grid>

                                            <IconButton
                                                size="small"
                                                edge="start"
                                                color="error"
                                                aria-label="menu"
                                                onClick={handleAddMultiplePlayerMenuClose}
                                            >
                                                <Close />
                                            </IconButton>
                                        </Grid>
                                    </MenuItem>
                                </Menu>
                            </Grid>

                            <Grid item>
                                <IconButton
                                    size="small"
                                    edge="start"
                                    color="success"
                                    aria-label="menu"
                                    onClick={handleAddPlayer}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleClose(true)}>Cancel</Button>
                <Button color="primary" variant="contained"
                    onClick={handleSubmit((data) => handleModifyPlayers(data))}
                    disabled={!isDirty || !isValid}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModifyPlayers;
