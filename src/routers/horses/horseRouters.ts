import { initServer } from "@ts-rest/express";
import { horsesContract } from "../../contracts/horses/horseContract";
import { Horse } from "../../db/horse/model";

const server = initServer();

export const horseRouter = server.router(horsesContract, {
  createHorse: async ({ body }) => {
    try {
      const horse = new Horse(body);
      await horse.save();

      return { status: 201, body: horse.toObject() };
    } catch (err) {
      return { status: 500, body: err as Error };
    }
  },
  getHorses: async ({ query: { include_deleted } }) => {
    const query = Horse.find();

    if (typeof include_deleted === "boolean") {
      query.find({ is_deleted: include_deleted });
    }

    const horses = await query.exec();

    return {
      status: 200,
      body: { horses, total: horses.length },
    };
  },
  getHorse: async ({ params: { id } }) => {
    const horse = await Horse.findById(id).exec();
    return { status: 200, body: horse ? horse.toObject() : null };
  },
  deleteHorse: async ({ params: { id } }) => {
    const horse = await Horse.findOneAndUpdate(
      { _id: id },
      { is_deleted: true },
      { new: true }
    );
    return { status: 202, body: horse ? horse.toObject() : null };
  },
  updateHorse: async ({ body: { name }, params: { id } }) => {
    const horse = await Horse.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true }
    );
    return { status: 202, body: horse ? horse.toObject() : null };
  },
});
