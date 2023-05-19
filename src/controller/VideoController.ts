/* eslint-disable no-useless-escape */
import { Video } from "../entity/Video";
import { Rp } from "../utils/response";

export class VideoController {
    static shareVideo = async (req, res) => {
        try {
            const { url } = req.body;
            const regexYoutubeUrl = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;
            if (!regexYoutubeUrl.test(url)) {
                return Rp.error(res, "Url invalid");
            }
            const video = await Video.save({ url, userId: req.user.userId });
            return Rp.ok(res, video);
        } catch (err) {
            return Rp.exception(res, err);
        }
    };

    static getVideos = async (req, res) => {
        try {
            const { take, skip } = req.query;
            const [videos, total] = await Video.findAndCount({
                order: { createdOn: "DESC" },
                take: take,
                skip: skip,
            });
            return Rp.ok(res, { videos, total });
        } catch (err) {
            return Rp.exception(res, err);
        }
    };
}
