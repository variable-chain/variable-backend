const jwt = require('jsonwebtoken');
const logger = require('../logger')('altAuth.js')
const { errorMsgFormat } = require('./messageFormat');
require('dotenv');


module.exports = async (req, res, next) => {
    try {
        let fetchedToken = '';
        if ('authorization' in req.headers) {
            fetchedToken = req.headers.authorization;
        }
           console.log('fetchedToken:', fetchedToken);
           let array = fetchedToken.split(" ");
           if ((fetchedToken.length > 0) && (array[0] == "Bearer") ) {
               if (fetchedToken.split('Bearer')[1].trim() === process.env.ALT_SECRET_KEY) {
                   logger.info('pass');
                   next();
               } else {
                   logger.error('Un-Authorised');
                   return res.send({
                    error: true,
                    message: 'Un-Authorised Token',
                })
               }
           } else {
               logger.error('Un-Authorised Token FOUND!');
               return res.send({
                error: true,
                message: 'Un-Authorised Token',
            })
           }
       }catch (error) {
        logger.error('error in auth', error.message, error.stack)
        return res.send(errorMsgFormat(error.message, 'Auth'))
    }
}