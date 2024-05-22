import { initServer } from "@ts-rest/express";
import { raceContract } from "../../contracts/race";
import {
  createRace,
  deleteRace,
  getRace,
  getRaces,
  updateRace,
} from "../../controllers/raceController";

const server = initServer();

export const raceRouter = server.router(raceContract, {
  createRace: async ({ body }) => {
    try {
      const race = await createRace(body);

      return { status: 201, body: race };
    } catch (err) {
      return { status: 500, body: err as Error };
    }
  },
  getRaces: async ({ query: { include_cancelled } }) => {
    const races = await getRaces(include_cancelled);

    return {
      status: 200,
      body: { data: races, count: races.length },
    };
  },
  getRace: async ({ params: { id } }) => {
    const race = await getRace(id);

    return { status: 200, body: race };
  },
  deleteRace: async ({ params: { id } }) => {
    const horse = await deleteRace(id);

    return { status: 202, body: horse ? horse.toObject() : null };
  },
  updateRace: async ({ body, params: { id } }) => {
    if (!body)
      return {
        status: 400,
        body: "Body should contain at least one value to update.",
      };
    const race = await updateRace(id, body);
    return { status: 202, body: race };
  },
});
