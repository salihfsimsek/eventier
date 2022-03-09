const UserService = require('../services/user-service')

const {passwordToHash, generateAccessToken, generateRefreshToken} = require('../scripts/utils/helper')

const eventEmitter = require('../scripts/events/eventEmitter')
const uuid = require('uuid')

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
            findUser = await UserService.findOne({email: req.body.email, password: password})
            if(!findUser) return next({message: 'Email or password wrong', status: 401})
        }
        else if(req.body.username){
            findUser = await UserService.findOne({username: req.body.username, password: password})
            if(!findUser) return next({message: 'Username or password wrong', status: 401})
        }
        
        let data = {
            access_token: generateAccessToken({id: findUser._id, email: findUser.email}),
            refresh_token: generateRefreshToken({id: findUser._id, email: findUser.email})
        }

        res.status(201).send(data)

    }catch(err){
        next(err)
    }
}

const update = async (req, res, next) => {
    try{
        const updatedUser = await UserService.update({_id: req.user.id}, req.body)
        if(!updatedUser) return next({message: "User not found", status: 404})
        res.status(200).send(updatedUser)
    }catch(err){
        next(err)
    }
}

const changePassword = async (req, res, next) => {
    const newPassword = passwordToHash(req.body.password)

    try{
        const updatedUser = await UserService.update({_id: req.user.id}, {password: newPassword})
        res.status(200).send(updatedUser)
    }catch(err){
        next(err)
    }
}

const resetPassword = async (req, res, next) => {
    const newPassword = uuid.v4().split('-')[0] || `usr-${new Date().getTime()}`

    try {
        const updatedUser = await UserService.update({ email: req.body.email }, { password: passwordToHash(newPassword) })
        if (!updatedUser) return next({message: "User not found", status: 404})
        eventEmitter.emit('send_email', {
            to: updatedUser.email,
            subject: 'Şifre Sıfırlama',
            html: `Şifre sıfırlama işleminiz gerçekleştirilmiştir. <br/> Giriş yaptıktan sonra şifrenizi sıfırlamayı unutmayın. <br/> Yeni şifreniz: ${newPassword}`
        })
        res.status(httpStatus.OK).send({
            'message': "Şifre sıfırlama işlemi için sisteme kayıtlı email adresine mail gönderilmiştir"
        })
    } catch (err) {
        next(err)
    }
}

const getAllUsers = async (req, res, next) => {
    try{
        const allUsers = await UserService.list()
        res.status(200).send(allUsers)
    }catch(err){
        next(err)
    }
}

const getUser = async (req, res, next) => {
    let id = req.params.id
    try{
        const user = await UserService.findOne({_id: id})
        res.status(200).send(user)
    }catch(err){
        next(err)
    }
}

const updateProfilePicture = async (req, res, next) => {
    if(req.file)
        req.body.profile_picture = `${process.env.BACKEND_FILE_URL}${req.file.filename}`
    else req.body.profile_picture = null
    
    try{
        const updatedProfile = await UserService.update({_id: req.user.id}, req.body)
        res.status(200).send(updatedProfile)
    }catch(err){
        next(err)
    }
}

const getUsersEvents = async (req, res, next) => {
    const id = req.params.id

    try{
        const selectedUser = await UserService.findOne({_id: id})
        if(!selectedUser) return next({message: "User not found", status: 404})
        await selectedUser.populate('events')
        res.status(200).send({events: selectedUser.events})
    }catch(err){
        next(err)
    }
}

module.exports = {create, login, update, changePassword, resetPassword, getAllUsers, getUser, updateProfilePicture, getUsersEvents}