const BaseService = require('./baseServices')
const UserModel = require('../models/user-model')

class UserService extends BaseService{
    model = UserModel
}

module.exports = new UserService()