import { User } from "../entity/User.entity";

/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export class Hash {
    static bcrypt = async (value: string) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(value, salt);
    };

    static compareBcrypt = async (plainText: string, hash: string) => {
        return bcrypt.compare(plainText, hash);
    };

    static signJwtLogin = (user: User) => {
        return jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
    };

    static jwtVerify = (token: string) => {
        return jwt.verify(token, process.env.JWT_SECRET);
    };
}
