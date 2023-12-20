const Employee = require("../models");

exports.createSingleEmployee = (data) => {
    return Employee.create(data);
};

exports.findAllEmployees = ({ page, limit }) => {
    return Employee.findAll({
        order: [["createdAt", "DESC"]],
        limit,
        offset: (page - 1) * limit,
    });
};

exports.countAllEmployees = () => {
    return Employee.count();
};

exports.createMultipleEmployees = (data) => {
    return Employee.bulkCreate(data);
};
