const EventService = require('../services/event-service')

const getAllEvents = async (req, res, next) => {
    try{
        const allEvents = await EventService.list()
        res.status(200).send(allEvents)
    }catch(err){
        next(err)
    }
}

const getEvent = async (req, res, next) => {
    const id = req.params.id
    try{
        const event = await EventService.findOne({_id: id})
        if(!event) return next({message: 'Event not found', status: 404})
        res.status(200).send(event)
    }catch(err){
        next(err)
    }
}

module.exports = {getAllEvents, getEvent}