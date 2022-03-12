const EventModel = require('../models/event-model')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)

let eventId = ''
let fakeEventId = '62262ce4eded7027849217f3'

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
            let fakeEventId = '62262ce4eded7027849217f3'
            chai.request(server).patch(`/api/events/${fakeEventId}`).send(updatedEvent).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(404)
                done()
            })
        })
    })

    describe('/GET get event', () => {
        it('it should get an event', (done) => {
            chai.request(server).get(`/api/events/${eventId}`).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(200)
                done()
            })
        })

        it('it should return result not found', (done) => {
            chai.request(server).get(`/api/events/${fakeEventId}`).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(404)
                done()
            })
        })
    })

    describe('/GET get event list', () => {
        it('it should get all events', (done) => {
            chai.request(server).get('/api/events').set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
        })
    })

    describe('/Patch update participants list', () => {
        it('it should add to participants to the list', (done) => {
            chai.request(server).patch(`/api/events/update-participants/${eventId}`).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(200)
                done()
            })
        })

        it('it should remove to participants to the list', (done) => {
            chai.request(server).patch(`/api/events/update-participants/${eventId}`).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(200)
                done()
            })
        })
    })

    describe('/delete event', () => {
        it('it should delete the event', (done) => {
            chai.request(server).delete(`/api/events/${eventId}`).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(200)
                done()
            })
        })

        it('it should return not found error', (done) => {
            chai.request(server).delete(`/api/events/${fakeEventId}`).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(404)
                done()
            })
        })
    })
})