const joi = require('joi');

exports.tradeValidation = (req) => {
    let schema = joi.object().keys(Object.assign({
        nonce: joi.number().required(),
        from: joi.number().required(),
        to: joi.number().required(),
        status: joi.number().required(),
        from_postion_id: joi.number().required(),
        to_postion_id: joi.number().required(),
        amount: joi.number().required(),
        transactionType: joi.number().required(),
        asset: joi.string().required()
    }));
    return schema.validate(req, {abortEarly: false});
}

exports.buyValidation = (req) => {
    let schema = joi.object().keys(Object.assign({
        nonce: joi.number().required(),
        buyer_address: joi.string().required(),
        status: joi.string().required(),
        buyer_postion_id: joi.number().required(),
        amount: joi.number().required(),
        transactionType: joi.string().required()
    }));
    return schema.validate(req, {abortEarly: false});
}

exports.sellValidation = (req) => {
    let schema = joi.object().keys(Object.assign({
        nonce: joi.number().required(),
        seller_address: joi.string().required(),
        status: joi.string().required(),
        seller_postion_id: joi.number().required(),
        amount: joi.number().required(),
        transactionType: joi.string().required()
    }));
    return schema.validate(req, {abortEarly: false});
}