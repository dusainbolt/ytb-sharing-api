import { expect } from "chai";
import { API, testLoginUser, testVideoUrl } from ".";
import { TestFactory } from "./factory.spec";

describe("Testing video component", () => {
    // Create instances
    const factory: TestFactory = new TestFactory();

    let token;
    let userId;
    before(async () => {
        await factory.init();
        await factory.app.post(API.USER_REGISTER).send(testLoginUser);
        const loginResponse = await factory.app.post(API.USER_LOGIN).send(testLoginUser);
        token = loginResponse.body.data.token;
        userId = loginResponse.body.data.user.id;
    });

    after(async () => {
        await factory.close();
    });

    describe(`${API.SHARE_VIDEO} -> share video`, () => {
        it("Url invalid", (done) => {
            factory.app
                .post(API.SHARE_VIDEO)
                .send({ url: "url" })
                .set({ "x-access-token": token, Accept: "application/json" })
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(400, done);
        });

        it("Share video successful", (done) => {
            factory.app
                .post(API.SHARE_VIDEO)
                .send({ url: testVideoUrl })
                .set({ "x-access-token": token, Accept: "application/json" })
                .expect(201)
                .end((err, res) => {
                    try {
                        expect(res.body.url, testVideoUrl);
                        expect(res.body.userId, userId);
                        return done();
                    } catch (err) {
                        return done(err);
                    }
                });
        });
    });
});
