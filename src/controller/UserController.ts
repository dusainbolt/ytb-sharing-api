import { User } from "../entity/User.entity";
import { Hash } from "../utils/hash";
import { Rp } from "../utils/response";

export class UserController {
    static register = async (req, res) => {
        try {
            const { username } = req.body;
            const existUser = await User.findOneBy({ username });
            if (existUser) {
                return Rp.error(res, `${username} is already exist`);
            }
            const password = await Hash.bcrypt(req.body.password);
            const user = await User.save({ username, password });
            return Rp.ok(res, user, 201);
        } catch (err) {
            return Rp.exception(res, err);
        }
    };

    static login = async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOneBy({ username });
            if (!user) {
                return Rp.error(res, `${username} is not already exist`);
            }

            if (!(await Hash.compareBcrypt(password, user.password))) {
                return Rp.error(res, "Password is not correct");
            }
            return Rp.ok(res, { user: user, token: Hash.signJwtLogin(user) });
        } catch (err) {
            return Rp.exception(res, err);
        }
    };
}
