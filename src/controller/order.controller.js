const _ = require('lodash');
const utils = require('../utils/utils');
const { errorMsgFormat, successFormat } = require('../utils/messageFormat');
const Order = require('../models/orders');
const { trade } = require('../utils/starkex');
const Transaction = require('../models/transaction');

exports.getBuyTransaction = async (req, res) => {
    try {
        const buyOrders = await Order.find({type: "Buy", user_id: req.body.user_id});
        console.log(buyOrders)
        return res.status(200).json(successFormat(buyOrders))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Order', 500))
    }
};

exports.getSellTransaction = async (req, res) => {
    try {
        const sellOrders = await Order.find({type: "Sell", user_id: req.body.user_id});
        console.log(sellOrders)
        return res.status(200).json(successFormat(sellOrders))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Order', 500))
    }
};

exports.getAllTransaction = async (req, res) => {
    try {
        const transactions = await Order.find();
        console.log(transactions)
        return res.status(200).json(successFormat(transactions))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Order', 500))
    }
};

exports.updateTradeStatus = async (req, res) => {
    try {
        await Order.findOneAndUpdate({order_id: req.body.order_id},{status: req.body.status});
        return res.status(200).json(successFormat("Order trade status updated"))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Order', 500))
    }
};

exports.sellTransaction = async (req, res) => {
    try {
        const {status,calldata,type,user_id} = req.body
        let allOrders = await Order.find(function (err, data) {
            return data
            });
        let orderId = (allOrders.length > 0) ? (allOrders[allOrders.length - 1].order_id + 1) : 1;
        const sellOrder = await Order.create(orderId,status,calldata,type,user_id);
        console.log(sellOrder)
        return res.status(200).json(successFormat("Sell transaction created successfully"))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Order', 500))
    }
};

exports.tradeTransaction = async (req, res) => {
    try {
        const {status,calldata,type,user_id} = req.body
        const request = {}
        // const request = {
            //     tx_id: txId,
            //     actual_a_fee: actual_a_fee,
            //     actual_b_fee: actual_b_fee,
            //     actual_collateral: actual_collateral,
            //     actual_synthetic: actual_synthetic,
            //     party_a_order: {
            //         amount_collateral: a_amount_collateral,
            //         amount_fee: a_amount_fee,
            //         amount_synthetic: a_amount_synthetic,
            //         asset_id_collateral: asset_id_collateral,
            //         asset_id_synthetic: asset_id_synthetic,
            //         expiration_timestamp: a_timestamp,
            //         is_buying_synthetic: true,
            //         nonce: a_nonce,
            //         order_type: "LIMIT_ORDER_WITH_FEES",
            //         position_id: a_postion_id,
            //         public_key: a_public_key,
            //         signature: {
            //             r: a_sign_r,
            //             s: a_sign_s
            //         }
            //     },
            //     party_b_order: {
            //         amount_collateral: b_amount_collateral,
            //         amount_fee: b_amount_fee,
            //         amount_synthetic: b_amount_synthetic,
            //         asset_id_collateral: asset_id_collateral,
            //         asset_id_synthetic: asset_id_synthetic,
            //         expiration_timestamp: b_timestamp,
            //         is_buying_synthetic: false,
            //         nonce: b_nonce,
            //         order_type: "LIMIT_ORDER_WITH_FEES",
            //         position_id: b_position_id,
            //         public_key: b_public_key,
            //         signature: {
            //             r: b_sign_r,
            //             s: b_sign_s
            //         }
            //     },
            // }
        const response = await trade(request);
        let allOrders = await Order.find(function (err, data) {
            return data
            });
        let orderId = (allOrders.length > 0) ? (allOrders[allOrders.length - 1].order_id + 1) : 1;
        await Transaction.create(txId,request,status,"Trade",user_id)
        const result = await Order.create(orderId,status,calldata,type,user_id);
        console.log(result)
        return res.status(200).json(successFormat("trade transaction created successfully"))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Order', 500))
    }
};

exports.buyTransaction = async (req, res) => {
    try {
        const {status,calldata,type,user_id} = req.body
        let allOrders = await Order.find(function (err, data) {
            return data
            });
        let orderId = (allOrders.length > 0) ? (allOrders[allOrders.length - 1].order_id + 1) : 1;
        const buyOrder = await Order.create(orderId,status,calldata,type,user_id);
        console.log(buyOrder)
        return res.status(200).json(successFormat("Buy transaction created successfully"))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Order', 500))
    }
};

// from script 
exports.updateBuyStatus = async (req, res) => {
    try {
        await Order.findOneAndUpdate({order_id: req.body.order_id},{status: req.body.status});
        return res.status(200).json(successFormat("Buy Order status updated"))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Order', 500))
    }
};

exports.updateSellStatus = async (req, res) => {
    try {
        await Order.findOneAndUpdate({order_id: req.body.order_id},{status: req.body.status});
        return res.status(200).json(successFormat("Sell Order status updated"))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Order', 500))
    }
};

exports.getAllTradeTransaction = async (req, res, type) => {
    try {
        const tradeOrders = await Order.find({type: "Trade"});
        console.log(tradeOrders)
        return res.status(200).json(successFormat(tradeOrders))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Order', 500))
    }
};

exports.getAllBuyTransaction = async (req,res) => {
    try {
        const buyOrders = await Order.find({type: "Buy"});
        console.log(buyOrders)
        return res.status(200).json(successFormat(buyOrders))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Order', 500))
    }
};

exports.getAllSellTransaction = async(req, res) => {
    try {
        const sellOrders = await Order.find({type: "Sell"});
        console.log(sellOrders)
        return res.status(200).json(successFormat(sellOrders))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Order', 500))
    }
}

