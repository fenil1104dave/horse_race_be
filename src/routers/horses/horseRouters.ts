import { initServer } from "@ts-rest/express";
import { horsesContract } from "../../contracts/horses/horseContract";
import {
  createHorse,
  deleteHorse,
  getHorse,
  getHorses,
  updateHorse,
} from "../../controllers/horseController";

const server = initServer();

export const horseRouter = server.router(horsesContract, {
  createHorse: async ({ body }) => {
    try {
      const horse = await createHorse(body);

      return { status: 201, body: horse };
    } catch (err) {
      return { status: 500, body: err as Error };
    }
  },
  getHorses: async ({ query: { include_deleted } }) => {
    const horses = await getHorses(include_deleted);

    return {
      status: 200,
      body: { data: horses, count: horses.length },
    };
  },
  getHorse: async ({ params: { id } }) => {
    const horse = await getHorse(id);

    return { status: 200, body: horse };
  },
  deleteHorse: async ({ params: { id } }) => {
    const horse = await deleteHorse(id);

    return { status: 202, body: horse };
  },
  updateHorse: async ({ body, params: { id } }) => {
    const horse = await updateHorse(id, body);
    return { status: 202, body: horse };
  },
});
