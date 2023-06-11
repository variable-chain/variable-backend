const _ = require('lodash');
const utils = require('../utils/utils');
const { errorMsgFormat, successFormat } = require('../utils/messageFormat');

exports.getAllFundings = async (req, res) => {
    const {markPrice,indexPrice, underlyingIndex,fundingRate} = req.body;
    const fundingRatePayment = (markPrice / indexPrice - 1) * underlyingIndex * fundingRate;
    return fundingRatePayment;
};