const ExcelJS = require("exceljs");
const moment = require("moment");

class ExcelBuilder {
    createEventsReportBook(events) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Events Report");

        worksheet.columns = [
            { header: "Название", key: "name", width: 25 },
            { header: "Дата проведения", key: "date", width: 18 },
            { header: "Планируемый результат", key: "plannedResult", width: 35 },
            { header: "Описание", key: "description", width: 35 },
            { header: "Структура", key: "department", width: 27 },
            { header: "Подразделение", key: "subdepartment", width: 27 },
            { header: "Направление", key: "direction", width: 30 },
            { header: "Составляющая", key: "subdirection", width: 32 },
            { header: "Участвующие группы", key: "groups", width: 20 },
            { header: "Сотрудники", key: "employees", width: 30 },
            { header: "Студенты", key: "students", width: 30 },
            { header: "Приглашенные лица", key: "participants", width: 30 },
        ];

        let rowIndex = 1;

        events.forEach((event) => {
            const requiredRowsCount = Math.max(
                event.Employees.length,
                event.Students.length,
                event.Participants.length,
                event.Groups.length,
                1
            );

            for (let i = 0; i < requiredRowsCount; i++) {
                let row = {
                    employees: event.Employees[i]
                        ? [event.Employees[i].lastName, event.Employees[i].firstName, event.Employees[i].patronymic]
                              .filter(Boolean)
                              .join(" ")
                        : "",
                    students: event.Students[i]
                        ? [event.Students[i].lastName, event.Students[i].firstName, event.Students[i].patronymic]
                              .filter(Boolean)
                              .join(" ") + `\n(${event.Students[i].Group.name})`
                        : "",
                    participants: event.Participants[i]
                        ? [event.Participants[i].lastName, event.Participants[i].firstName, event.Participants[i].patronymic]
                              .filter(Boolean)
                              .join(" ") +
                          `\n(${[event.Participants[i].organization, event.Participants[i].position].filter(Boolean).join(", ")})`
                        : "",
                    groups: event.Groups[i] ? event.Groups[i].name : "",
                };

                if (i === 0) {
                    row = {
                        ...row,
                        name: event.name,
                        date: moment(event.date).format("DD.MM.YYYY HH:mm"),
                        plannedResult: event.plannedResult ?? null,
                        description: event.description ?? null,
                        department: event.Department.name,
                        subdepartment: event.Subdepartment?.name,
                        direction: event.Direction.name,
                        subdirection: event.Subdirection?.name,
                    };
                }

                worksheet.addRow(row);
                rowIndex++;
            }

            worksheet.getRow(rowIndex).eachCell({ includeEmpty: true }, (cell) => (cell.border = { bottom: { style: "thin" } }));
        });

        worksheet.columns.forEach((column) => {
            column.eachCell((cell) => {
                cell.alignment = { wrapText: true };
            });
        });

        worksheet.columns.forEach((column) => {
            let maxLength = column.header.length;

            column.eachCell({ includeEmpty: true }, (cell) => {
                const cellValue = cell.value ? cell.value.toString() : "";
                maxLength = Math.max(
                    maxLength,
                    cellValue.split("\n").reduce((max, line) => Math.max(max, line.length), 0)
                );
            });

            column.width = maxLength + 2 < 50 ? maxLength + 2 : 50;
        });

        worksheet.columns.forEach((column) =>
            column.eachCell((cell) => {
                cell.border = {
                    ...cell.border,
                    right: { style: "medium" },
                };
            })
        );

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
            cell.alignment = { vertical: "middle", horizontal: "center" };
            cell.border = {
                top: { style: "thick" },
                bottom: { style: "medium" },
                right: { style: "medium" },
            };
        });

        worksheet.getRow(1).height = 35;

        return workbook;
    }
}

module.exports = new ExcelBuilder();
