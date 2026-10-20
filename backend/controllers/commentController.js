const Comment = require("../models/Comment");
const Ticket = require("../models/Ticket");

exports.addComment = async (req, res) => {
    try {
        const ticketId = req.body.ticketId || req.params.ticketId || req.params.id;
        const message = req.body.message || req.body.text || req.body.comment;

        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        if (req.user.role === "customer" && ticket.customer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Access denied" });
        }
        if (ticket.status === "Closed") {
            return res.status(400).json({ message: "Closed tickets cannot receive comments" });
        }

        const comment = await Comment.create({
            ticket: ticket._id,
            author: req.user._id,
            message: message
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getComments = async (req, res) => {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (req.user.role === "customer" && ticket.customer.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Access denied" });
    }

    const comments = await Comment.find({ ticket: ticket._id }).populate("author", "name role");
    res.json(comments);
};