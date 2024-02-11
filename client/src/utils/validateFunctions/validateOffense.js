const validateOffense = ({ studentId, offenseDate, article, courtDecision, penalty }) => {
    const errors = {};

    if (!studentId) {
        errors.studentId = "Обязательное поле";
    }

    if (!offenseDate) {
        errors.offenseDate = "Обязательное поле";
    } else if (offenseDate === "Invalid date") {
        errors.offenseDate = "Некорректное значение";
    }

    if (!article) {
        errors.article = "Обязательное поле";
    } else if (article.length > 100) {
        errors.article = "Длина не более 100 символов";
    }

    if (courtDecision.length > 255) {
        errors.courtDecision = "Длина не более 255 символов";
    }

    if (penalty.length > 255) {
        errors.penalty = "Длина не более 255 символов";
    }

    return errors;
};

export default validateOffense;
