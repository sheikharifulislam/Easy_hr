const Joi = require("joi");

exports.employeeSchema = Joi.object({
    firstName: Joi.string().min(3).required().messages({
        "string.empty": `{{#label}} cannot be an empty field`,
        "string.min": `{{#label}} should have a minimum length of {{#limit}}`,
        "any.required": `{{#label}} is a required field`,
    }),
    lastName: Joi.string().min(3).required().messages({
        "string.empty": `{{#label}} cannot be an empty field`,
        "string.min": `{{#label}} should have a minimum length of {{#limit}}`,
        "any.required": `{{#label}} is a required field`,
    }),
    email: Joi.string().email().required().messages({
        "string.email": `{{#label}} should be a valid email address`,
        "any.required": `{{#label}} is a required field`,
    }),
});
