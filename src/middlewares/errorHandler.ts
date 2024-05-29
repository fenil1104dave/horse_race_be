// middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { FormattedErrorParam } from "../utils/errors";
import { errorResponse } from "../utils/responseUtils";
import HttpStatusCode from "../utils/HTTPStatusCode";

const errorHandler = (
    err: FormattedErrorParam,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = HttpStatusCode[err.status || "INTERNAL_SERVER_ERROR"];
    const message = err.message || "Internal Server Error";
    const name = err.name || "InternalServerError";

    res.status(status).json(errorResponse(message, name));
};

export default errorHandler;
