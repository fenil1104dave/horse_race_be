// /tests/controllers/authController.test.ts
import request from "supertest";
import app from "../../app";
import { User } from "../../models/userModels";
import bcrypt from "bcryptjs";

const TEST_USER = {
    name: "Gateway Corp",
    username: "gateway",
    password: "Gateway@123",
};

describe("Auth Controller", () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    describe("POST /register", () => {
        it("should register a new user", async () => {
            const res = await request(app)
                .post("/api/v1/register")
                .send(TEST_USER);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty(
                "data.username",
                TEST_USER.username
            );
        });
    });

    describe("POST /login", () => {
        it("should login an existing user", async () => {
            const hashedPassword = await bcrypt.hash(TEST_USER.password, 10);
            await new User({ ...TEST_USER, password: hashedPassword }).save();

            const res = await request(app).post("/api/v1/login").send({
                username: TEST_USER.username,
                password: TEST_USER.password,
            });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("token");
        });

        it("should return 401 for invalid credentials", async () => {
            const res = await request(app)
                .post("/api/v1/login")
                .send({ username: "wronguser", password: "wrongpass" });

            expect(res.status).toBe(401);
        });
    });
});
