const express = require("express");
const router = express.Router();
const home_controller = require("../controllers/home_controller.js")

router.post("/budget_create", home_controller.create_budget);
router.post("/budget_delete", home_controller.delete_budget);
router.get("/budget_list", home_controller.budget_list);

router.post("/data", home_controller.data_page);

module.exports = router;