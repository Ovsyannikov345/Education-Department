require("dotenv").config();
const express = require("express");
const sequelize = require("./db/index");
const router = require("./routers/index");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
const { checkAndCreateDatabase } = require("./db/checkAndCreateDatabase");
const { clearRefreshTokens } = require("./db/clearRefreshTokens");
const { initializeDatabase } = require("./db/initializeDatabase");

app.use(cors());
app.use(express.json());

app.use(router);

const start = async () => {
    try {
        console.log("[INFO] Database check started...");
        await checkAndCreateDatabase();

        await sequelize.authenticate();
        await sequelize.sync({ alter: true });

        await clearRefreshTokens();
        await initializeDatabase();

        setInterval(() => {
            clearRefreshTokens();
        }, 43200000);

        app.listen(PORT, () => console.log(`[INFO] Server started on port: ${PORT}`));
    } catch (err) {
        console.log("[ERROR] Error while starting server");
        console.log(err);
    }
};

start();
