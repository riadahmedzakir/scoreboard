export interface ConfirmationModalProps {
    open: boolean;
    headerText: string;
    bodyText: string;
    onClose: (isClosed: boolean) => void;
}