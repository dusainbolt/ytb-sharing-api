import { expect } from "chai";
import { API, testLoginUser } from ".";
import { TestFactory } from "./factory.spec";

describe("Testing auth component", () => {
    // Create instances
    const factory: TestFactory = new TestFactory();
    let token;
    before(async () => {
        await factory.init();
        await factory.app.post(API.USER_REGISTER).send(testLoginUser);
        const loginResponse = await factory.app.post(API.USER_LOGIN).send(testLoginUser);
        token = loginResponse.body.data.token;
    });

    after(async () => {
        await factory.close();
    });

    it("responds with status 403: required authentication", (done) => {
        factory.app
            .post(API.SHARE_VIDEO)
            .send()
            .set("Accept", "application/json")
            .expect(403)
            .end((err, res) => {
                try {
                    expect(res.text, "A token is required for authentication");

                    return done();
                } catch (err) {
                    return done(err);
                }
            });
    });

    it("responds with status 401: invalid token", (done) => {
        factory.app
            .post(API.SHARE_VIDEO)
            .send()
            .set({ "x-access-token": "token", Accept: "application/json" })
            .expect(401)
            .end((err, res) => {
                try {
                    expect(res.text, "Invalid Token");
                    return done();
                } catch (err) {
                    return done(err);
                }
            });
    });

    it("Should passing auth middleware", (done) => {
        factory.app
            .post(API.SHARE_VIDEO)
            .send({ url: "https://youtu.be/SLKGgBf3s9E" })
            .set({ "x-access-token": token, Accept: "application/json" })
            .expect(201)
            .end((err, res) => {
                try {
                    return done();
                } catch (err) {
                    return done(err);
                }
            });
    });
});
