require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const app = express();


app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({
        message: "Helpdesk API is working",
        database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
        timestamp: new Date().toISOString()
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/admin/dashboard", require("./routes/dashboardRoutes"));


app.use("/api/admin/tickets", require("./routes/ticketRoutes"));
app.use("/api/admin/departments", require("./routes/departmentRoutes"));

app.use((req, res) => {
    res.status(404).json({ message: "Endpoint not found" });
});

app.use((error, req, res, next) => {
    console.error("Server error:", error);
    res.status(500).json({ message: error.message || "Server error" });
});

const PORT = process.env.PORT || 3000;

async function startServer() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();