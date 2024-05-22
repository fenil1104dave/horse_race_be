import { User } from "contracts/user/types";
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { unless } from "express-unless";
import { errorResponse } from "../utils/responseUtils";

// Middleware to protect routes
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: Error, user: User) => {
    if (err) {
      return res.status(500).json(errorResponse("Internal Server Error", err));
    }
    if (!user) {
      return res.status(401).json(errorResponse("Unauthorized"));
    }
    req.user = user;
    next();
  })(req, res, next);
};

authenticate.unless = unless;

export default authenticate;
