const _ = require('lodash');
const jwt = require('jsonwebtoken');


exports.generateToken = async (user_info) => {
    let token = await jwt.sign({
        payload: user_info
    }, secret, {
        expiresIn: '7d'
    }
    );
    return token;
}

exports.isUserExists = async (address) => {
   
}

exports.addTransaction = async() => {
 
}
