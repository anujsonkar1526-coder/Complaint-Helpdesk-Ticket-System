const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    ticketId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, enum: ["Technical", "Billing", "Account", "Delivery", "Other"], required: true },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    description: { type: String, default: "" },
    screenshotUrl: { type: String, default: "" },
    status: { type: String, enum: ["Open", "In Progress", "Resolved", "Closed"], default: "Open" },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", default: null },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    resolvedAt: { type: Date, default: null },
    reopenedOnce: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);