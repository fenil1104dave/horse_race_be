import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Please provide valid ID." });
  }
  next();
};

export default validateObjectId;
