import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { ShareSiteQr, ShareSiteModalProps } from "./ShareSiteModal.props";
import { useEffect, useRef } from "react";

const ShareSiteModal = (props: ShareSiteModalProps): JSX.Element => {
    const { open, onClose } = props;
    const ref = useRef<any>(undefined);

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                ShareSiteQr.append(ref.current);
            }, 10);
        }
    }, [open]);

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

export default ShareSiteModal;
