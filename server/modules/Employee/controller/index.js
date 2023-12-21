const employeeServices = require("../services");
const generateError = require("../../../utils/generateError");
exports.createEmployee = async (req, res, next) => {
    try {
        const isExists = await employeeServices.findSingleEmployee("email", req.body.email);
        if (isExists) {
            throw generateError("This email already exists", 400);
        }
        const employee = await employeeServices.createSingleEmployee(req.body);
        return res.status(200).json(employee);
    } catch (e) {
        next(e);
    }
};

exports.getAllEmployees = async (req, res, next) => {
    try {
        const { page = 1 } = req.query;
        const limit = 5;
        const [employees, count] = await Promise.all([
            employeeServices.findAllEmployees({
                page,
                limit,
            }),
            employeeServices.countAllEmployees(),
        ]);

        return res.status(200).json({
            data: employees,
            pagination: {
                total_records: count,
            },
        });
    } catch (e) {
        next(e);
    }
};

exports.insertMultipleEmployees = async (req, res, next) => {
    try {
        const employees = await employeeServices.createMultipleEmployees(req.body.employees);
        return res.status(200).json({
            data: employees,
            ...(req.body.errorOnCall.length && { errorOnCall: req.body.errorOnCall }),
        });
    } catch (e) {
        next(e);
    }
};
