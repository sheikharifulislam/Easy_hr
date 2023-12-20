const employeeServices = require("../services");

exports.createEmployee = async (req, res, next) => {
    try {
        const employee = await employeeServices.createSingleEmployee(req.body);
        res.status(200).json(employee);
    } catch (error) {
        next();
    }
};

exports.getAllEmployees = async (req, res, next) => {
    try {
        console.log("inside getAllEmployees");
        const [employees, count] = await Promise.all([
            employeeServices.findAllEmployees(),
            employeeServices.countAllEmployees(),
        ]);

        res.status(200).json({
            data: employees,
            pagination: {
                total_records: count,
            },
        });
    } catch (error) {
        next();
    }
};

exports.insertMultipleEmployees = async (req, res, next) => {
    try {
        const employees = await employeeServices.createMultipleEmployees(req.body.employees);
        res.status(200).json({
            data: employees,
            ...(req.body.errorOnCall.length && { errorOnCall: req.body.errorOnCall }),
        });
    } catch (e) {
        next(e);
    }
};
