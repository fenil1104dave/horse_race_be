import { Horse } from "../models/horseModel";
import { CreateHorse, UpdateHorseBody } from "../contracts/horses/types";

export const getHorses = async (include_deleted: boolean | undefined) => {
  const query = Horse.find();

  if (typeof include_deleted === "boolean") {
    query.find({ is_deleted: include_deleted });
  }

  const horses = await query.exec();

  return horses;
};

export const createHorse = async (data: CreateHorse) => {
  try {
    const horse = new Horse(data);
    await horse.save();

    return horse.toObject();
  } catch (err) {
    return err as Error;
  }
};

export const getHorse = async (id: string) => {
  const horse = await Horse.findById(id).exec();
  return horse?.toObject() || null;
};

export const deleteHorse = async (id: string) => {
  const horse = await Horse.findOneAndUpdate(
    { _id: id },
    { is_deleted: true },
    { new: true }
  );

  return horse?.toObject() || null;
};

export const updateHorse = async (id: string, { name }: UpdateHorseBody) => {
  const horse = await Horse.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true }
  );

  return horse?.toObject() || null;
};
