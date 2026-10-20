
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Helpdesk API is working" });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/admin/dashboard", require("./routes/dashboardRoutes"));

app.use((req, res) => {
    res.status(404).json({ message: "Page not found" });
});

app.use((error, req, res, next) => {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 3000;

async function startServer() {
    await connectDB();
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    });
}
startServer();