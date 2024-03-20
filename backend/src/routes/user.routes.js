const router = require("express").Router();
const { userController } = require("../controllers");
const { user } = require("../validations");
const { validate, auth } = require("../middlewares");

router.post(
    "/register",
    validate.validateBody(user.register),
    userController.register
);

router.post("/login", validate.validateBody(user.login), userController.login);
router.get("/getUser/:id", userController.getUser);
router.get("/authenticate", auth, userController.auth);

module.exports = router;