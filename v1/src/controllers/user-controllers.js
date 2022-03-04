const UserService = require('../services/user-service')

const {passwordToHash} = require('../scripts/utils/helper')

const create = async (req,res,next) => {
    req.body.password = passwordToHash(req.body.password)

    try{
        const createdUser = await UserService.create(req.body)
        res.status(200).send(createdUser)
    }catch(err){
        // console.log(err)
        next(err)
    }

}

module.exports = {create}