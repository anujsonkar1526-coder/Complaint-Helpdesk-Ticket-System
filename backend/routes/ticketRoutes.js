const express = require("express");
const router = express.Router();
const ticket = require("../controllers/ticketController");
const { authHandler, allowRoles } = require("../middleware/authHandler");

router.use(authHandler);
router.get("/", ticket.getTickets);
router.post("/", allowRoles("customer"), ticket.createTicket);
router.get("/:id", ticket.getTicket);
router.put("/:id", ticket.updateTicket);
router.delete("/:id", allowRoles("customer"), ticket.deleteTicket);

module.exports = router;