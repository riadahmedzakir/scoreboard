import PlayerStatus from "../enums/player-status.enum";

export interface Player {
    Id: string;
    Name: string;
    Order: number;
    Status: PlayerStatus;
}