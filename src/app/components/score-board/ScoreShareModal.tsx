import { CircularProgress, Dialog, DialogContent, Grid } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { firebase } from "../../../firebase";
import { ScoreShareModalProps, ShareScoreQr } from "./ScoreShareModal.props";

const ScoreShareModal = (props: ScoreShareModalProps): JSX.Element => {
    const { open, onClose, scores, config } = props;

    const ref = useRef<any>(undefined);
    const [isLoading, setIsloading] = useState<boolean>(true);

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        if (open) {
            const currentGameId: string = JSON.parse(localStorage.getItem('current-game-id') ?? '');

            const configDocRef = doc(firebase, "config", currentGameId);
            const scoreDocRef = doc(firebase, "scores", currentGameId);

            setDoc(configDocRef, config).then(_ => {
                setDoc(scoreDocRef, {
                    scoreList: scores
                }).then(_ => {
                    setIsloading(false);

                    setTimeout(() => {
                        ShareScoreQr.append(ref.current);

                        ShareScoreQr.update({
                            data: `https://riadahmedzakir.github.io/scoreboard?sharedId=${currentGameId}`
                        });
                    }, 50);
                });
            });
        }
    }, [open, scores, config]);

    return (
        <Dialog onClose={handleClose} open={open} scroll="paper"
            fullWidth={true}
            maxWidth={'xs'}
        >
            <DialogContent>
                <Grid container justifyContent={'center'} alignItems={'center'}>
                    {
                        isLoading ?
                            <CircularProgress size={50} /> :
                            <Grid item>
                                <div ref={ref} />
                            </Grid>
                    }
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default ScoreShareModal;
