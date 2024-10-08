import { FieldValues } from "react-hook-form";
import { Player } from "src/app/models/player.model";

export interface CreateRoundProps {
    open: boolean;
    players: Array<Player>;
    total: FieldValues;
    onClose: (isClosed: boolean) => void;
}