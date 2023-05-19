import { assert, expect } from "chai";
import { API, testRegisterUser, testLoginUser } from ".";
import { User } from "../src/entity/User.entity";
import { TestFactory } from "./factory.spec";

describe("Testing user component", () => {
    // Create instances
    const factory: TestFactory = new TestFactory();
    before(async () => {
        await factory.init();
    });

    after(async () => {
        await factory.close();
    });

    describe(`${API.USER_REGISTER} -> user register`, () => {
        it("responds with status 500", (done) => {
            factory.app
                .post(API.USER_REGISTER)
                .send()
                .set("Accept", "application/json")
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(500, done);
        });

        it("responds with new user", (done) => {
            factory.app
                .post(API.USER_REGISTER)
                .send(testRegisterUser)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(201)
                .end((err, res) => {
                    try {
                        if (err) throw err;
                        const user: User = res.body.data;
                        // Assert user
                        assert.isObject(user, "user should be an object");
                        assert(user.username === testRegisterUser.username, "username does not match");

                        return done();
                    } catch (err) {
                        return done(err);
                    }
                });
        });

        it("responds username is already exist", (done) => {
            factory.app
                .post(API.USER_REGISTER)
                .send(testRegisterUser)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(400)
                .end((err, res) => {
                    try {
                        if (err) throw err;
                        expect(res.body.message, `${testRegisterUser.username} is already exist`);
                        return done();
                    } catch (err) {
                        return done(err);
                    }
                });
        });
    });

    describe(`${API.USER_LOGIN} -> user login`, () => {
        it("responds with status 500", (done) => {
            factory.app
                .post(API.USER_LOGIN)
                .send()
                .set("Accept", "application/json")
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(500, done);
        });

        it("responds with user and token", (done) => {
            factory.app
                .post(API.USER_LOGIN)
                .send(testLoginUser)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    try {
                        if (err) throw err;
                        const user: User = res.body.data.user;
                        const token: string = res.body.data.token;
                        // Assert user
                        assert.isObject(user, "user should be an object");
                        assert(user.username === testRegisterUser.username, "username does not match");
                        assert(token != null);

                        return done();
                    } catch (err) {
                        return done(err);
                    }
                });
        });

        it("responds username is not already exist", (done) => {
            factory.app
                .post(API.USER_LOGIN)
                .send({ username: "username_not_already_exist" })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(400)
                .end((err, res) => {
                    try {
                        if (err) throw err;
                        expect(res.body.message, `${testRegisterUser.username} is not already exist`);
                        return done();
                    } catch (err) {
                        return done(err);
                    }
                });
        });

        it("responds password is not correct", (done) => {
            factory.app
                .post(API.USER_LOGIN)
                .send({ ...testLoginUser, password: "wrong_password" })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(400)
                .end((err, res) => {
                    try {
                        if (err) throw err;
                        expect(res.body.message, "Password is not correct");
                        return done();
                    } catch (err) {
                        return done(err);
                    }
                });
        });
    });
});
