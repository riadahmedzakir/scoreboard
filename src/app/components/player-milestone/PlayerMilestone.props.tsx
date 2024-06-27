import { FieldValues } from "react-hook-form";
import { Player } from "src/app/models/player.model";

export interface PlayerMilestoneProps {
    items: FieldValues;
    maxPoint: number;
    players: Array<Player>;
}