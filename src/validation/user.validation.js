const joi = require('joi');

exports.loginValidation = (req) => {
    let schema = joi.object().keys(Object.assign({
        eth_key: joi.string().required(),
        sign: joi.string().required()
    }));
    return schema.validate(req, {abortEarly: false});
}