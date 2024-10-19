const { Department, Subdepartment, Direction, Subdirection, User } = require("./models");

const initialDatabaseData = {
    departments: [
        {
            name: "Деканат",
            Subdepartments: [
                { name: "Автомеханический факультет" },
                { name: "Машиностроительный факультет" },
                { name: "Строительный факультет" },
                { name: "Электротехнический факультет" },
                { name: "Инженерно-экономический факультет" },
                { name: "Экономический факультет" },
            ],
        },
        { name: "ОИВР" },
        { name: "СППС" },
        { name: "Музей" },
        { name: "Спортклуб" },
        { name: "Воспитатели" },
        { name: "Студенческий клуб" },
        { name: "Военно-патриотический клуб" },
        { name: "Волонтерский клуб" },
        { name: "Штаб трудовых дел" },
        {
            name: "Студенческий совет",
            Subdepartments: [
                { name: "Университетский" },
                { name: "Автомеханический факультет" },
                { name: "Машиностроительный факультет" },
                { name: "Строительный факультет" },
                { name: "Электротехнический факультет" },
                { name: "Инженерно-экономический факультет" },
                { name: "Экономический факультет" },
                { name: "1-е общежитие" },
                { name: "2-е общежитие" },
                { name: "3-е общежитие" },
            ],
        },
        { name: "Общежитие 1" },
        { name: "Общежитие 2" },
        { name: "Общежитие 3" },
        { name: "БРСМ" },
        { name: "ППО студентов" },
        { name: "МДД" },
    ],
    directions: [
        { name: "Мероприятия по реализации основных составляющих воспитания" },
        { name: "Работа с общественными организациями и молодежным активом" },
        { name: "Работа по месту жительства обучающегося" },
        { name: "Работа с родителями (законными представителями)" },
        { name: "Работа с несовершеннолетними, сиротами и другими категориями обучающихся" },
        { name: "Работа с иностранными студентами" },
        { name: "Методическое обеспечение воспитательной работы" },
        { name: "Ресурсное обеспечение воспитательной работы" },
        { name: "Организационно-информационное обеспечение воспитательной работы" },
        { name: "Идеологическая работа с трудовым коллективом" },
    ],
    subdirections: [
        { name: "Идеологическое воспитание" },
        { name: "Гражданское и патриотическое воспитание" },
        { name: "Духовно-нравственное воспитание" },
        { name: "Эстетическое воспитание" },
        { name: "Воспитание психологической культуры" },
        { name: "Воспитание физической культуры" },
        { name: "Формирование навыков здорового образа жизни" },
        { name: "Семейное и гендерное воспитание" },
        { name: "Трудовое и профессиональное воспитание" },
        { name: "Воспитание отношения к окружающей среде" },
        { name: "Воспитание культуры безопасности жизнедеятельности" },
        { name: "Воспитание культуры быта и досуга" },
        { name: "Поликультурное воспитание" },
        { name: "Экономическое воспитание" },
    ],
    users: [
        {
            email: "admin@gmail.com",
            password: "$2a$12$zNPJztTKT6h/nq7I9xOYXuWFYdYxVxrUDOMIiMhhLWXy8RUXau6qy",
            lastName: "Admin",
            firstName: "Account",
            role: "admin",
        },
    ],
};

const initializeDepartments = async () => {
    try {
        const departments = await Department.findAll();

        if (departments.length > 0) {
            console.log("[INFO] Departments initialization - SKIPPED");
            return;
        }

        await Department.bulkCreate(initialDatabaseData.departments, {
            include: [{ model: Subdepartment }],
        });

        console.log("[INFO] Departments initialization - OK");
    } catch (err) {
        console.log("[ERROR] Error while initializing Departments table");
        console.log(err);
    }
};

const initializeDirections = async () => {
    try {
        const directions = await Direction.findAll();

        if (directions.length > 0) {
            console.log("[INFO] Directions initialization - SKIPPED");
            return;
        }

        await Direction.bulkCreate(initialDatabaseData.directions);

        console.log("[INFO] Directions initialization - OK");
    } catch (err) {
        console.log("[ERROR] Error while initializing Directions table");
        console.log(err);
    }
};

const initializeSubdirections = async () => {
    try {
        const subdirections = await Subdirection.findAll();

        if (subdirections.length > 0) {
            console.log("[INFO] Subdirections initialization - SKIPPED");
            return;
        }

        await Subdirection.bulkCreate(initialDatabaseData.subdirections);

        console.log("[INFO] Subdirections initialization - OK");
    } catch (err) {
        console.log("[ERROR] Error while initializing Subdirections table");
        console.log(err);
    }
};

const initializeUsers = async () => {
    try {
        const users = await User.findAll();

        if (users.length > 0) {
            console.log("[INFO] Users initialization - SKIPPED");
            return;
        }

        await User.bulkCreate(initialDatabaseData.users);

        console.log("[INFO] Users initialization - OK");
    } catch (err) {
        console.log("[ERROR] Error while initializing Users table");
        console.log(err);
    }
};

const initializeDatabase = async () => {
    console.log("[INFO] Initializing database...");

    await initializeDepartments();
    await initializeDirections();
    await initializeSubdirections();
    await initializeUsers();

    console.log("[INFO] Database initialization finished");
};

module.exports = { initializeDatabase };
