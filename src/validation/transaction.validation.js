const joi = require('joi');

exports.craeteTransactionValidation = (req) => {
    let schema = joi.object().keys(Object.assign({
        nonce: joi.number().required(),
        from: joi.number().required(),
        to: joi.number().required(),
        status: joi.number().required(),
        from_postion_id: joi.number().required(),
        to_postion_id: joi.number().required(),
        amount: joi.number().required(),
        transactionType: joi.number().required()
    }));
    return schema.validate(req, {abortEarly: false});
}