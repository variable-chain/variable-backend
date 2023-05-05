const router = require('express').Router();
const liquidationController = require('../controller/liquidation.controller');

router.get('/all', (req, res) => {
    return liquidationController.getAllLiquidation(req, res)
})

module.exports = router
