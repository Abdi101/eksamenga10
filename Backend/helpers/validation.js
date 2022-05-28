const Joi = require('joi');

module.exports = {
    validateRequestBody: (schema) => {
        return (req, res, next) => {
            try{
                Joi.assert(req.body, schema);
                next();
            }catch(err){
                res.status(500).json({ error: err.details[0]});
            }
        };
    }
}