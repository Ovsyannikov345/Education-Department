const { RefreshToken } = require("./models");
const jwt = require("jsonwebtoken");

const clearRefreshTokens = async () => {
    try {
        const tokens = await RefreshToken.findAll();

        const tokensCount = tokens.length;

        tokens.forEach(async (token) => {
            try {
                jwt.verify(token.token, process.env.REFRESH_TOKEN_SECRET);
            } catch (err) {
                await RefreshToken.destroy({ where: { id: token.id } });
            }
        });

        const updatedTokens = await RefreshToken.findAll();

        console.log(`[INFO] Refresh tokens cleared. Deleted ${tokensCount - updatedTokens.length} tokens`);
    } catch (e) {
        console.log("[ERROR] Error while clearing tokens");
        console.log(e);
    }
};

module.exports = { clearRefreshTokens };
