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
   let sign_r = req.body.sign;
   let eth_address = req.body.eth_key;
   let starkKey = await starkex.getStarkKey(sign_r);
   console.log("starkKey",starkKey)
   let allUsers = await User.find().then((data) => {
    return data;
   })
    console.log("allUsers",allUsers)
    const isUserExists = await User.findOne({eth_key: eth_address}).then((data) => {
        return data;
       })
    console.log("isUser",isUserExists)
    if(isUserExists) return res.status(409).json(errorMsgFormat("user already exists"))
    let userId = (allUsers.length > 0) ? (allUsers[allUsers.length - 1].user_id + 1) : 1;
    const user = await User.create({eth_key: eth_address,sign: sign_r,stark_key: starkKey,user_id: userId}).then((data) => {
        return data;
       })
    console.log(user)
    return res.status(201).json(successFormat("User created Successfully"))
};
