import { CallBridgePlayer } from "./call-bridge-player.model";

export interface CallBridgeBoardConfig {
    Title: string;
    MaxPoint: number;
    Players: Array<CallBridgePlayer>;
}