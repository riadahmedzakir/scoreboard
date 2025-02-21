import { Close } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { CallBridgeBoardConfig } from "src/app/models/call-bridge-board-config.model";
import { CallBridgeCreateGameProps } from "./CallBridgeCreateGame.props";

const CallBridgeCreateGame = (props: CallBridgeCreateGameProps): JSX.Element => {
    const { open, onClose } = props;

    const { register, handleSubmit, reset, resetField, getValues, unregister, formState: { isDirty, isValid } } = useForm({
        mode: 'all',
        shouldUnregister: true
    });

    const handleClose = (isClosed: boolean) => {
        onClose(isClosed);
    };

    const handleCreateGame = (data: FieldValues) => {
        const config: CallBridgeBoardConfig = {
            Title: data["title"],
            MaxPoint: data["maxPoint"],
            Players: [1, 2, 3, 4].map(x => ({
                Id: `player-${x}`,
                Name: data[`player-${x}`],
                Total: 0,
                Call: 0
            }))
        };

        localStorage.setItem('call-bridge-board-config', JSON.stringify(config));
        localStorage.removeItem('call-bridge-scores');

        reset([]);
        unregister([]);

        handleClose(false);
    };


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
                        <TextField size="small" label="Title" value={`Call-Bridge`} variant="outlined" fullWidth
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

                    <Grid item xs={12} >
                        <FormControl fullWidth size="small">
                            <InputLabel htmlFor={`input-player-1`}>Player 1</InputLabel>
                            <OutlinedInput size="small"
                                label='Player 1'
                                id={`input-player-1`}
                                {...register(`player-1`, { required: 'Name is required' })} />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} >
                        <FormControl fullWidth size="small">
                            <InputLabel htmlFor={`input-player-2`}>Player 2</InputLabel>
                            <OutlinedInput size="small"
                                label='Player 1'
                                id={`input-player-2`}
                                {...register(`player-2`, { required: 'Name is required' })} />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} >
                        <FormControl fullWidth size="small">
                            <InputLabel htmlFor={`input-player-3`}>Player 3</InputLabel>
                            <OutlinedInput size="small"
                                label='Player 1'
                                id={`input-player-3`}
                                {...register(`player-3`, { required: 'Name is required' })} />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} >
                        <FormControl fullWidth size="small">
                            <InputLabel htmlFor={`input-player-4`}>Player 4</InputLabel>
                            <OutlinedInput size="small"
                                label='Player 1'
                                id={`input-player-4`}
                                {...register(`player-4`, { required: 'Name is required' })} />
                        </FormControl>
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
};

export default CallBridgeCreateGame;