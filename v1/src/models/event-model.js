const mongoose = require('mongoose')

const EventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    participants: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }]
},{timestamps: true, versionKey: false})

const EventModel = mongoose.model('event',EventSchema)

module.exports = EventModel