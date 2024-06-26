import { Close, Done, LibraryAdd } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, Menu, MenuItem, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { CreateGameProps } from "./CreateGame.props";
import { BoardConfig } from "src/app/models/board-config.model";
import { Player } from "src/app/models/player.model";

const CreateGame = (props: CreateGameProps): JSX.Element => {
    const { onClose, open } = props;

    const [addMultiplePlayerAnchor, setAddMultiplePlayerAnchor] = useState<null | HTMLElement>(null);
    const [isAddMultiplePlayerMenuOpen, setIsAddMultiplePlayerMenuOpen] = useState<boolean>(false);

    const [numberOfPlayers, setNumberOfPlayers] = useState<Array<{ id: number, label: string, name: string }>>([
        { id: 1, label: 'Name - Player', name: 'playerName1' },
        { id: 2, label: 'Name - Player', name: 'playerName2' },
    ]);

    const { register, handleSubmit, reset, resetField, getValues, unregister, formState: { isDirty, isValid } } = useForm({
        mode: 'all',
        shouldUnregister: true
    });

    const handleClose = (isClosed: boolean) => {
        reset([]);
        onClose(isClosed);

        setNumberOfPlayers([
            { id: 1, label: 'Name - Player', name: 'playerName1' },
            { id: 2, label: 'Name - Player', name: 'playerName2' },
        ]);
    };

    const handleAddPlayer = () => {
        setNumberOfPlayers(prev => {
            const playerId = prev.reduce((maxObj, currentObj) => {
                return currentObj.id > maxObj.id ? currentObj : maxObj;
            }).id + 1;

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

    const handleAddMultiplePlayerMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAddMultiplePlayerAnchor(event.currentTarget);
        setIsAddMultiplePlayerMenuOpen(true);
    }

    const handleAddMultiplePlayerMenuClose = () => {
        setAddMultiplePlayerAnchor(null);
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

    const handleCreateGame = (data: FieldValues) => {
        const keys = Object.keys(data).filter(key => key.toLowerCase().includes('playername'));
        const players: Array<Player> = keys.map((x, index) => ({
            Id: x,
            Name: data[x] as string,
            Order: index + 1
        }));

        const boardConfig: BoardConfig = {
            Title: data['title'],
            MaxPoint: data['maxPoint'],
            Players: players
        };

        localStorage.setItem('board-config', JSON.stringify(boardConfig));
        localStorage.removeItem('scores');

        reset([]);
        unregister([]);

        setNumberOfPlayers([
            { id: 1, label: 'Name - Player', name: 'playerName1' },
            { id: 2, label: 'Name - Player', name: 'playerName2' },
        ]);

        handleClose(false);
    }

    return (
        <Dialog onClose={handleClose} open={open} scroll="paper"
            fullWidth={true}
            maxWidth={'sm'}
        >
            <DialogTitle>
                <Grid container justifyContent={"space-between"} alignItems={'center'}>
                    <Grid item>New Game</Grid>

                    <Grid item>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => handleClose(true)}
                        >
                            <Close />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>

            <Divider />

            <DialogContent>
                <Grid container gap={2}>
                    <Grid item xs={12}>
                        <TextField size="small" label="Title" variant="outlined" fullWidth
                            {...register('title', { required: 'Title is required' })}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField type="number" size="small" label="Max point" variant="outlined" fullWidth
                            {...register('maxPoint', { required: 'Max point is required' })}
                            InputProps={{
                                inputProps: { min: 0 }
                            }}
                        />
                    </Grid>


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
                    onClick={handleSubmit((data) => handleCreateGame(data))}
                    disabled={!isDirty || !isValid}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateGame;
