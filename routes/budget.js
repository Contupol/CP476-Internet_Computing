const express = require("express");
const router = express.Router();
const secondController = require("../controllers/data_controller.js")

router.get("/users", secondController.addExpense);
router.post("/users", secondController.deleteExpense);
router.put("/users", secondController.updateExpense);
router.get("/users", secondController.checkExpenses);

module.exports = router;