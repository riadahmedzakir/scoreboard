import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { CreateRoundProps } from "./CreateRound.props";

const CreateRound = (props: CreateRoundProps): JSX.Element => {
    const { onClose, open, players, total, maxPoint } = props;

    const [excludeDefeated, setExcludeDefeated] = useState<boolean>(false);

    const { control, register, handleSubmit, reset, unregister, setValue, formState: { isDirty, isValid } } = useForm({
        mode: 'all',
        shouldUnregister: true
    });

    const handleCreateRound = (data: FieldValues) => {
        const storeData = JSON.parse(localStorage.getItem("scores") ?? '[]') as Array<FieldValues>;
        const newScore: FieldValues = {};

        players.forEach(player => {
            newScore[player.Id] = data[player.Id] ? parseInt(data[player.Id]) : 0
        });

        storeData.push(newScore);

        localStorage.setItem('scores', JSON.stringify(storeData));

        reset([]);
        unregister([]);

        handleClose(false);
    }

    const handleExcludeDefeated = (value: boolean) => {
        localStorage.setItem("exclude-defeated", JSON.stringify(value));
        setExcludeDefeated(value);
    }

    const handleClose = (isClosed: boolean) => {
        onClose(isClosed);
    };

    useEffect(() => {
        if (open) {
            const isDefeatedPlayerExcluded = JSON.parse(localStorage.getItem("exclude-defeated") ?? 'true');

            setValue("ExcludeDefeated", isDefeatedPlayerExcluded);
            setExcludeDefeated(isDefeatedPlayerExcluded);
        }

    }, [open, total]);

    return (
        <Dialog onClose={handleClose} open={open} scroll="paper"
            fullWidth={true}
            maxWidth={'sm'}
        >
            <DialogTitle>
                <Grid container justifyContent={"space-between"} alignItems={"center"}>
                    <Grid item>
                        <Typography variant="h6">New round details</Typography>
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Controller
                                    name={"ExcludeDefeated"}
                                    control={control}
                                    defaultValue={false}
                                    render={({ field: { value, onChange } }) => (
                                        <Checkbox
                                            checked={value}
                                            onChange={(event, checked) => {
                                                onChange(event);
                                                handleExcludeDefeated(checked);
                                            }}
                                        />
                                    )}
                                />
                            }
                            label={"Exclude defeated players"}
                        />
                    </Grid>
                </Grid>
            </DialogTitle>

            <DialogContent>
                <Grid container gap={1}>
                    {
                        players.map(player => (
                            (!excludeDefeated || !Object.keys(total).length || (excludeDefeated && total[player.Id] <= maxPoint)) ?
                                <Grid item xs={12} key={player.Id}>
                                    <Grid container justifyContent={"space-between"} alignItems={"center"}>
                                        <Grid item xs={4}>{player.Name}</Grid>
                                        <Grid item xs={8}>
                                            <TextField type="number" size="small" label="Point" variant="standard" fullWidth
                                                {...register(player.Id,
                                                    {
                                                        required: `${player.Name} point is required`
                                                    })
                                                }
                                                InputProps={{
                                                    inputProps: { min: 0 }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid> : null
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
