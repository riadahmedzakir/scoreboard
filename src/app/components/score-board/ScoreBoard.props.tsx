import { FieldValues } from "react-hook-form";
import { BoardConfig } from "src/app/models/board-config.model";

export interface ScoreBoardProps {
    scores: Array<FieldValues>;
    total: FieldValues,
    config: BoardConfig;
    refresh: () => void;
}