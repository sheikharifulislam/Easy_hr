const Employee = require("../models");

exports.createSingleEmployee = (data) => {
    return Employee.create(data);
};

exports.findAllEmployees = () => {
    return Employee.findAll();
};

exports.countAllEmployees = () => {
    return Employee.count();
};

exports.createMultipleEmployees = (data) => {
    return Employee.bulkCreate(data);
};
