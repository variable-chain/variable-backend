const router = require('express').Router();
const fundingController = require('../controller/funding.controller');

router.get('/all', (req, res) => {
    return fundingController.getAllFundings(req, res)
})

module.exports = router
