const httpStatus = require("http-status");
const { userService } = require("../services");

const register = async(req, res) => {
    try {
        let user = await userService.registerUser(req.body);
        return res.status(httpStatus.CREATED).send(user);
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: err.message });
    }
};

const login = async(req, res) => {
    try {
        let user = await userService.loginUser(req.body);
        let { token, ...rest } = user;
        //res.cookie("token", token, { httpOnly: true });
        return res.status(httpStatus.OK).send(user);
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: err.message });
    }
};

const auth = async(req, res) => {
    try {
        return res
            .status(httpStatus.OK)
            .send({ message: "Congrats you are authenticated" });
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: err.message });
    }
};

const getUser = async(req, res) => {
    try {
        let user = await userService.getUser(req.params.id);
        return res.status(httpStatus.OK).send(user);
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: err.message });
    }
};

module.exports = { register, login, auth, getUser };