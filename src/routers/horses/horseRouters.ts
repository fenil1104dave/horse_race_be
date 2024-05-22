import { initServer } from "@ts-rest/express";
import { horsesContract } from "../../contracts/horses/horseContract";
import {
  createHorse,
  deleteHorse,
  getHorse,
  getHorses,
  updateHorse,
} from "../../controllers/horseController";
import {
  errorResponse,
  successListResponse,
  successResponse,
} from "../../utils/responseUtils";

const server = initServer();

export const horseRouter = server.router(horsesContract, {
  createHorse: async ({ body }) => {
    try {
      const horse = await createHorse(body);

      return { status: 201, body: successResponse(horse) };
    } catch (err) {
      return {
        status: 500,
        body: errorResponse("Internal Server Error", err),
      };
    }
  },
  getHorses: async ({ query: { include_deleted } }) => {
    const horses = await getHorses(include_deleted);

    return {
      status: 200,
      body: successListResponse(horses.length, horses),
    };
  },
  getHorse: async ({ params: { id } }) => {
    const horse = await getHorse(id);

    return { status: 200, body: successResponse(horse) };
  },
  deleteHorse: async ({ params: { id } }) => {
    const horse = await deleteHorse(id);

    return { status: 202, body: successResponse(horse) };
  },
  updateHorse: async ({ body, params: { id } }) => {
    const horse = await updateHorse(id, body);
    return { status: 202, body: successResponse(horse) };
  },
});
