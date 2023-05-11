const _ = require('lodash');
const utils = require('../utils/utils');
const { errorMsgFormat, successFormat } = require('../utils/messageFormat');
const Transaction = require('../models/transaction');
const { getFirstUnusedTxId } = require('../utils/starkex');

exports.getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({tx_id: req.body.tx_id});
        return res.status(200).json(successFormat(transaction))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Transaction', 500))
    }
};

exports.getAllTransaction = async (req, res) => {
    try {
        const allTransactions = await Transaction.find();
        return res.status(200).json(successFormat(allTransactions))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Transaction', 500))
    }
};

exports.getTransactionsByUser = async (req, res) => {
    try {
        const transactions = await Transaction.find({user_id: req.body.user_id});
        return res.status(200).json(successFormat(transactions))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Transaction', 500))
    }
};

exports.createTransaction = async (req, res) => {
    try {
        const {tx_id,calldata,status,transaction_type } = req.body
        const transaction = await Transaction.create(tx_id,calldata,status,transaction_type,calldata.sender_address);
        console.log(transaction)
        return res.status(200).json(successFormat("transaction created successfully"))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Transaction', 500))
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        await Transaction.findOneAndDelete({tx_id: req.body.tx_id});
        return res.status(200).json(successFormat("Transaction deleted"))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Transaction', 500))
    }
};

exports.updateTransactionStatus = async (req, res) => {
    try {
        await Transaction.findOneAndUpdate({tx_id: req.body.tx_id},{status: req.body.status});
        return res.status(200).json(successFormat("Transaction status updated"))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Transaction', 500))
    }
};

exports.getNextTransactionId = async (req, res, type) => {
    try {
        let tx_id = await getFirstUnusedTxId();
        return res.status(200).json(successFormat(tx_id))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Transaction', 500))
    }
};
