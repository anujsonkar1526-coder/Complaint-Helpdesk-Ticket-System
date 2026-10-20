const express = require("express");
const router = express.Router();
const { getDashboard } = require("../controllers/dashboardController");
const { authHandler, allowRoles } = require("../middleware/authHandler");

router.get("/", authHandler, allowRoles("admin", "support"), getDashboard);
module.exports = router;