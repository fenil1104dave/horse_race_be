import { initServer } from "@ts-rest/express";
import { Track } from "../../db/track/model";
import { trackContract } from "../../contracts/tracks";
import { Error } from "mongoose";
import { Stadium } from "../../db/stadium/model";

const server = initServer();

export const trackRouter = server.router(trackContract, {
  createTrack: async ({ body }) => {
    try {
      const track = new Track(body);
      await track.save();

      const stadium = await Stadium.findById(track.stadium);
      await Stadium.findByIdAndUpdate(track.stadium, {
        tracks: [...stadium!.tracks, track.id],
      });

      return { status: 201, body: track.toObject() };
    } catch (err) {
      return { status: 500, body: err as Error };
    }
  },
  getTracks: async ({ query: { is_closed } }) => {
    const query = Track.find().populate("stadium");

    if (typeof is_closed === "boolean") {
      query.find({ is_closed });
    }

    const tracks = await query.exec();

    return {
      status: 200,
      body: { tracks, total: tracks.length },
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
