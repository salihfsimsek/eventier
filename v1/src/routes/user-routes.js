const router = require('express').Router()

const {create, login, changePassword} = require('../controllers/user-controllers')

//Validators
const validate = require('../middlewares/validate')
const {createValidation, loginValidation, changePasswordValidation} = require('../validations/user-validation')

//Authorization validator
const authenticateToken = require('../middlewares/auhenticate')

router.post('/', validate(createValidation), create)
router.post('/login', validate(loginValidation), login)
router.patch('/change-password', authenticateToken, validate(changePasswordValidation) ,changePassword)
module.exports = router