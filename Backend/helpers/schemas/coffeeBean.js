const Joi = require('joi');

module.exports = {
    coffeeBean: Joi.object().keys({
        brand: Joi.string().min(3).trim().required(),
        name: Joi.string().min(3).trim().required(),
        roastProfile: Joi.string().min(3).trim().required(),
        roastType: Joi.string().min(3).trim().required(),
        price: Joi.number().min(1).required(),
        countryOfOrigin: Joi.string().min(4).required(),
        description: Joi.string().min(20).required()
    }),
    updateCoffeeBean: Joi.object().keys({
        brand: Joi.string().min(3).trim(),
        name: Joi.string().min(3).trim(),
        roastProfile: Joi.string().min(3).trim(),
        roastType: Joi.string().min(3).trim(),
        price: Joi.number().min(1),
        countryOfOrigin: Joi.string().min(4),
        description: Joi.string().min(20)
    })
}