import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ConfirmationModalProps } from "./ConfirmationModal.props";

const ConfirmationModal = (props: ConfirmationModalProps): JSX.Element => {
    const { onClose, open, bodyText, headerText } = props;

    const handleClose = (isClosed: boolean) => {
        onClose(isClosed);
    };

    return (
        <Dialog onClose={handleClose} open={open} scroll="paper"
            fullWidth={true}
            maxWidth={'sm'}
        >
            <DialogTitle>
                {headerText}
            </DialogTitle>

            <DialogContent>
                {bodyText}
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleClose(true)}>Cancel</Button>
                <Button onClick={() => handleClose(false)} color="warning" variant="contained">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationModal;
