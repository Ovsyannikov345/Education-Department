const compareStudents = (a, b) => {
    const aName = (a.Student.lastName + a.Student.firstName + a.Student.patronymic).toLowerCase();
    const bName = (b.Student.lastName + b.Student.firstName + b.Student.patronymic).toLowerCase();

    return aName.localeCompare(bName);
};

export default compareStudents;
