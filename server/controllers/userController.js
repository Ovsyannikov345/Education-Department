const sequelize = require("../db");
const { User } = require("../db/models");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

class UserController {
    async getAll(req, res) {
        try {
            const users = await User.findAll({ attributes: { exclude: ["password"] } });

            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Ошибка во время загрузки пользователей" });
        }
    }

    async create(req, res) {
        try {
            const user = { ...req.body };

            if (await User.findOne({ where: { email: user.email } })) {
                return res.status(400).json({ error: "Эл.почта уже используется" });
            }

            await sequelize.transaction(async (t) => {
                user.password = crypto.randomBytes(5).toString("hex");

                const hashedPassword = await bcrypt.hash(user.password, 10);

                await User.create({ ...user, password: hashedPassword }, { transaction: t });

                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_ADDRESS,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                });

                try {
                    await transporter.sendMail({
                        from: {
                            name: "Отдел по воспитательной работе",
                            address: process.env.EMAIL_ADDRESS,
                        },
                        to: user.email,
                        subject: "Регистрация в отделе по воспитательной работе",
                        html:
                            "<p>Ваш пароль для входа в аккаунт на сайте отдела по воспитательной работе:</p>" +
                            `<p><strong>${user.password}</strong></p>` +
                            "<p>В дальшейшем пароль можно будет изменить на сайте.</p>",
                    });
                } catch (emailError) {
                    console.log("error while sending email");
                    throw emailError;
                }

                console.log("Email sent to " + user.email);
            });

            const createdUser = await User.findOne({
                where: { email: user.email },
                attributes: { exclude: ["password"] },
            });

            return res.status(200).json(createdUser);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Неизвестная ошибка во время создания пользователя" });
        }
    }

    async block(req, res) {
        try {
            const { id } = req.params;

            if (isNaN(id)) {
                return res.status(400).json({ error: "Неверный id пользователя" });
            }

            const user = await User.findOne({ where: { id: id } });

            if (user == null) {
                return res.status(404).json({ error: "Пользователя не существует" });
            }

            if (user.id === id) {
                return res.status(400).json({ error: "Невозможно заблокировать себя" });
            }

            if (user.blockedAt != null) {
                return res.status(400).json({ error: "Пользователь уже заблокирован" });
            }

            await User.update({ blockedAt: Date.now() }, { where: { id: id } });

            const blockDate = (await User.findOne({ where: { id: id } })).blockedAt;

            return res.status(200).json({ blockedAt: blockDate });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Неизвестная ошибка во время блокировки пользователя" });
        }
    }

    async unblock(req, res) {
        try {
            const { id } = req.params;

            if (isNaN(id)) {
                return res.status(400).json({ error: "Неверный id пользователя" });
            }

            const user = await User.findOne({ where: { id: id } });

            if (user == null) {
                return res.status(404).json({ error: "Пользователя не существует" });
            }

            if (user.id === id) {
                return res.status(400).json({ error: "Невозможно разблокировать себя" });
            }

            if (user.blockedAt == null) {
                return res.status(400).json({ error: "Пользователь не заблокирован" });
            }

            await User.update({ blockedAt: null }, { where: { id: id } });

            return res.sendStatus(204);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Неизвестная ошибка во время разблокировки пользователя" });
        }
    }

    async changePassword(req, res) {
        try {
            const { id } = req.params;

            if (isNaN(id)) {
                return res.status(400).json({ error: "Неверный id пользователя" });
            }

            const user = await User.findOne({ where: { id: id } });

            if (user == null) {
                return res.status(404).json({ error: "Пользователя не существует" });
            }

            if (req.userId !== user.id) {
                return res.status(403).json({ error: "Невозможно сменить чужой пароль" });
            }

            const oldPassword = req.body.oldPassword;

            const passwordMatch = await bcrypt.compare(oldPassword, user.password);

            if (!passwordMatch) {
                return res.status(400).json({ error: "Неверный старый пароль" });
            }

            const newPassword = await bcrypt.hash(req.body.newPassword, 10);

            await User.update({ password: newPassword }, { where: { id: id } });

            return res.sendStatus(204);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Неизвестная ошибка во время смены пароля" });
        }
    }

    async sendPasswordToEmail(req, res) {
        try {
            const email = req.body.email;

            if ((await User.findOne({ where: { email: email } })) == null) {
                return res.status(404).json({ error: "Неверный адрес эл. почты" });
            }

            const randomPassword = crypto.randomBytes(5).toString("hex");

            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            await sequelize.transaction(async (t) => {
                await User.update({ password: hashedPassword }, { where: { email: email } }, { transaction: t });

                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_ADDRESS,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                });

                await transporter.sendMail({
                    from: {
                        name: "Отдел по воспитательной работе",
                        address: process.env.EMAIL_ADDRESS,
                    },
                    to: email,
                    subject: "Сброс пароля от аккаунта",
                    html:
                        "<p>Ваш пароль для входа в аккаунт на сайте отдела по воспитательной работе:</p>" +
                        `<p><strong>${randomPassword}</strong></p>` +
                        "<p>В дальшейшем пароль можно будет изменить на сайте.</p>",
                });

                console.log("Email sent to " + email);
            });

            return res.sendStatus(204);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Неизвестная ошибка во время сброса пароля" });
        }
    }
}

module.exports = new UserController();
