import { Player } from "src/app/models/player.model";

export interface CreateRoundProps {
    open: boolean;
    players: Array<Player>;
    onClose: (isClosed: boolean) => void;
}