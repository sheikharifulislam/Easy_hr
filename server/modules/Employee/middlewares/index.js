const stream = require("stream");
const multer = require("multer");
const csv = require("csv-parser");
const { employeeSchema } = require("../validator");
const error = require("../../../utils/error");
const toCamelCase = require("../../../utils/toCamelCase");

exports.validateEmployee = (req, res, next) => {
    const { error, value: validatedData } = employeeSchema.validate(req.body, {
        stripUnknown: true,
    });

    if (error) {
        res.status(300).json({
            error: "abc",
        });
    }

    req.body = validatedData;
    next();
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
    const validData = [];
    const errorOnCall = [];

    console.log("from validateEmployees", req.body.employees.length);
    for (let i = 0; i < req.body.employees.length; i++) {
        const { error, value: validatedData } = employeeSchema.validate(req.body.employees[i], {
            stripUnknown: true,
        });
        if (error) {
            // console.log("fom errors", {
            //     data: req.body.employees[i],
            //     cellNumber: i,
            // });
            errorOnCall.push(i + 1);
        } else {
            validData.push(validatedData);
        }
    }

    console.log("from validateEmployees", validData.length);

    req.body.employees = validData;
    req.body.errorOnCall = errorOnCall;
    next();
};
