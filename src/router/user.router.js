const router = require('express').Router();
const userController = require('../controller/user.controller');
const { errorMsgFormat, validationFormat } = require('../utils/messageFormat');
const { loginValidation } = require('../validation/user.validation');

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

router.get('/:user_id', (req, res) => {
    return userController.getUser(req, res)
})

router.put('/update', (req, res) => {
    return userController.updateUser(req, res)
})

router.delete('/delete', (req, res) => {
    return userController.deleteUser(req, res)
})

module.exports = router