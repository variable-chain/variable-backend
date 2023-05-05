const router = require('express').Router();
const transactionController = require('../controller/transaction.controller');
const auth = require('../utils/authenticate');
const { errorMsgFormat, validationFormat } = require('../utils/messageFormat');
const { craeteTransactionValidation } = require('../validation/transaction.validation');

router.post('/create', auth, (req, res)=> {
    try {
        let { error } = craeteTransactionValidation(req.body);
        if (error) {
            return res.status(400).send(validationFormat(error, 'Transaction', 400))
        }
        return transactionController.createTransaction(req, res)
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Transaction'))
    }
})

router.put('/update/status/:transaction_id', auth, (req, res) => {
    return transactionController.updateTransactionStatus(req, res)
})

router.get('/all', (req, res) => {
    return transactionController.getAllTransaction(req, res)
})

router.get('/user/:user_id', (req, res) => {
    return transactionController.getTransactionsByUser(req, res)
})


router.get('/tx/:id', (req, res)=> {
    return transactionController.getTransactionDetails(req, res)
})

router.get('/:transaction_id', (req, res) => {
    return transactionController.getTransaction(req, res)
})

module.exports = router
