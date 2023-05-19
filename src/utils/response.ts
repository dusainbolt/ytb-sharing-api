export class Rp {
    static ok = (res, data, status = 200) => {
        return res.status(status).send({ data });
    };

    static error = (res, message) => {
        return res.status(400).send({ message });
    };

    static exception = (res, err) => {
        return res.status(500).send({
            message: err.message || "Some error occurred",
        });
    };
}
