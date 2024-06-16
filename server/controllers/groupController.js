const { Group, Student, EventGroups } = require("../db/models");

class GroupController {
    async getAll(req, res) {
        try {
            const groups = await Group.findAll();

            return res.json(groups);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время загрузки групп" });
        }
    }

    async create(req, res) {
        try {
            const group = req.body;

            const groups = await Group.findAll();

            if (groups.some((g) => g.name === group.name)) {
                return res.status(400).json({ error: "Группа уже существует" });
            }

            const createdGroup = await Group.create(group);

            return res.status(201).json(createdGroup);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время создания группы" });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Неверный id группы" });
        }

        try {
            if ((await Group.findOne({ where: { id: id } })) == null) {
                return res.status(404).json({ error: "Группы не существует" });
            }

            if (await Student.findOne({ where: { groupId: id } })) {
                return res.status(400).json({ error: "К группе привязан студент" });
            }

            if (await EventGroups.findOne({ where: { GroupId: id } })) {
                return res.status(400).json({ error: "Группа использеутся в других мероприятиях" });
            }

            await Group.destroy({ where: { id: id } });

            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({ error: "Неизвестная ошибка во время удаления группы" });
        }
    }
}

module.exports = new GroupController();
