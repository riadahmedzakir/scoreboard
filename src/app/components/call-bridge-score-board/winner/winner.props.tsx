export interface WinnerProps {
    open: boolean;
    onClose: (isClosed: boolean) => void;
    winners: Array<string>;
}