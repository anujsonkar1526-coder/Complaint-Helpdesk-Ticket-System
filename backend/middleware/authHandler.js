const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authHandler(req, res, next) {
    try {
        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).json({ message: "Please login first" });
        }

        const token = header.split(" ")[1];
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(data.id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

function allowRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
}

module.exports = { authHandler, allowRoles };