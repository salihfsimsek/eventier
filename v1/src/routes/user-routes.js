const router = require('express').Router()

const {create, login} = require('../controllers/user-controllers')

//Validators
const validate = require('../middlewares/validate')
const {createValidation, loginValidation} = require('../validations/user-validation')

router.post('/', validate(createValidation), create)
router.post('/login', validate(loginValidation), login)
module.exports = router