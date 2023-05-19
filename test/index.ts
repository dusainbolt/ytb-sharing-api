import { DeepPartial } from "typeorm";
import { User } from "../src/entity/User.entity";

export const API = {
    USER_REGISTER: "/api/user/register",
    USER_LOGIN: "/api/user/login",
    SHARE_VIDEO: "/api/video/share",
    LIST_VIDEO: "/api/video/list",
};

export const testRegisterUser: DeepPartial<User> = { username: "dulh1811", password: "123456" };

export const testLoginUser = testRegisterUser;

export const testVideoUrl = "https://youtu.be/SLKGgBf3s9E";
