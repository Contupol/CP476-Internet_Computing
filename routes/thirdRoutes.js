const express = require("express");
const router = express.Router();
const secondController = require("../controllers/thirdController.js")

router.get("/users", secondController.checkExpenses);

module.exports = router;