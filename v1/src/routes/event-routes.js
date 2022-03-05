const router = require('express').Router()


const {getAllEvents, getEvent} = require('../controllers/event-controllers')

//Validators
const validate = require('../middlewares/validate')
// const {createValidation, loginValidation, updateValidation, changePasswordValidation} = require('../validations/user-validation')

//Authorization validator
const authenticateToken = require('../middlewares/auhenticate')

router.get('/', authenticateToken, getAllEvents)
router.get('/:id', authenticateToken, getEvent)
module.exports = router