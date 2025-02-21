import { FieldValues } from "react-hook-form";
import { CallBridgeBoardConfig } from "src/app/models/call-bridge-board-config.model";

export interface CallBridgeScoreBoardRootProps {
    config: CallBridgeBoardConfig;
    scores: Array<Array<FieldValues>>;
    refresh: () => void;
    roundType: 'Call' | 'Trick';
}