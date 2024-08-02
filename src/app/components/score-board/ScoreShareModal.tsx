import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { ShareScoreQr, ScoreShareModalProps } from "./ScoreShareModal.props";
import { useEffect, useRef, useState } from "react";
import useAddJsonToBin from "./../../hooks/useAddJsonToBin";
import { useQueryClient } from "@tanstack/react-query";

const ScoreShareModal = (props: ScoreShareModalProps): JSX.Element => {
    const { open, onClose, scores, config } = props;

    const ref = useRef<any>(undefined);
    const timeStamp = new Date().getDate().toString();

    const [addJsonToBin, addJsonToBinResponse] = useAddJsonToBin(timeStamp);

    const queryClient = useQueryClient();

    const handleClose = () => {
        onClose();
    };

    const handleJson = (data: any) => {
        addJsonToBin(data);
    }

    useEffect(() => {
        if (open) {
            console.log('here');

            setTimeout(() => {
                ShareScoreQr.append(ref.current);


                const data = {
                    config: config,
                    scores: scores
                };

                ShareScoreQr.update({
                    data: `https://riadahmedzakir.github.io/scoreboard?sharedId=66964c60acd3cb34a866dff7`
                });

                handleJson(data);
            }, 10);
        }
    }, [open, scores, config]);

    useEffect(() => {
        queryClient.removeQueries({ queryKey: ['add-json-to-bin', timeStamp] });
    }, [open, addJsonToBinResponse])

    return (
        <Dialog onClose={handleClose} open={open} scroll="paper"
            fullWidth={true}
            maxWidth={'xs'}
        >
            <DialogContent>
                <Grid container justifyContent={'center'} alignItems={'center'}>
                    <Grid item>
                        <div ref={ref} />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default ScoreShareModal;
