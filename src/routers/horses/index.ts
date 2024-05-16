import { initServer } from "@ts-rest/express";
import { horsesContract } from "../../contracts/horses";
import { Horse } from "../../db/horse/model";
import { SuccessStatus } from "../../utils/statusCodes";

const server = initServer();

export const horseRouter = server.router(horsesContract, {
  getHorse: async ({ params: { id } }) => {
    const horse = await Horse.findById(id).exec();
    return { status: SuccessStatus.OK, body: horse ?? null };
  },
});
