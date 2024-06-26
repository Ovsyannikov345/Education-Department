const {
    Event,
    Department,
    Subdepartment,
    Direction,
    Subdirection,
    Employee,
    Student,
    Participant,
    Group,
    Offense,
} = require("../db/models");
const moment = require("moment");
const excelBuilder = require("../utils/excelBuilder");

class ReportController {
    async getEventsReport(req, res) {
        const query = req.query;

        try {
            const events = await Event.findAll({
                include: [
                    { model: Department },
                    { model: Direction },
                    { model: Subdepartment },
                    { model: Subdirection },
                    { model: Employee },
                    { model: Student, include: [{ model: Group }] },
                    { model: Participant },
                    { model: Group },
                ],
            });

            if (query.selectedSubdepartments) {
                const subdepartments = await Subdepartment.findAll();

                const subdepartmentIds = query.selectedSubdepartments.map((id) => parseInt(id));

                query.selectedSubdepartments = subdepartments.filter((s) => subdepartmentIds.includes(s.id)).map((s) => s.name);
            }

            const startDate = moment(query.startDate);
            const endDate = moment(query.endDate).add(23, "hours").add(59, "minutes").add(59, "seconds");

            const filteredEvents = events.filter(
                (event) =>
                    (!query.name || event.name.toLowerCase().includes(query.name.toLowerCase())) &&
                    (!query.selectedDepartments ||
                        query.selectedDepartments.length === 0 ||
                        query.selectedDepartments.map((id) => parseInt(id)).includes(event.departmentId)) &&
                    (!query.selectedSubdepartments ||
                        query.selectedSubdepartments.length === 0 ||
                        !event.subdepartmentId ||
                        query.selectedSubdepartments.includes(event.Subdepartment.name)) &&
                    (!query.selectedDirections ||
                        query.selectedDirections.length === 0 ||
                        query.selectedDirections.map((id) => parseInt(id)).includes(event.directionId)) &&
                    (!query.selectedSubdirections ||
                        query.selectedSubdirections.length === 0 ||
                        query.selectedSubdirections.map((id) => parseInt(id)).includes(event.subdirectionId)) &&
                    (!query.selectedGroups ||
                        query.selectedGroups.length === 0 ||
                        event.Groups.some((g) => query.selectedGroups.map((id) => parseInt(id)).includes(g.id))) &&
                    (!query.startDate || moment(event.date, "YYYY-MM-DD").isSameOrAfter(startDate)) &&
                    (!query.endDate || moment(event.date, "YYYY-MM-DD").isSameOrBefore(endDate))
            );

            const workbook = excelBuilder.createEventsReportBook(filteredEvents);

            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", `attachment; filename=${moment().format("DD-MM-YYYY_HH:mm")}.xlsx`);

            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Неизвестная ошибка во время создания отчета" });
        }
    }

    async getOffensesReport(req, res) {
        const query = req.query;

        try {
            const offenses = await Offense.findAll({
                include: [{ model: Student, include: [{ model: Group }] }],
            });

            const startDate = moment(query.startDate);
            const endDate = moment(query.endDate).add(23, "hours").add(59, "minutes").add(59, "seconds");

            const filteredOffenses = offenses.filter(
                (offense) =>
                    (!query.text ||
                        [offense.Student.firstName, offense.Student.lastName, offense.Student.patronymic]
                            .join(" ")
                            .toLowerCase()
                            .includes(query.text.toLowerCase()) ||
                        offense.Student.Group.name.toLowerCase().includes(query.text.toLowerCase())) &&
                    (!query.startDate || moment(offense.offenseDate, "YYYY-MM-DD").isSameOrAfter(startDate)) &&
                    (!query.endDate || moment(offense.offenseDate, "YYYY-MM-DD").isSameOrBefore(endDate))
            );

            const workbook = excelBuilder.createOffensesReportBook(filteredOffenses);

            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", `attachment; filename=${moment().format("DD-MM-YYYY_HH:mm")}.xlsx`);

            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Неизвестная ошибка во время создания отчета" });
        }
    }
}

module.exports = new ReportController();
