const joi = require('joi');

exports.depositValidation = (req) => {
    let schema = joi.object().keys(Object.assign({
        nonce: joi.number().required(),
        eth_address: joi.string().required(),
        stark_address: joi.string().required(),
        status: joi.number().required(),
        postion_id: joi.number().required(),
        amount: joi.number().required(),
        transactionType: joi.number().required(),
        asset: joi.string().required()
    }));
    return schema.validate(req, {abortEarly: false});
}

exports.transferValidation = (req) => {
    let schema = joi.object().keys(Object.assign({
        nonce: joi.number().required(),
        from_address: joi.number().required(),
        to_address: joi.number().required(),
        status: joi.number().required(),
        from_postion_id: joi.number().required(),
        to_postion_id: joi.number().required(),
        amount: joi.number().required(),
        transactionType: joi.number().required(),
        asset: joi.number().required()
    }));
    return schema.validate(req, {abortEarly: false});
}

exports.withdrawValidation = (req) => {
    let schema = joi.object().keys(Object.assign({
        nonce: joi.number().required(),
        eth_address: joi.string().required(),
        stark_address: joi.string().required(),
        status: joi.number().required(),
        postion_id: joi.number().required(),
        amount: joi.number().required(),
        transactionType: joi.number().required(),
        asset: joi.string().required()
    }));
    return schema.validate(req, {abortEarly: false});
}