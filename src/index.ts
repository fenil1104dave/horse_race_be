import { Request, Response } from "express";
import { server } from "./server";
import { HR_EXPRESS_PORT } from "./config";
import { connectDB } from "./db";
import "./utils/initContracts";
import { initRouters } from "./utils/initRouters";

const PORT = HR_EXPRESS_PORT || 3000;

server.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: "Validation with Zod 👊" });
});

const start = async () => {
  try {
    await connectDB();
    initRouters(server);
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
start();
