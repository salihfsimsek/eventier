const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    profile_image: {
        type: String,
        required: true
    },
    events: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'event'
    }]
},{timestamps: true, versionKey: false})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel