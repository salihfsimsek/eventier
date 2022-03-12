const EventService = require('../services/event-service')
const UserService = require('../services/user-service')

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
        
        await event.populate({
            path: 'participants',
            select: 'full_name profile_picture username'
        })

        res.status(200).send(event)
    }catch(err){
        next(err)
    }
}

const create = async (req, res, next) => {
    try{
        const createdEvent = await EventService.create(req.body)
        res.status(201).send(createdEvent)
    }catch(err){
        next(err)
    }
}

const update = async (req, res, next) => {
    const id = req.params.id
    try{
        const updatedEvent = await EventService.update({_id: id},req.body)
        if(!updatedEvent) return next({message: 'Event not found', status: 404})
        res.status(201).send(updatedEvent)
    }catch(err){
        next(err)
    }
}

const deleteEvent = async (req, res, next) => {
    const id = req.params.id
    try{
        const deletedEvent = await EventService.deleteOne({_id: id})
        if(deletedEvent.deletedCount === 0) return next({message: 'Event not found', status: 404})
        res.status(200).send({message: 'Event deleted successfully'})
    }catch(err){
        next(err)
    }
}

const updateParticipants = async (req, res, next) => {
    const user = req.user.id
    const event = req.params.id
    try{
        let selectedEvent = await EventService.findOne({_id: event})

        if(!selectedEvent) return next({message: 'Event not found', status: 404})

        //Get participants list from selected event
        const participantList = selectedEvent.participants

        // In both cases we have to update the user's event list.
        //If user in participants list, we will remove user from the list. We m
        if(participantList.includes(user)){
            let updatedEvent = await EventService.update({ _id: event }, { $pull: { participants: user } })
            await UserService.update({_id: user},{$pull: {events: event}})
            res.status(200).send(updatedEvent)
        }
        //Else we will add user to the participants list
        else{
            let updatedEvent = await EventService.update({ _id: event }, { $push: { participants: user}})
            await UserService.update({_id: user}, {$push: {events: event}})
            res.status(200).send(updatedEvent)
        }

    }catch(err){
        next(err)
    }
}

module.exports = {getAllEvents, getEvent, create, update, deleteEvent, updateParticipants}