const { Client } = require("pg");

const checkAndCreateDatabase = async () => {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    try {
        await client.connect();

        const response = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`);

        if (response.rowCount === 0) {
            console.log(`[INFO] Database ${process.env.DB_NAME} does not exist. Creating...`);
            await client.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
            console.log(`[INFO] Database ${process.env.DB_NAME} created successfully`);
        } else {
            console.log(`[INFO] Database ${process.env.DB_NAME} already exists`);
        }
    } catch (err) {
        console.log("[ERROR] Error while checking/creating database");
        console.log(err);
    } finally {
        await client.end();
    }
};

module.exports = { checkAndCreateDatabase };
