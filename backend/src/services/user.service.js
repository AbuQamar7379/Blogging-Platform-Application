const { tokenService } = require(".");
const { User } = require("../models");

const registerUser = async(userData) => {
    try {
        let isUserExist = await User.findOne({ email: userData.email });
        if (isUserExist) {
            return { message: "User already exist!" };
        }
        let user = new User(userData);
        user.password = await user.hashPassword(userData.password);
        return user.save();
    } catch (err) {
        throw new Error("Failed to register user, try again after sometime");
    }
};

const loginUser = async({ email, password }) => {
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return {
                isLoggedIn: false,
                message: "User doesn't exist login first, or Invalid email",
            };
        }

        if (!(await user.comparePassword(password))) {
            return {
                isLoggedIn: false,
                message: "invalid password",
            };
        }
        let token = await tokenService.generateAuthToken(user);
        return { user, isLoggedIn: true, token };
    } catch (err) {
        throw err;
    }
};

const getUser = async(id) => {
    try {
        let user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (err) {
        throw err;
    }
};

module.exports = { registerUser, loginUser, getUser };