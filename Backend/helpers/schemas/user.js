const Joi = require('joi');

module.exports = {
    user: Joi.object().keys({
        email: Joi.string().email().trim().required(),
        password: Joi.string().min(4).trim().required()
    })
}