const Employee = require("../models");
exports.createSingleEmployee = async (data) => {
    return Employee.create(data);
};

exports.findSingleEmployee = (key, value) => {
    return Employee.findOne({
        where: {
            [key]: value,
        },
    });
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
