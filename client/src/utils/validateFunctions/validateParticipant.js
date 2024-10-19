const validateParticipant = ({ lastName, firstName, patronymic, organization, position }) => {
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

    if (!organization) {
        errors.organization = "Обязательное поле";
    } else if (organization.length > 400) {
        errors.organization = "Длина не более 400 символов";
    }

    if (position && position.length > 400) {
        errors.position = "Длина не более 400 символов";
    }

    return errors;
};

export default validateParticipant;
