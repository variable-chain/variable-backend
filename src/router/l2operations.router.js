const router = require('express').Router();
const l2operationsController = require('../controller/l2operations.controller');
const auth = require('../utils/authenticate');
const { errorMsgFormat, validationFormat } = require('../utils/messageFormat');
const { depositValidation, withdrawValidation, transferValidation } = require('../validation/l2operations.validation');

router.post('/deposit', auth, (req, res)=> {
    try {
        let { error } = depositValidation(req.body);
        if (error) {
            return res.status(400).send(validationFormat(error, 'Operations', 400))
        }
        return l2operationsController.depositTransaction(req, res)
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Operations'))
    }
})


router.post('/withdraw', auth, (req, res)=> {
    try {
        let { error } = withdrawValidation(req.body);
        if (error) {
            return res.status(400).send(validationFormat(error, 'Operations', 400))
        }
        return l2operationsController.withdrawTransaction(req, res)
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Operations'))
    }
})

router.put('/update/status/:deposit_id', auth, (req, res) => {
    return l2operationsController.updateDepositTransactionStatus(req, res)
})

router.put('/update/status/:withdraw_id', auth, (req, res) => {
    return l2operationsController.updateWithdrawTransactionStatus(req, res)
})

router.get('/deposit/all', (req, res) => {
    return l2operationsController.getAllDepositTransaction(req, res)
})

router.get('/withdraw/all', (req, res) => {
    return l2operationsController.getAllWithdrawTransaction(req, res)
})

router.get('/deposit/:user_id', (req, res) => {
    return l2operationsController.getDepositTransaction(req, res)
})

router.get('/withdraw/:user_id', (req, res) => {
    return l2operationsController.getWithdrawTransaction(req, res)
})

module.exports = router
