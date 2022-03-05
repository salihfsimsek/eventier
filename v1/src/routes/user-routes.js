const router = require('express').Router()

const {create, login, update, changePassword, getAllUsers, getUser, updateProfilePicture} = require('../controllers/user-controllers')

//Validators
const validate = require('../middlewares/validate')
const {createValidation, loginValidation, updateValidation, changePasswordValidation} = require('../validations/user-validation')

//Authorization validator
const authenticateToken = require('../middlewares/auhenticate')

//File upload configuration
const {upload} = require('../scripts/utils/uploadHelper')

router.get('/', authenticateToken, getAllUsers)
router.post('/', validate(createValidation), create)
router.patch('/', authenticateToken, validate(updateValidation), update)
router.get('/:id', authenticateToken, getUser)
router.post('/login', validate(loginValidation), login)
router.patch('/change-password', authenticateToken, validate(changePasswordValidation) ,changePassword)
router.patch('/profile-picture', authenticateToken, upload.single('profile_picture'),updateProfilePicture)
module.exports = router