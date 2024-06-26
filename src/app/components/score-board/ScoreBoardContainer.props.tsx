import { BoardConfig } from "src/app/models/board-config.model";

export interface ScoreBoardContainerProps {
    config: BoardConfig;
    refresh: () => void;
}