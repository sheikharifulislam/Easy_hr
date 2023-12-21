const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../db");

const Employee = sequelize.define("Employees", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3],
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3],
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
});

module.exports = Employee;
