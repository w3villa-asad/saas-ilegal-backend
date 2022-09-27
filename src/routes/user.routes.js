const express = require("express");

// const UserController = require("../controller/user.controller");

// const {isValid} = require("../validators/validToken")
const router = express.Router();

// to create a user
// method : POST
// route : "/users"
// access : "public"
// desc : "Save user"

router.post("/", UserController.save);
router.post("/login", UserController.login);
router.put("/resetPassword", UserController.resetPassword);
router.get("/getAll", [isValid, UserController.getAll])
router.post("/login/mobile", UserController.signInMobile);
router.post("/login/verifyOtp",UserController.verifyOtp)
module.exports = {
    router
}