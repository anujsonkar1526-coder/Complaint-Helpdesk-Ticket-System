require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const Department = require("./models/Department");
const Ticket = require("./models/Ticket");
const Comment = require("./models/Comment");

async function addData() {
    try {
        await connectDB();

        
        await Comment.deleteMany({});
        await Ticket.deleteMany({});
        await Department.deleteMany({});
        await User.deleteMany({});

        const password = await bcrypt.hash("Password123", 10);

        const admin = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: password,
            role: "admin"
        });

        const support = await User.create({
            name: "Support User",
            email: "support@example.com",
            password: password,
            role: "support"
        });

        const customer = await User.create({
            name: "Aarav Sharma",
            email: "aarav@example.com",
            password: password,
            role: "customer"
        });

        const department = await Department.create({
            name: "Technical Support",
            description: "Help with technical problems"
        });

        const ticket1 = await Ticket.create({
            ticketId: "TKT-1001",
            title: "Unable to login",
            category: "Account",
            priority: "High",
            description: "I cannot login to my account",
            status: "Open",
            customer: customer._id,
            department: department._id
        });

        const ticket2 = await Ticket.create({
            ticketId: "TKT-1002",
            title: "Payment problem",
            category: "Billing",
            priority: "Medium",
            description: "Payment is completed but order is pending",
            status: "In Progress",
            customer: customer._id,
            department: department._id,
            assignedTo: support._id
        });

        await Comment.create({
            ticket: ticket1._id,
            author: support._id,
            message: "We are checking your problem."
        });

        await Comment.create({
            ticket: ticket2._id,
            author: customer._id,
            message: "Please let me know when it is fixed."
        });

        console.log("Dummy data added successfully");
        console.log("Password for demo accounts: Password123");
        console.log("Admin: admin@example.com");
        console.log("Support: support@example.com");
        console.log("Customer: aarav@example.com");
        console.log("Created tickets: " + ticket1.ticketId + ", " + ticket2.ticketId);
    } catch (error) {
        console.log(error.message);
    } finally {
        await mongoose.connection.close();
    }
}

addData();