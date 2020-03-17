const Joi = require('@hapi/joi');

const loginValidation = (data) => {

    const registerSchema = Joi.object({
        userName: Joi.string().max(255).required(),
        userFirstName: Joi.string().max(255).required(),
        userPseudo: Joi.string().alphanum().max(255).required(),
        userMail: Joi.string().max(255).required().email(),
        userPassword: Joi.string().min(6).max(255).required()
    });

    return registerSchema.validate(data);
};

module.exports.loginValidation = loginValidation;