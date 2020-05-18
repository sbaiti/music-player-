const Joi = require("joi");

function validateUser(user) {
    const schema = {
        firstName: Joi.string()
            .max(50)
            .required(),
        lastName: Joi.string()
            .max(50)
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
            .required(),
        password: Joi.string()
            .min(5)
            .max(1024)
            .required(),
        login: Joi.string()
            .min(3)
            .max(50)
            .required(),
    };

    return Joi.validate(user, schema);
}
exports.validate = validateUser;
