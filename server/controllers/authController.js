require("dotenv").config();
const { User, RefreshToken } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                return res.status(401).json({ error: "Authentication failed" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: "Authentication failed" });
            }

            if (user.blockedAt != null) {
                return res.status(403).json({ error: "Account is blocked" });
            }

            const accessToken = jwt.sign({ userId: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "10m",
            });
            const refreshToken = jwt.sign(
                { userId: user.id, role: user.role },
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: "24h",
                }
            );

            await RefreshToken.create({ token: refreshToken });

            res.json({ accessToken: accessToken, refreshToken: refreshToken, role: user.role, userId: user.id });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Login failed" });
        }
    }

    async refreshToken(req, res) {
        try {
            const refreshToken = req.body.token;

            if (refreshToken == null) {
                return res.sendStatus(401);
            }

            if ((await RefreshToken.findOne({ where: { token: refreshToken } })) == null) {
                return res.sendStatus(403);
            }

            try {
                const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

                const accessToken = jwt.sign(
                    { userId: decoded.userId, role: decoded.role },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "10m",
                    }
                );

                return res.json({ accessToken: accessToken });
            } catch (error) {
                RefreshToken.destroy({ where: { token: refreshToken } });
                return res.status(403).json({ error: "Invalid token" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Refresh failed" });
        }
    }

    async logout(req, res) {
        try {
            const refreshToken = req.body.token;

            await RefreshToken.destroy({ where: { token: refreshToken } });

            return res.sendStatus(204);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Logout failed" });
        }
    }
}

module.exports = new AuthController();
