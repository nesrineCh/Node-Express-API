const Joi = require('@hapi/joi');

const loginValidation = (data) => {

    const loginSchema = Joi.object({
        userMail: Joi.string().max(255).required().email(),
        userPassword: Joi.string().min(6).max(255).required()
    });

    return loginSchema.validate(data);
};

module.exports.loginValidation = loginValidation;