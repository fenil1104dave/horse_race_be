import { initServer } from "@ts-rest/express";
import { Stadium } from "../../db/stadium/model";
import { stadiumContract } from "../../contracts/stadium";
import { Error } from "mongoose";

const server = initServer();

export const stadiumRouter = server.router(stadiumContract, {
  createStadium: async ({ body }) => {
    try {
      const race = new Stadium(body);
      await race.save();

      return { status: 201, body: race.toObject() };
    } catch (err) {
      return { status: 500, body: err as Error };
    }
  },
  getStadiums: async ({ query: { is_closed } }) => {
    const query = Stadium.find().populate("tracks");

    if (typeof is_closed === "boolean") {
      query.find({ is_closed });
    }

    const stadiums = await query.exec();

    return {
      status: 200,
      body: { stadiums, total: stadiums.length },
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
