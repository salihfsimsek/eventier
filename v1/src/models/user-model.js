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
        unique: true,
        required: true
    },
    phone_number: {
        type: String,
        unique: true,
        required: true
    },
    profile_image: {
        type: String
    },
    events: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'event'
    }]
},{timestamps: true, versionKey: false})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel