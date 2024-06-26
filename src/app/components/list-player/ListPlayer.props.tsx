import { Player } from "src/app/models/player.model";

export interface ListPlayerProps {
    players: Array<Player>;
    refresh: () => void;
}

