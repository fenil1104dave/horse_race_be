import { RaceSocketMessageConstant } from "./raceSocketConstants";

export type RaceSocketMessagesTypes = keyof typeof RaceSocketMessageConstant;

export type RaceSocketMessage = {
    type: RaceSocketMessagesTypes;
    data?: any;
};
