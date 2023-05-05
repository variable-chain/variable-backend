const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { errorMsgFormat } = require('./messageFormat');
const secret = 'thisissecretfromvariableserver'


module.exports = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
            if (token) {
                jwt.verify(token, secret, async (err, decode) => {
                    if (err) {
                       return res.send({
                            code: 400,
                            message: 'Invalid Token',
                            error:err.message
                        })
                    } else {
                        req.user = decode.payload;
                        return next();
                    }
                })
            } else {
               return res.send({
                    error: true,
                    message: 'Token not Found',
                })
             
            }
        
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Auth'))
    }
}