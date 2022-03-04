const router = require('express').Router()

const {create, login, update, changePassword} = require('../controllers/user-controllers')

//Validators
const validate = require('../middlewares/validate')
const {createValidation, loginValidation, updateValidation, changePasswordValidation} = require('../validations/user-validation')

//Authorization validator
const authenticateToken = require('../middlewares/auhenticate')

router.post('/', validate(createValidation), create)
router.patch('/', authenticateToken, validate(updateValidation), update)
router.post('/login', validate(loginValidation), login)
router.patch('/change-password', authenticateToken, validate(changePasswordValidation) ,changePassword)


module.exports = router