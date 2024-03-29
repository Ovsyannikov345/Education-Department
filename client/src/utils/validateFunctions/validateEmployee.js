const validateEmployee = ({ lastName, firstName, patronymic }) => {
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

    return errors;
};

export default validateEmployee;
