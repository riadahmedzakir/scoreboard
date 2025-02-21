import { FieldValues } from "react-hook-form";
import { CallBridgeBoardConfig } from "src/app/models/call-bridge-board-config.model";

export interface CallBridgeBoardProps {
    scores: Array<FieldValues>;
    config: CallBridgeBoardConfig;
}