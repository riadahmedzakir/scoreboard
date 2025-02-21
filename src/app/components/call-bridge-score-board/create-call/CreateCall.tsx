import { Close } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, TextField } from "@mui/material"
import { FieldValues, useForm } from "react-hook-form"
import { CreateCallProps } from "./CreateCall.props"
import { useSnackbar } from "../../snack-bar/SnackBar"

const CreateCall = (props: CreateCallProps): JSX.Element => {
    const { open, onClose, config } = props;

    const { showSnackbar } = useSnackbar();

    const handleClose = (isClosed: boolean) => {
        onClose(isClosed);
    };

    const { register, handleSubmit, reset, resetField, getValues, unregister, formState: { isDirty, isValid } } = useForm({
        mode: 'all',
        shouldUnregister: true
    });

    const handleCall = (data: FieldValues) => {
        const storeData = JSON.parse(localStorage.getItem("call-bridge-scores") ?? '[]') as Array<Array<FieldValues>>;
        const lastIndex = storeData.length - 1;
        const hasLastCall = storeData[lastIndex]?.length > 0;

        const newScore: FieldValues = {
            'player-1': data['player-1'],
            'player-2': data['player-2'],
            'player-3': data['player-3'],
            'player-4': data['player-4']
        };


        if (!hasLastCall) {
            showSnackbar("Didn't finish last round", 2000);
            return;
        }

        storeData.push([newScore]);
        localStorage.setItem('call-bridge-scores', JSON.stringify(storeData));

        reset([]);
        unregister([]);

        handleClose(false);
    }

    return (
        <Dialog onClose={handleClose} open={open} scroll="paper"
            fullWidth={true}
            maxWidth={'sm'}
        >
            <DialogTitle>
                <Grid container justifyContent={"space-between"} alignItems={'center'}>
                    <Grid item>Player Calls</Grid>

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
                    {
                        config.Players.map(player =>
                            <Grid key={player.Id} item xs={12}>
                                <Grid container justifyContent={'space-between'} alignItems={'center'}>
                                    <Grid item xs={4}>
                                        {player.Name}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField type="number" size="small" variant="outlined" fullWidth
                                            {...register(player.Id, { required: 'Score is required' })}
                                            InputProps={{
                                                inputProps: { min: 0 }
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleClose(true)}>Cancel</Button>
                <Button color="primary" variant="contained"
                    onClick={handleSubmit((data) => handleCall(data))}
                    disabled={!isDirty || !isValid}
                >
                    Finalize Call
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default CreateCall;