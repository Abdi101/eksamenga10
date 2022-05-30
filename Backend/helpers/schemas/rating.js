const Joi = require('joi');

module.exports = {
    rating: Joi.object().keys({
        brewId: Joi.string().trim().required(),
        userId: Joi.string().trim().required(),
        rating: Joi.number().integer().min(1).max(5).required()
    })
}
