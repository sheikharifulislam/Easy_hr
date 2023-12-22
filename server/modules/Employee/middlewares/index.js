const stream = require("stream");
const multer = require("multer");
const csv = require("csv-parser");
const { employeeSchema } = require("../validator");
const generateError = require("../../../utils/generateError");
const toCamelCase = require("../../../utils/toCamelCase");

exports.validateEmployee = (req, res, next) => {
    try {
        const { error, value: validatedData } = employeeSchema.validate(req.body, {
            stripUnknown: true,
        });

        if (error) {
            throw generateError(error.details[0].message, 400);
        }

        req.body = validatedData;
        next();
    } catch (e) {
        next(e);
    }
};

exports.fileUploader = (req, res, next) => {
    try {
        const upload = multer({
            storage: multer.memoryStorage(),
            limits: {
                fileSize: 3000000, // 3MB
            },
            fileFilter: (req, file, cb) => {
                if (file.mimetype === "text/csv") {
                    cb(null, true);
                } else {
                    cb(new Error("Only csv file format allowed!"));
                }
            },
        }).single("employees");

        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({
                    error: {
                        message: err.message,
                    },
                });
            } else if (err) {
                return res.status(400).json({
                    error: {
                        message: err.message,
                    },
                });
            }

            next();
        });
    } catch (e) {
        next(e);
    }
};

exports.parseCsvFiles = (req, res, next) => {
    try {
        const results = [];
        const bufferString = req.file.buffer.toString("utf8");
        const bufferStream = stream.Readable.from(bufferString);

        bufferStream
            .pipe(csv())
            .on("data", (data) => {
                const camelCaseData = {};
                for (const key in data) {
                    camelCaseData[toCamelCase(key)] = data[key];
                }
                results.push(camelCaseData);
            })
            .on("end", () => {
                req.body.employees = results;
                next();
            });
    } catch (e) {
        next(e);
    }
};

exports.validateEmployees = (req, res, next) => {
    try {
        const validData = [];
        const errorOnCol = [];

        for (let i = 0; i < req.body.employees.length; i++) {
            const { error, value: validatedData } = employeeSchema.validate(req.body.employees[i], {
                stripUnknown: true,
            });
            if (error) {
                errorOnCol.push(i + 1);
            } else {
                validData.push(validatedData);
            }
        }

        req.body.employees = validData;
        req.body.errorOnCol = errorOnCol;
        next();
    } catch (e) {
        next(e);
    }
};
