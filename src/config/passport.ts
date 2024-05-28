import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/userModels"; // Assuming you have a User model
import { JWT_SECRET } from "./JWTConfig";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
};

passport.use(
    // @ts-ignore
    new JwtStrategy(options, async (payload, done) => {
        try {
            const user = await User.findById(payload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);

export default passport;
