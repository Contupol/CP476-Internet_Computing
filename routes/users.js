const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller")

router.get("/users", userController.getAllUsers);

router.post("/sign_in", userController.signIn);
router.post("/sign_up", userController.signUp);

router.post("/register", userController.register);

router.get('/', userController.entry);

module.exports = router;