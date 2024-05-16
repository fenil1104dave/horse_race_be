import { Request, Response } from "express";
import { server } from "./src/server";
import { HR_EXPRESS_PORT } from "./src/config";
import { connectDB } from "./src/db";
import { createExpressEndpoints, initServer } from "@ts-rest/express";
import { contracts } from "./src/contracts";

const PORT = HR_EXPRESS_PORT || 3000;

server.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: "Validation with Zod 👊" });
});

const start = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  // createExpressEndpoints(contracts, router, server);
};
start();
