const { RefreshToken } = require("./models");
const jwt = require("jsonwebtoken");

const clearRefreshTokens = async () => {
    const tokens = await RefreshToken.findAll();

    tokens.forEach((token) => {
        try {
            jwt.verify(token.token, process.env.REFRESH_TOKEN_SECRET);
        } catch (err) {
            RefreshToken.destroy({ where: { id: token.id } });
        }
    });

    console.log("Refresh tokens cleared");
};

module.exports = { clearRefreshTokens };
