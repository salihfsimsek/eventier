const router = require('express').Router()

const {create} = require('../controllers/user-controllers')

//Validators
const validate = require('../middlewares/validate')
const {createValidation} = require('../validations/user-validation')

router.post('/', validate(createValidation) ,create)

module.exports = router