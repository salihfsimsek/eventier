const UserService = require('../services/user-service')

const {passwordToHash} = require('../scripts/utils/helper')

const create = async (req,res,next) => {
    req.body.password = passwordToHash(req.body.password)
    try{
        const createdUser = await UserService.create(req.body)
        res.status(200).send(createdUser)
    }catch(err){
        next(err)
    }
}

const login = async (req, res, next) => {
    const password = passwordToHash(req.body.password)
    try{
        let findUser
        if(req.body.email){
            findUser = await UserService.findOne({email: req.body.login, password: password})
            if(!findUser) return next({message: 'Email or password wrong', status: 401})
        }
        else if(req.body.username){
            findUser = await UserService.findOne({username: req.body.login, password: password})
            if(!findUser) return next({message: 'Username or password wrong', status: 401})
        }

        res.status(201).send(findUser)

    }catch(err){
        next(err)
    }
}

module.exports = {create, login}