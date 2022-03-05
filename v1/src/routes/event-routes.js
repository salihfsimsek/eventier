const router = require('express').Router()


const {getAllEvents, getEvent, create, update} = require('../controllers/event-controllers')

//Validators
const validate = require('../middlewares/validate')
const {createValidation, updateValidation} = require('../validations/event-validation')

//Authorization validator
const authenticateToken = require('../middlewares/auhenticate')

router.get('/', authenticateToken, getAllEvents)
router.get('/:id', authenticateToken, getEvent)
router.patch('/:id', authenticateToken, validate(updateValidation), update)
router.post('/', authenticateToken, validate(createValidation), create)
module.exports = router