const express = require("express");
const router = express.Router();
const { register, login, me } = require("../controllers/authController");
const { authHandler } = require("../middleware/authHandler");

router.post("/register", register);
router.post("/login", login);
router.get("/me", authHandler, me);

module.exports = router;