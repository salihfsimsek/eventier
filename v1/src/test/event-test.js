const EventModel = require('../models/event-model')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)

let eventId = '12345'

describe('Events', () => {
    // beforeEach((done) => {
    //     EventModel.deleteMany({}, err => {
    //         done()
    //     })
    // })

    describe('/POST create event', () => {
        it('it should create an event', (done) => {
            const newEvent = 
                {
                    title: "Concert",
                    description: "Nothing about the concert",
                    date: "12.03.2022",
                    location: "Istanbul"
                
            }
            chai.request(server).post('/api/events').set({Authorization: process.env.ACCESS_TOKEN}).send(newEvent).end((err,res) => {
                res.should.have.status(201)
                eventId = res.body._id
                done()
            })
        })
    
        it('it should return validation error', (done) => {
            const newEvent = {
                title: "Concert",
                description: "Nothing about the concert",
            }
            chai.request(server).post('/api/events').set({Authorization: process.env.ACCESS_TOKEN}).send(newEvent).end((err,res) => {
                res.should.have.status(400)
                done()
            })
        })
    })

    describe('/PUT update event', () => {
        it('it should update an event', (done) => {
            const updatedEvent = {title: 'Concert 2'}
            chai.request(server).patch(`/api/events/${eventId}`).send(updatedEvent).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(201)
                done()
            })
        })

        it('it should return not found error', (done) => {
            const updatedEvent = {title: 'Concert 2'}
            let fakeId = '62262ce4eded7027849217f3'
            chai.request(server).patch(`/api/events/${fakeId}`).send(updatedEvent).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(404)
                done()
            })
        })
    })
})