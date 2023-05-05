const router = require('express').Router();
const orderController = require('../controller/order.controller');
const auth = require('../utils/authenticate');
const { errorMsgFormat, validationFormat } = require('../utils/messageFormat');
const { tradeValidation, buyValidation, sellValidation } = require('../validation/order.validation');

router.post('/trade', auth, (req, res)=> {
    try {
        let { error } = tradeValidation(req.body);
        if (error) {
            return res.status(400).send(validationFormat(error, 'Order', 400))
        }
        return orderController.tradeTransaction(req, res)
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Order'))
    }
})

router.post('/buy', auth, (req, res)=> {
    try {
        let { error } = buyValidation(req.body);
        if (error) {
            return res.status(400).send(validationFormat(error, 'Order', 400))
        }
        return orderController.buyTransaction(req, res)
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Order'))
    }
})

router.post('/sell', auth, (req, res)=> {
    try {
        let { error } = sellValidation(req.body);
        if (error) {
            return res.status(400).send(validationFormat(error, 'Order', 400))
        }
        return orderController.sellTransaction(req, res)
    } catch (error) {
        return res.send(errorMsgFormat(error.message, 'Order'))
    }
})

router.put('/update/status/:trade_id', auth, (req, res) => {
    return orderController.updateTradeStatus(req, res)
})

router.put('/update/status/:buy_id', auth, (req, res) => {
    return orderController.updateBuyStatus(req, res)
})

router.put('/update/status/:sell_id', auth, (req, res) => {
    return orderController.updateSellStatus(req, res)
})

router.get('/all', (req, res) => {
    return orderController.getAllTradeTransaction(req, res)
})

router.get('/buy/all', (req, res) => {
    return orderController.getAllBuyTransaction(req, res)
})

router.get('/sell/all', (req, res) => {
    return orderController.getAllSellTransaction(req, res)
})

router.get('/:trade_id', (req, res) => {
    return orderController.getTradeTransaction(req, res)
})

router.get('/buy/:buy_id', (req, res) => {
    return orderController.getBuyTransaction(req, res)
})

router.get('/sell/:sell_id', (req, res) => {
    return orderController.getSellTransaction(req, res)
})

module.exports = router
