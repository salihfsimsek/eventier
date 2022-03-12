const router = require('express').Router()

const {create, login, update, changePassword, resetPassword, getAllUsers, getUser, updateProfilePicture, getUsersEvents} = require('../controllers/user-controllers')

//Validators
const validate = require('../middlewares/validate')
const {createValidation, loginValidation, updateValidation, changePasswordValidation, resetPasswordValidation} = require('../validations/user-validation')
const idChecker = require('../middlewares/idChecker')

//Authorization validator
const authenticateToken = require('../middlewares/auhenticate')

//File upload configuration
const {upload} = require('../scripts/utils/uploadHelper')


router.get('/', authenticateToken, getAllUsers)


router.post('/', validate(createValidation), create)
router.patch('/', authenticateToken, validate(updateValidation), update)
router.get('/:id', idChecker('id'), authenticateToken, getUser)
router.post('/login', validate(loginValidation), login)
router.post('/reset-password', validate(resetPasswordValidation), resetPassword) 
router.patch('/change-password', authenticateToken, validate(changePasswordValidation) ,changePassword)
router.patch('/profile-picture', authenticateToken, upload.single('profile_picture'),updateProfilePicture)
router.get('/users-events/:id', idChecker('id'), authenticateToken, getUsersEvents)

module.exports = router