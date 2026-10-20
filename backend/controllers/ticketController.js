const Ticket = require("../models/Ticket");
const Comment = require("../models/Comment");

exports.createTicket = async (req, res) => {
    try {
        let priority = "Medium";
        if (req.body.priority) {
            const p = String(req.body.priority).trim();
            priority = p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
            if (!["Low", "Medium", "High"].includes(priority)) priority = "Medium";
        }

        const validCategories = ["Technical", "Billing", "Account", "Delivery", "Other"];
        let category = req.body.category || "Technical";
        if (!validCategories.includes(category)) category = "Technical";

        const ticket = await Ticket.create({
            ticketId: "TKT-" + Date.now(),
            title: req.body.title,
            category: category,
            priority: priority,
            description: req.body.description || "",
            screenshotUrl: req.body.screenshotUrl || "",
            customer: req.user._id
        });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTickets = async (req, res) => {
    let search = {};
    if (req.user.role === "customer") search.customer = req.user._id;
    if (req.query.status) search.status = req.query.status;
    if (req.query.priority) search.priority = req.query.priority;
    if (req.query.category) search.category = req.query.category;

    const tickets = await Ticket.find(search)
        .populate("customer", "name email")
        .populate("department", "name")
        .populate("assignedTo", "name");
    res.json(tickets);
};

exports.getTicket = async (req, res) => {
    const ticket = await Ticket.findById(req.params.id).populate("customer", "name email");
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (req.user.role === "customer" && ticket.customer._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Access denied" });
    }

    const comments = await Comment.find({ ticket: ticket._id }).populate("author", "name role");
    res.json({ ticket, comments });
};

exports.updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        if (req.user.role === "customer") {
            if (ticket.customer.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "Access denied" });
            }
            if (ticket.status !== "Open") {
                return res.status(400).json({ message: "Only open tickets can be edited" });
            }
            ticket.title = req.body.title || ticket.title;
            ticket.category = req.body.category || ticket.category;
            ticket.priority = req.body.priority || ticket.priority;
            ticket.description = req.body.description || ticket.description;
        } else {
            if (ticket.status === "Closed") {
                return res.status(400).json({ message: "Closed tickets cannot be changed" });
            }
            if (req.body.status) {
                if (ticket.status === "Resolved" && req.body.status === "Open") {
                    if (ticket.reopenedOnce) {
                        return res.status(400).json({ message: "Ticket can only be reopened once" });
                    }
                    ticket.reopenedOnce = true;
                }
                ticket.status = req.body.status;
                ticket.resolvedAt = req.body.status === "Resolved" ? new Date() : ticket.resolvedAt;
            }
            if (req.body.department !== undefined) ticket.department = req.body.department || null;
            if (req.body.assignedTo !== undefined) ticket.assignedTo = req.body.assignedTo || null;
        }

        await ticket.save();
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTicket = async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (ticket.customer.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Access denied" });
    }
    if (ticket.status !== "Open") {
        return res.status(400).json({ message: "Only open tickets can be deleted" });
    }

    await Comment.deleteMany({ ticket: ticket._id });
    await ticket.deleteOne();
    res.json({ message: "Ticket deleted" });
};