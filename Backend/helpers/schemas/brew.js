const Joi = require('joi');

module.exports = {
    brew: Joi.object().keys({
        coffeeBeanId: Joi.string().required(),
        grindingSettings: Joi.number().min(1).max(7).required(),
        litresOfWater: Joi.number().min(0).required(),
        gramsOfCoffee: Joi.number().min(0).required(),
        userVotes: Joi.array(),
    }),
    updateBrew: Joi.object().keys({
        coffeeBeanId: Joi.string().min(24),
        grindingSettings: Joi.number().min(1).max(7),
        litresOfWater: Joi.number().min(0),
        gramsOfCoffee: Joi.number().min(0),
        userVotes: Joi.array(),
    })
}
