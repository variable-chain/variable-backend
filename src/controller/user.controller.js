const _ = require('lodash');
const { successFormat,errorMsgFormat } = require('../utils/messageFormat');
const User = require('../models/user');
const starkex = require('../utils/starkex')

exports.getUser = async (req, res) => {
   if(req.body.eth_address){
        let details = await User.findOne({eth_address: req.body.eth_address})
        return res.status(200).json(details)
   }
   else if (req.body.stark_address){
        let details = await User.findOne({stark_address: req.body.stark_address})
        return res.status(200).json(details)
   }
   else {
    return res.status(409).json("user not exists");
   }

};

exports.login = async (req, res) => {
   let sign_r = req.body.sign_r;
   let eth_address = req.body.eth_address;
   let starkKey = await starkex.getStarkKey(sign_r);
   let allUsers = await User.find(function (err, data) {
    return data
    });
    const isUserExists = await User.findOne({eth_address: eth_address})
    if(isUserExists) return res.status(409).json(errorMsgFormat("user already exists"))
    let userId = (allUsers.length > 0) ? (allUsers[allUsers.length - 1].user_id + 1) : 1;
    const user = await User.create(eth_address,sign_r,starkKey,userId);
    console.log(user)
    return res.status(201).json(successFormat("User created Successfully"))
};

exports.deleteUser = async (req, res) => {
    if(req.body.eth_address){
        await User.findOneAndDelete({eth_address: req.body.eth_address})
        return res.status(200).json("user deleted")
   }
   else if (req.body.stark_address){
        await User.findOneAndDelete({stark_address: req.body.stark_address})
        return res.status(200).json("user deleted")
   }
   else {
    return res.status(409).json("user not exists");
   }
};

exports.updateUser = async (req, res) => {
    
};
