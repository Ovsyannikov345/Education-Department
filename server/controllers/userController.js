const { User } = require("../db/models");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

class UserController {
    async getAll(req, res) {
        try {
            const users = await User.findAll({ attributes: { exclude: ["password"] } });

            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Error while getting users" });
        }
    }

    async create(req, res) {
        try {
            const user = { ...req.body };

            if (await User.findOne({ where: { email: user.email } })) {
                return res.status(400).json({ error: "Email is taken" });
            }

            user.password = crypto.randomBytes(5).toString("hex");

            const hashedPassword = await bcrypt.hash(user.password, 10);

            await User.create({ ...user, password: hashedPassword });

            const testEmailAccount = await nodemailer.createTestAccount();

            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: testEmailAccount.user,
                    pass: testEmailAccount.pass,
                },
            });

            const result = await transporter.sendMail({
                from: "Отдел по воспитательной работе",
                to: user.email,
                subject: "Регистрация в отделе по воспитательной работе",
                html:
                    "<p>Ваш пароль для входа в аккаунт на сайте отдела по воспитательной работе:</p>" +
                    `<p><strong>${user.password}</strong></p>` +
                    "<p>В дальшейшем пароль можно будет изменить на сайте.</p>",
            });

            // TODO real mail.
            console.log("Email sent. Preview URL: " + nodemailer.getTestMessageUrl(result));

            const createdUser = await User.findOne({
                where: { email: user.email },
                attributes: { exclude: ["password"] },
            });

            return res.status(200).json(createdUser);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Error while creating a user" });
        }
    }

    async block(req, res) {
        try {
            const { id } = req.params;

            if (isNaN(id)) {
                return res.sendStatus(400);
            }

            const user = await User.findOne({ where: { id: id } });

            if (user == null) {
                return res.sendStatus(404);
            }

            if (user.id === id) {
                return res.status(400).json({ error: "Невозможно заблокировать себя" });
            }

            if (user.blockedAt != null) {
                return res.status(400).json({ error: "User is already blocked" });
            }

            await User.update({ blockedAt: Date.now() }, { where: { id: id } });

            const blockDate = (await User.findOne({ where: { id: id } })).blockedAt;

            return res.status(200).json({ blockedAt: blockDate });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Error while blocking the user" });
        }
    }

    async unblock(req, res) {
        try {
            const { id } = req.params;

            if (isNaN(id)) {
                return res.sendStatus(400);
            }

            const user = await User.findOne({ where: { id: id } });

            if (user == null) {
                return res.sendStatus(404);
            }

            if (user.id === id) {
                return res.status(400).json({ error: "Невозможно разблокировать себя" });
            }

            if (user.blockedAt == null) {
                return res.status(400).json({ error: "User is not blocked" });
            }

            await User.update({ blockedAt: null }, { where: { id: id } });

            return res.sendStatus(204);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Error while unblocking the user" });
        }
    }

    async changePassword(req, res) {
        try {
            const { id } = req.params;

            if (isNaN(id)) {
                return res.sendStatus(400);
            }

            const user = await User.findOne({ where: { id: id } });

            if (user == null) {
                return res.sendStatus(404);
            }

            if (req.userId !== user.id) {
                return res.sendStatus(403);
            }

            const oldPassword = req.body.oldPassword;

            const passwordMatch = await bcrypt.compare(oldPassword, user.password);

            if (!passwordMatch) {
                return res.status(400).json({ error: "Invalid old password" });
            }

            const newPassword = await bcrypt.hash(req.body.newPassword, 10);

            await User.update({ password: newPassword }, { where: { id: id } });

            return res.sendStatus(204);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Error while changing password" });
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

            await User.update({ password: hashedPassword }, { where: { email: email } });

            const testEmailAccount = await nodemailer.createTestAccount();

            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: testEmailAccount.user,
                    pass: testEmailAccount.pass,
                },
            });

            const result = await transporter.sendMail({
                from: "Отдел по воспитательной работе",
                to: email,
                subject: "Сброс пароля от аккаунта",
                html:
                    "<p>Ваш пароль для входа в аккаунт на сайте отдела по воспитательной работе:</p>" +
                    `<p><strong>${randomPassword}</strong></p>` +
                    "<p>В дальшейшем пароль можно будет изменить на сайте.</p>",
            });

            // TODO real mail.
            console.log("Email sent. Preview URL: " + nodemailer.getTestMessageUrl(result));

            return res.sendStatus(204);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Error while reseting password" });
        }
    }
}

module.exports = new UserController();
