const validateStudent = ({ lastName, firstName, patronymic, groupName }) => {
    const errors = {};

    if (!lastName) {
        errors.lastName = "Обязательное поле";
    } else if (lastName.length > 50) {
        errors.lastName = "Длина не более 50 символов";
    }

    if (!firstName) {
        errors.firstName = "Обязательное поле";
    } else if (firstName.length > 50) {
        errors.firstName = "Длина не более 50 символов";
    }

    if (patronymic && patronymic.length > 50) {
        errors.patronymic = "Длина не более 50 символов";
    }

    if (!groupName) {
        errors.groupName = "Обязательное поле";
    } else if (groupName.length > 15) {
        errors.groupName = "Длина не более 15 символов";
    } else if (!/^[А-ЯA-Z]+-\d+$/i.test(groupName)) {
        errors.groupName = "Неверный формат (Группа-номер)";
    }

    return errors;
};

export default validateStudent;
