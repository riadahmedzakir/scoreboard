import PlayerStatus from "src/app/enums/player-status.enum";

export interface PlayerChipProps {
    item?: PlayChipItem;
}

export interface PlayChipItem {
    id: number,
    playerId: string;
    playerName: string;
    playerStatus: PlayerStatus
}