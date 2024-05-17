import { initServer } from "@ts-rest/express";
import { RaceHistory } from "../../db/race/model";
import { raceContract } from "../../contracts/race";
import { Player } from "../../db/player/model";

const server = initServer();

export const raceRouter = server.router(raceContract, {
  createRace: async ({ body }) => {
    try {
      // TODO: Add condition to check total lane count on a Track.
      // Check if same player is added multiple times
      const players = await Player.insertMany(body.players);

      const race = new RaceHistory({
        ...body,
        players: players.map((player) => player._id),
      });
      await race.save();

      return { status: 201, body: race.toObject() };
    } catch (err) {
      return { status: 500, body: err as Error };
    }
  },
  getRaces: async ({ query: { include_cancelled } }) => {
    const query = RaceHistory.find()
      .populate("stadium")
      .populate("track")
      .populate({
        path: "players",
        populate: [
          { path: "jockey", model: "HR_jockeys" },
          { path: "horse", model: "HR_horses" },
        ],
      });

    if (typeof include_cancelled === "boolean") {
      query.find({ is_cancelled: include_cancelled });
    }

    const races = await query.exec();

    return {
      status: 200,
      body: { races, total: races.length },
    };
  },
  //   getHorse: async ({ params: { id } }) => {
  //     const horse = await Horse.findById(id).exec();
  //     return { status: 200, body: horse ? horse.toObject() : null };
  //   },
  //   deleteHorse: async ({ params: { id } }) => {
  //     const horse = await Horse.findOneAndUpdate(
  //       { _id: id },
  //       { is_deleted: true },
  //       { new: true }
  //     );
  //     return { status: 202, body: horse ? horse.toObject() : null };
  //   },
  //   updateHorse: async ({ body: { name }, params: { id } }) => {
  //     const horse = await Horse.findOneAndUpdate(
  //       { _id: id },
  //       { name },
  //       { new: true }
  //     );
  //     return { status: 202, body: horse ? horse.toObject() : null };
  //   },
});
