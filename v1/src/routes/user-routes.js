const router = require('express').Router()

const {register} = require('../controllers/user-controllers')

router.post('/', register)

module.exports = router