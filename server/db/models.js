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
            type: DataTypes.STRING(100),
            allowNull: false,
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
            allowNull: false,
        },
        plannedResult: {
            type: DataTypes.STRING,
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
            type: DataTypes.STRING(50),
            allowNull: false,
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
            type: DataTypes.STRING(100),
            allowNull: false,
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
            type: DataTypes.STRING(100),
            allowNull: false,
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
            type: DataTypes.STRING(100),
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
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        patronymic: {
            type: DataTypes.STRING(50),
        },
        position: {
            type: DataTypes.STRING(400),
        },
        organization: {
            type: DataTypes.STRING(400),
            allowNull: false,
        },
    },
    { timestamps: false }
);

const EventParticipants = sequelize.define("EventParticipants", {}, { timestamps: false });

const EventGroups = sequelize.define("EventGroups", {}, { timestamps: false });

const Employee = sequelize.define(
    "Employee",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        patronymic: {
            type: DataTypes.STRING(50),
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
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        patronymic: {
            type: DataTypes.STRING(50),
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { timestamps: false }
);

const Group = sequelize.define(
    "Group",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    },
    { timestamps: false }
);

const EventOrganizers = sequelize.define(
    "EventOrganizers",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        offenseDate: {
            type: DataTypes.DATE,
            allowNull: false,
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

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        patronymic: {
            type: DataTypes.STRING(50),
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        blockedAt: {
            type: DataTypes.DATE,
        },
    },
    { updatedAt: false }
);

const RefreshToken = sequelize.define(
    "RefreshToken",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: DataTypes.STRING,
        },
    },
    { updatedAt: false }
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

Event.belongsToMany(Employee, {
    through: "EventOrganizers",
});
Employee.belongsToMany(Event, {
    through: "EventOrganizers",
});

Event.belongsToMany(Student, {
    through: "EventOrganizers",
});
Student.belongsToMany(Event, {
    through: "EventOrganizers",
});

Event.belongsToMany(Participant, {
    through: "EventParticipants",
});

Participant.belongsToMany(Event, {
    through: "EventParticipants",
});

Student.belongsTo(Group, {
    foreignKey: "groupId",
    sourceKey: "id",
});

Group.hasMany(Student, {
    foreignKey: "groupId",
});

Group.belongsToMany(Event, {
    through: "EventGroups",
});

Event.belongsToMany(Group, {
    through: "EventGroups",
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
    Employee,
    Student,
    Group,
    EventGroups,
    Offense,
    User,
    RefreshToken,
};
