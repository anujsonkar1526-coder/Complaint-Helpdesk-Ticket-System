const express = require("express");
const router = express.Router();
const comment = require("../controllers/commentController");
const { authHandler } = require("../middleware/authHandler");

router.use(authHandler);
router.post("/", comment.addComment);
router.post("/:ticketId", comment.addComment);
router.get("/:ticketId", comment.getComments);

module.exports = router;