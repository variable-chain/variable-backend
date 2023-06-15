const router = require('express').Router();
const userController = require('../controller/user.controller');
const getBalance  = require('../utils/balance');
const { errorMsgFormat, validationFormat } = require('../utils/messageFormat');
const { loginValidation, balanceValidation } = require('../validation/user.validation');

router.post('/login', (req, res) => {
    try {
        let { error } = loginValidation(req.body);
        if (error) {
            return res.status(400).send(validationFormat(error, 'User', 400))
        }
        return userController.login(req, res)
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'User'))
    }
   
})

router.get('/balance', (req, res) => {
    try {
        let { error } = balanceValidation(req.body);
        if (error) {
            return res.status(400).send(validationFormat(error, 'Balance', 400))
        }
        return getBalance(req.body.userId,req.body.asset)
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Balance'))
    }
   
})

router.get('/details', (req, res) => {
    return userController.getUser(req, res)
})

module.exports = router