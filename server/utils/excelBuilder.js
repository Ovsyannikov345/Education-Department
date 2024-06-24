const ExcelJS = require("exceljs");

class ExcelBuilder {
    createEventsReportBook(events) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Events Report");

        worksheet.columns = [
            { header: "Name", key: "name", width: 30 },
            { header: "Date", key: "date", width: 20 },
            { header: "Planned Result", key: "plannedResult", width: 30 },
            { header: "Description", key: "description", width: 50 },
            { header: "Department", key: "department", width: 20 },
            { header: "Subdepartment", key: "subdepartment", width: 20 },
            { header: "Direction", key: "direction", width: 20 },
            { header: "Subdirection", key: "subdirection", width: 20 },
            { header: "Employees", key: "employees", width: 50 },
            { header: "Students", key: "students", width: 50 },
            { header: "Participants", key: "participants", width: 50 },
            { header: "Groups", key: "groups", width: 30 },
        ];

        events.forEach((event) => {
            worksheet.addRow({
                name: event.name,
                date: event.date,
                plannedResult: event.plannedResult,
                description: event.description,
                department: event.Department.name,
                subdepartment: event.Subdepartment.name,
                direction: event.Direction.name,
                subdirection: event.Subdirection.name,
                employees: event.Employees.map((e) => `${e.lastName} ${e.firstName} ${e.patromynic}`).join("; "),
                students: event.Students.map((s) => `${s.lastName} ${s.firstName} ${s.patromynic} (${s.Group.name})`).join("; "),
                participants: event.Participants.map(
                    (p) => `${p.lastName} ${p.firstName} ${p.patromynic} (${p.organization}, ${p.position})`
                ).join("; "),
                groups: event.Groups.map((g) => g.name).join("; "),
            });
        });

        return workbook;
    }
}

module.exports = new ExcelBuilder();
