const Ticket = require("../models/Ticket");

exports.getDashboard = async (req, res) => {
    const tickets = await Ticket.find();
    let open = 0;
    let resolved = 0;
    let high = 0;
    let medium = 0;
    let low = 0;
    let categories = {};

    tickets.forEach((ticket) => {
        if (ticket.status === "Open" || ticket.status === "In Progress") open++;
        if (ticket.status === "Resolved" || ticket.status === "Closed") resolved++;
        if (ticket.priority === "High") high++;
        if (ticket.priority === "Medium") medium++;
        if (ticket.priority === "Low") low++;

        if (!categories[ticket.category]) categories[ticket.category] = 0;
        categories[ticket.category]++;
    });

    res.json({
        totalTickets: tickets.length,
        openTickets: open,
        resolvedTickets: resolved,
        priorities: { High: high, Medium: medium, Low: low },
        categories: categories
    });
};