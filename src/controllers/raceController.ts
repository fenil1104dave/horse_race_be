import { ResourceNotFoundError } from "../utils/errors";
import { CreateRace, UpdateRaceBody } from "../contracts/race/types";
import { Player } from "../models/playerModel";
import { RaceHistory } from "../models/raceModel";
import { getHorsesById } from "./horseController";

export const createRace = async (data: CreateRace) => {
    const { players, ...rest } = data;

    const validPlayers = await getHorsesById(
        players.map((player) => player.horse)
    );

    if (validPlayers.length !== players.length)
        throw new ResourceNotFoundError("Please select valid player details.");

    const updatedPlayers = await Player.insertMany(players);

    const race = new RaceHistory({
        ...rest,
        players: updatedPlayers.map((player) => player._id),
    });
    await race.save();

    return race?.toObject() || null;
};

export const getRaces = async (include_cancelled?: boolean | undefined) => {
    const query = RaceHistory.find().populate({
        path: "players",
        populate: [{ path: "horse", model: "HR_horses" }],
    });

    if (typeof include_cancelled === "boolean") {
        query.find({ is_cancelled: include_cancelled });
    }

    const races = await query.exec();

    return races;
};

export const getRace = async (id: string) => {
    const race = await RaceHistory.findById(id).exec();
    return race?.toObject() || null;
};

export const deleteRace = async (id: string) => {
    const race = await RaceHistory.findOneAndUpdate(
        { _id: id },
        { is_deleted: true },
        { new: true }
    );

    return race?.toObject() || null;
};

export const updateRace = async (id: string, data: UpdateRaceBody) => {
    const race = await RaceHistory.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });

    return race?.toObject() || null;
};
