import { UserController } from "../controller/UserController";

/* eslint-disable @typescript-eslint/no-var-requires */
const userRoute = require("express").Router();

userRoute.post("/register", UserController.register);
userRoute.post("/login", UserController.login);

export default userRoute;
