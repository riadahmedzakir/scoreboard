import { CallBridgeBoardConfig } from "src/app/models/call-bridge-board-config.model";

export interface FinishRoundProps {
    open: boolean;
    config: CallBridgeBoardConfig;
    onClose: (isClosed: boolean) => void;
}