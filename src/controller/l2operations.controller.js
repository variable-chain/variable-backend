const _ = require('lodash');
const utils = require('../utils/utils');
const { errorMsgFormat, successFormat } = require('../utils/messageFormat');
const Deposit = require('../models/deposits');
const { deposit, withdraw, getPrivateKey, getTransferSignature } = require('../utils/starkex');
const Withdraw = require('../models/withdraws');
const Transaction = require('../models/transaction');
const Balance = require('../models/balance')
const User = require('../models/user');

exports.depositTransaction = async (req, res) => {
    try {
        const {tx_id, stark_address, amount, position_id, asset} = req.body;
        const depoistResponce = await deposit(tx_id,amount,stark_address,position_id)
        let calldata = {
            stark_address: stark_address,
            amount: amount,
            position_id: position_id
        }
        await Deposit.create({tx_id: tx_id.toString(),calldata: calldata,status: "pending"})
        console.log(stark_address.slice(2))
        let query = await User.find({stark_key: stark_address.slice(2)}).then((data) => {
            return data;
        })
        console.log(query)
        await Transaction.create({tx_id: tx_id,calldata: calldata,status: "pending",transaction_type: "Deposit",user_id: query[0].user_id}).then((data)=> {
            return data;
        })
        await Balance.create({stark_key: stark_address, asset: asset, amount: amount})
        return res.status(200).json(successFormat("deposit successfull"))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Operations', 500))
    }
};

exports.withdrawTransaction = async (req, res) => {
    try {
        const {tx_id, stark_address, amount, position_id, eth_address, nonce,timestamp} = req.body;
        let query = await User.findOne({stark_address: stark_address})
        let privateKey = getPrivateKey(query.sign)
        let calldata = {
            amount: amount,
            eth_address: eth_address,
            expiration_timestamp: timestamp,
            nonce: nonce,
            position_id: position_id,
            public_key: stark_address,
        }
        let (sign_r,sign_s) = await getTransferSignature(calldata, privateKey)
        const withdrawResponce = await withdraw(tx_id,amount,stark_address,position_id,eth_address,timestamp,nonce,sign_r,sign_s)
        console.log(withdrawResponce)
        const l2Operations = await Withdraw.create(tx_id,calldata,"pending");
        await Transaction.create(tx_id,calldata,"pending","Withdraw",query.user_id)
        console.log(l2Operations)
        return res.status(200).json(successFormat("Withdraw successfull"))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Operations', 500))
    }
};

exports.updateDepositTransactionStatus = async (req, res) => {
    try {
        await Deposit.findOneAndUpdate({tx_id: req.body.tx_id},{status: req.body.status});
        return res.status(200).json(successFormat("Deposit status updated"))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Operations', 500))
    }
};

exports.updateWithdrawTransactionStatus = async (req, res) => {
    try {
        await Withdraw.findOneAndUpdate({tx_id: req.body.tx_id},{status: req.body.status});
        return res.status(200).json(successFormat("Withdraw status updated"))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Operations', 500))
    }
};

// from script 
exports.getAllDepositTransaction = async (req, res) => {
    try {
        let response = await Transaction.find({transaction_type: "Deposit"});
        return res.status(200).json(successFormat(response))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Transaction', 500))
    }
};

exports.getAllWithdrawTransaction = async (req, res, type) => {
    try {
        let response = await Transaction.find({transaction_type: "Withdraw"});
        return res.status(200).json(successFormat(response))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Transaction', 500))
    }
};

exports.getDepositTransaction = async (req,res) => {
    try {
        let response = await Transaction.find({transaction_type: "Deposit", user_id: req.body.user_id});
        return res.status(200).json(successFormat(response))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Transaction', 500))
    }
};

exports.getWithdrawTransaction = async(req, res) => {
    try {
        let response = await Transaction.find({transaction_type: "Withdraw", user_id: req.body.user_id});
        return res.status(200).json(successFormat(response))
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Transaction', 500))
    }
}
