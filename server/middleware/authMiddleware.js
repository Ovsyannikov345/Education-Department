const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    var token = req.header("Authorization");

    if (!token) {
        token = req.query.jwt;
    }

    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = { authMiddleware };
