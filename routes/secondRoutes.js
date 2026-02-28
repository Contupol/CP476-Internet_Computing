const express = require("express");
const router = express.Router();
const secondController = require("../controllers/secondController.js")

router.get("/users", secondController.addExpense);
router.post("/users", secondController.deleteExpense);
router.put("/users", secondController.updateExpense);

module.exports = router;