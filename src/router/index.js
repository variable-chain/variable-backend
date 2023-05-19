const router = require('express').Router();
const userRoute = require('./user.router');
const fundingRoute = require('./funding.router');
const l2operationRoute = require('./l2operations.router');
const liquidationRoute = require('./liquidation.router');
const orderRoute = require('./order.router');
const transactionRoute = require('./transaction.router')

router.use('/user',userRoute)
router.use('/funding',fundingRoute)
router.use('/l2operation', l2operationRoute)
router.use('/liquidation', liquidationRoute)
router.use('/order', orderRoute)
router.use('/transaction', transactionRoute)
router.use('**', (req, res) => {
    return res.status(404).send({ error: true, message: 'Not found' })
})

module.exports = router;
