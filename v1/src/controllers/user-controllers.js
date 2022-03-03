const UserService = require('../services/user-service')

const {passwordToHash} = require('../scripts/utils/helper')

const ApiError = require('../errors/apiError')

const create = async (req,res,next) => {
    req.body.password = passwordToHash(req.body.password)

    try{
        //Check the user exists status
        const findEmail = UserService.findOne({email: req.body.email})
        if(findEmail) return next(new ApiError('User already exists.'), 400)

        const findPhone = UserService.findOne({phone_number: req.body.phone_number})
        if(findPhone) return next(new ApiError('User already exists'), 400)

        const createdUser = await UserService.create(req.body)
        res.status(200).send(createdUser)
    }catch(err){
        next(new ApiError(err?.message))
    }

}

module.exports = {create}