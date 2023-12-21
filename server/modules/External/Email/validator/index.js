const Joi = require("joi");

exports.emailSchema = Joi.object({
    subject: Joi.string().min(3).required().messages({
        "string.base": `{{#label}} must be a string`,
        "string.empty": `{{#label}} cannot be empty`,
        "string.min": `{{#label}} should have a minimum length of {#limit}`,
        "any.required": `{{#label}} is required`,
    }),
    body: Joi.string().min(50).required().messages({
        "string.base": `{{#label}} must be a string`,
        "string.empty": `{{#label}} cannot be empty`,
        "string.min": `{{#label}} should have a minimum length of {#limit}`,
        "any.required": `{{#label}} is required`,
    }),
    receivers: Joi.array().items(Joi.string().email().required()).min(1).messages({
        "array.base": "should be an array of email addresses",
        "string.email": "should be a valid email address",
        "any.required": "At least one email is required",
        "array.min": "must contain at least one email address",
    }),
});
