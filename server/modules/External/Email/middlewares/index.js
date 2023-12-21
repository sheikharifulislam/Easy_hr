const { emailSchema } = require("../validator");
const generateError = require("../../../../utils/generateError");

exports.emailValidator = (req, res, next) => {
    try {
        const { error, value: validatedData } = emailSchema.validate(req.body, {
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
