import { VideoController } from "../controller/VideoController";
import { authMiddleware } from "../middleware/auth";

/* eslint-disable @typescript-eslint/no-var-requires */
const videoRoute = require("express").Router();

videoRoute.post("/share", authMiddleware, VideoController.shareVideo);
videoRoute.get("/list", VideoController.getVideos);

export default videoRoute;
