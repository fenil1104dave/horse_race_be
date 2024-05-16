import { initServer } from "@ts-rest/express";
import { horsesContract } from "src/contracts/horses/horseContract";
import { Horse } from "src/db/horse/model";

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
  getHorses: async () => {
    const horses = await Horse.find().lean();
    return {
      status: 200,
      body: { horses, total: horses.length },
    };
  },
  getHorse: async ({ params: { id } }) => {
    const horse = await Horse.findById(id).exec();
    return { status: 200, body: horse ? horse.toObject() : null };
  },
});
