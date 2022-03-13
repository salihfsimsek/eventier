const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: [true, 'Username already in use'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: [true, 'Password already in use'],
        required: true
    },
    phone_number: {
        type: String,
        unique: [true, 'Phone number already in use'],
        required: true
    },
    profile_picture: {
        type: String
    },
    events: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'event'
    }]
},{timestamps: true, versionKey: false})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel