import { initServer } from "@ts-rest/express";
import { jockeyContract } from "../../contracts/jockey/jockeyContract";
import { Jockey } from "../../db/jockey/model";

const server = initServer();

export const jockeyRouter = server.router(jockeyContract, {
  createJockey: async ({ body }) => {
    try {
      const jockey = new Jockey(body);
      await jockey.save();

      return { status: 201, body: jockey.toObject() };
    } catch (err) {
      return { status: 500, body: err as Error };
    }
  },
  getJockeys: async ({ query: { include_deleted } }) => {
    const query = Jockey.find();

    if (typeof include_deleted === "boolean") {
      query.find({ is_deleted: include_deleted });
    }

    const jockeys = await query.exec();

    return {
      status: 200,
      body: { jockeys, total: jockeys.length },
    };
  },
  getJockey: async ({ params: { id } }) => {
    const jockey = await Jockey.findById(id).exec();
    return { status: 200, body: jockey ? jockey.toObject() : null };
  },
  deleteJockey: async ({ params: { id } }) => {
    const jockey = await Jockey.findOneAndUpdate(
      { _id: id },
      { is_deleted: true },
      { new: true }
    );
    return { status: 202, body: jockey ? jockey.toObject() : null };
  },
  updateJockey: async ({ body: { name }, params: { id } }) => {
    const jockey = await Jockey.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true }
    );
    return { status: 202, body: jockey ? jockey.toObject() : null };
  },
});
