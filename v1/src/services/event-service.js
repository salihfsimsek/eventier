const BaseService = require('./baseServices')
const EventModel = require('../models/event-model')

class EventService extends BaseService{
    model = EventModel
}

module.exports = new EventService()