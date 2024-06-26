import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField } from "@mui/material";
import { CreateRoundProps } from "./CreateRound.props";
import { FieldValues, useForm } from "react-hook-form";

const CreateRound = (props: CreateRoundProps): JSX.Element => {
    const { onClose, open, players } = props;

    const { register, handleSubmit, reset, unregister, formState: { isDirty, isValid } } = useForm({
        mode: 'all',
        shouldUnregister: true
    });

    const handleCreateRound = (data: FieldValues) => {
        const storeData = JSON.parse(localStorage.getItem("scores") ?? '[]') as Array<FieldValues>;

        storeData.push(data);

        localStorage.setItem('scores', JSON.stringify(storeData));

        reset([]);
        unregister([]);

        handleClose(false);
    }

    const handleClose = (isClosed: boolean) => {
        onClose(isClosed);
    };

    return (
        <Dialog onClose={handleClose} open={open} scroll="paper"
            fullWidth={true}
            maxWidth={'sm'}
        >
            <DialogTitle>
                New round detaails
            </DialogTitle>

            <DialogContent>
                <Grid container gap={1}>
                    {
                        players.map(player => (
                            <Grid item xs={12} key={player.Id}>
                                <Grid container justifyContent={"space-between"} alignItems={"center"}>
                                    <Grid item xs={4}>{player.Name}</Grid>
                                    <Grid item xs={8}>
                                        <TextField type="number" size="small" label="Point" variant="standard" fullWidth
                                            {...register(player.Id, { required: `${player.Name} point is required` })}
                                            InputProps={{
                                                inputProps: { min: 0 }
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleClose(true)}>Cancel</Button>
                <Button color="primary" variant="contained"
                    onClick={handleSubmit((data) => handleCreateRound(data))}
                    disabled={!isDirty || !isValid}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateRound;
