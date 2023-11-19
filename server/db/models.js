const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Event = sequelize.define(
    "Event",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        subdepartmentId: {
            type: DataTypes.INTEGER,
        },
        directionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        subdirectionId: {
            type: DataTypes.INTEGER,
        },
        date: {
            type: DataTypes.DATE,
        },
        plannedResult: {
            type: DataTypes.STRING,
        },
        completionStatus: {
            type: DataTypes.BOOLEAN,
        },
        description: {
            type: DataTypes.STRING,
        },
    },
    { timestamps: false }
);

const Department = sequelize.define(
    "Department",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
    },
    { timestamps: false }
);

const Subdepartment = sequelize.define(
    "Subdepartment",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { timestamps: false }
);

const Direction = sequelize.define(
    "Direction",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
    },
    { timestamps: false }
);

const Subdirection = sequelize.define(
    "Subdirection",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        directionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { timestamps: false }
);

const Participant = sequelize.define(
    "Participant",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        patronymic: {
            type: DataTypes.STRING,
        },
        position: {
            type: DataTypes.STRING,
        },
        organization: {
            type: DataTypes.STRING,
        },
    },
    { timestamps: false }
);

const EventParticipants = sequelize.define(
    "EventParticipants",
    {
        eventId: {
            type: DataTypes.INTEGER,
            references: {
                model: Event,
                key: "id",
            },
            allowNull: false,
        },
        participantId: {
            type: DataTypes.INTEGER,
            references: {
                model: Participant,
                key: "id",
            },
            allowNull: false,
        },
    },
    { timestamps: false }
);

const Employee = sequelize.define(
    "Employee",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        patronymic: {
            type: DataTypes.STRING,
        },
    },
    { timestamps: false }
);

const Student = sequelize.define(
    "Student",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        patronymic: {
            type: DataTypes.STRING,
        },
        groupName: {
            type: DataTypes.STRING,
        },
    },
    { timestamps: false }
);

const EventOrganizers = sequelize.define(
    "EventOrganizers",
    {
        eventId: {
            type: DataTypes.INTEGER,
            references: {
                model: Event,
                key: "id",
            },
            allowNull: false,
        },
        employeeId: {
            type: DataTypes.INTEGER,
            references: {
                model: Employee,
                key: "id",
            },
        },
        studentId: {
            type: DataTypes.INTEGER,
            references: {
                model: Student,
                key: "id",
            },
        },
    },
    { timestamps: false }
);

const Offense = sequelize.define(
    "Offense",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        article: {
            type: DataTypes.STRING,
        },
        offenseDate: {
            type: DataTypes.DATE,
        },
        courtDecision: {
            type: DataTypes.STRING,
        },
        penalty: {
            type: DataTypes.STRING,
        },
    },
    { timestamps: false }
);

Department.hasMany(Event, {
    foreignKey: "departmentId",
});
Event.belongsTo(Department, {
    foreignKey: "departmentId",
    sourceKey: "id",
});

Subdepartment.hasMany(Event, {
    foreignKey: "subdepartmentId",
});
Event.belongsTo(Subdepartment, {
    foreignKey: "subdepartmentId",
    sourseKey: "id",
});

Department.hasMany(Subdepartment, {
    foreignKey: "departmentId",
});
Subdepartment.belongsTo(Department, {
    foreignKey: "departmentId",
    sourceKey: "id",
});

Direction.hasMany(Event, {
    foreignKey: "directionId",
});
Event.belongsTo(Direction, {
    foreignKey: "directionId",
    sourceKey: "id",
});

Subdirection.hasMany(Event, {
    foreignKey: "subdirectionId",
});
Event.belongsTo(Subdirection, {
    foreignKey: "subdirectionId",
    sourceKey: "id",
});

Direction.hasMany(Subdirection, {
    foreignKey: "directionId",
});
Subdirection.belongsTo(Direction, {
    foreignKey: "directionId",
    sourceKey: "id",
});

Student.hasMany(Offense, {
    foreignKey: "studentId",
});
Offense.belongsTo(Student, {
    foreignKey: "studentId",
    sourceKey: "id",
});

module.exports = {
    Event,
    Department,
    Subdepartment,
    Direction,
    Subdirection,
    Participant,
    EventParticipants,
    Employee,
    Student,
    EventOrganizers,
    Offense,
};
