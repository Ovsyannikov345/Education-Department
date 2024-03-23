const validateEvent = (values, department, direction) => {
    const errors = {};

    if (!values.departmentId) {
        errors.departmentId = "Обязательное поле";
    } else if (department.Subdepartments && department.Subdepartments.length > 0 && !values.subdepartmentId) {
        errors.subdepartmentId = "Обязательное поле";
    }

    if (!values.directionId) {
        errors.directionId = "Обязательное поле";
    }

    if (!values.name) {
        errors.name = "Обязательное поле";
    } else if (values.name.length > 100) {
        errors.name = "Длина не более 100 символов";
    }

    if (values.description.length > 255) {
        errors.description = "Длина не более 255 символов";
    }

    if (values.plannedResult.length > 255) {
        errors.plannedResult = "Длина не более 255 символов";
    }

    if (!values.date) {
        errors.date = "Обязательное поле";
    } else if (values.date === "Invalid date") {
        errors.date = "Некорректное значение";
    }

    if (!values.time) {
        errors.time = "Обязательное поле";
    }
    console.log(errors);

    return errors;
};

export default validateEvent;
