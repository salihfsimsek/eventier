const router = require('express').Router()


const {getAllEvents, getEvent, create, update, deleteEvent, updateParticipants} = require('../controllers/event-controllers')

//Validators
const validate = require('../middlewares/validate')
const {createValidation, updateValidation} = require('../validations/event-validation')

//Authorization validator
const authenticateToken = require('../middlewares/auhenticate')

router.get('/', authenticateToken, getAllEvents)
router.get('/:id', authenticateToken, getEvent)
router.delete("/:id", authenticateToken, deleteEvent)
router.patch('/:id', authenticateToken, validate(updateValidation), update)
router.post('/', authenticateToken, validate(createValidation), create)
router.patch('/update-participants/:id', authenticateToken, updateParticipants)
module.exports = router